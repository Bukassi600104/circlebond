import { createServer } from "node:net";

// Loopback-only SMTP fixture: exercise the real production mail path without delivery.
export async function startSmtpSink() {
  const messages = [];
  const sockets = new Set();
  const server = createServer((socket) => {
    sockets.add(socket);
    socket.setEncoding("utf8");
    socket.setTimeout(10_000, () => socket.destroy());
    socket.on("error", () => {});
    socket.on("close", () => sockets.delete(socket));
    socket.write("220 bondcircle.test ESMTP\r\n");
    let buffer = "";
    let recipient = "";
    let data = null;
    socket.on("data", (chunk) => {
      buffer += chunk;
      let end;
      while ((end = buffer.indexOf("\r\n")) !== -1) {
        const line = buffer.slice(0, end);
        buffer = buffer.slice(end + 2);
        if (data !== null) {
          if (line !== ".") {
            data += `${line}\n`;
            continue;
          }
          const code = data.match(/verification code is (\d{6})/)?.[1];
          if (code) messages.push({ recipient, code });
          data = null;
          socket.write("250 Accepted\r\n");
        } else if (/^(EHLO|HELO)\b/i.test(line)) {
          socket.write("250 bondcircle.test\r\n");
        } else if (/^MAIL FROM:/i.test(line)) {
          recipient = "";
          socket.write("250 OK\r\n");
        } else if (/^RCPT TO:/i.test(line)) {
          recipient = line.match(/<([^>]+)>/)?.[1] ?? "";
          socket.write("250 OK\r\n");
        } else if (/^DATA$/i.test(line)) {
          data = "";
          socket.write("354 End with a dot\r\n");
        } else if (/^QUIT$/i.test(line)) {
          socket.end("221 Bye\r\n");
        } else if (/^(RSET|NOOP)\b/i.test(line)) {
          socket.write("250 OK\r\n");
        } else {
          socket.write("500 Unsupported test SMTP command\r\n");
        }
      }
    });
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  return {
    url: `smtp://127.0.0.1:${server.address().port}`,
    takeCode(recipient) {
      const index = messages.findIndex(
        (message) => message.recipient === recipient,
      );
      if (index < 0)
        throw new Error(
          "Expected OTP email was not delivered to the local SMTP fixture.",
        );
      return messages.splice(index, 1)[0].code;
    },
    async close() {
      for (const socket of sockets) socket.destroy();
      await new Promise((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    },
  };
}
