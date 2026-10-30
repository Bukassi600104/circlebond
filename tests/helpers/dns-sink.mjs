import { createSocket } from "node:dgram";

export const E2E_EMAIL_DOMAIN = "bondcircle-e2e.test";

function encodeName(name) {
  return Buffer.concat([
    ...name
      .split(".")
      .map((label) =>
        Buffer.concat([Buffer.from([label.length]), Buffer.from(label)]),
      ),
    Buffer.from([0]),
  ]);
}

// Controlled DNS for production-mode local tests; never forwards external queries.
export async function startDnsSink() {
  const socket = createSocket("udp4");
  const queries = [];
  socket.on("error", () => {});
  socket.on("message", (message, remote) => {
    if (message.length < 17 || message.readUInt16BE(4) !== 1) return;
    let offset = 12;
    const labels = [];
    while (offset < message.length && message[offset] !== 0) {
      const length = message[offset++];
      if (length > 63 || offset + length >= message.length) return;
      labels.push(message.toString("ascii", offset, offset + length));
      offset += length;
    }
    offset++;
    if (offset + 4 > message.length) return;
    const name = labels.join(".").toLowerCase();
    const type = message.readUInt16BE(offset);
    const question = message.subarray(12, offset + 4);
    queries.push({ name, type });
    const accepted = name === E2E_EMAIL_DOMAIN && type === 15;
    const header = Buffer.alloc(12);
    header.writeUInt16BE(message.readUInt16BE(0), 0);
    header.writeUInt16BE(accepted ? 0x8180 : 0x8183, 2);
    header.writeUInt16BE(1, 4);
    header.writeUInt16BE(accepted ? 1 : 0, 6);
    const parts = [header, question];
    if (accepted) {
      const exchange = Buffer.concat([
        Buffer.from([0, 10]),
        encodeName("mail.bondcircle-e2e.test"),
      ]);
      const answer = Buffer.alloc(12);
      answer.writeUInt16BE(0xc00c, 0);
      answer.writeUInt16BE(15, 2);
      answer.writeUInt16BE(1, 4);
      answer.writeUInt16BE(exchange.length, 10);
      parts.push(answer, exchange);
    }
    socket.send(Buffer.concat(parts), remote.port, remote.address);
  });
  await new Promise((resolve, reject) => {
    socket.once("error", reject);
    socket.bind(0, "127.0.0.1", resolve);
  });
  const address = "127.0.0.1:" + socket.address().port;
  const preload = [
    'import dns from "node:dns";',
    'import { syncBuiltinESMExports } from "node:module";',
    "const loopback = /^(127\\.0\\.0\\.1|localhost|\\[::1\\]):\\d+$/;",
    'if (!loopback.test(process.env.FIREBASE_AUTH_EMULATOR_HOST ?? "") ||',
    '    !loopback.test(process.env.DATA_CONNECT_EMULATOR_HOST ?? "")) {',
    '  throw new Error("Test DNS requires explicit loopback Firebase emulators.");',
    "}",
    "dns.setServers([" + JSON.stringify(address) + "]);",
    "syncBuiltinESMExports();",
  ].join("\n");
  return {
    address,
    queries,
    preload: "data:text/javascript," + encodeURIComponent(preload),
    close: () => new Promise((resolve) => socket.close(resolve)),
  };
}
