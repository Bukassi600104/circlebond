import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const source = await readFile(
  new URL("../../components/pwa/InstallPrompt.tsx", import.meta.url),
  "utf8",
);

function mount({
  userAgent = "Chrome",
  platform = "Linux",
  maxTouchPoints = 0,
  standalone = false,
  storageBlocked = false,
  dismissedAt = null,
  pathname = "/account",
} = {}) {
  const states = [];
  const listeners = new Map();
  const timers = new Map();
  const registrations = [];
  let index = 0;
  let effect;
  let mounted = false;
  let stored = dismissedAt;
  const navigator = {
    userAgent,
    platform,
    maxTouchPoints,
    serviceWorker: {
      register: (...args) => {
        registrations.push(args);
        return Promise.resolve();
      },
    },
  };
  const window = {
    navigator,
    matchMedia: () => ({ matches: standalone }),
    localStorage: {
      getItem() {
        if (storageBlocked) throw new Error("Storage unavailable");
        return stored;
      },
      setItem(_key, value) {
        if (storageBlocked) throw new Error("Storage unavailable");
        stored = value;
      },
    },
    addEventListener: (type, listener) => listeners.set(type, listener),
    removeEventListener: (type) => listeners.delete(type),
    setTimeout: (callback) => {
      const id = timers.size + 1;
      timers.set(id, callback);
      return id;
    },
    clearTimeout: (id) => timers.delete(id),
  };
  const jsx = (type, props) => ({ type, props });
  const dependencies = {
    "next/navigation": { usePathname: () => pathname },
    react: {
      useState(initial) {
        const position = index++;
        if (!(position in states)) states[position] = initial;
        return [
          states[position],
          (value) => {
            states[position] = value;
          },
        ];
      },
      useEffect(callback) {
        if (!mounted) effect = callback;
      },
    },
    "react/jsx-runtime": { jsx, jsxs: jsx },
    "next/image": { default: "img" },
    "lucide-react": { Download: "svg", Share2: "svg", X: "svg" },
  };
  const exports = {};
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
    },
  });
  runInNewContext(compiled.outputText, {
    exports,
    window,
    navigator,
    require: (id) => {
      assert.ok(Object.hasOwn(dependencies, id), `Unexpected import: ${id}`);
      return dependencies[id];
    },
  });
  function render() {
    index = 0;
    return exports.InstallPrompt();
  }
  assert.equal(render(), null);
  mounted = true;
  effect();
  return {
    render,
    setPath(value) {
      pathname = value;
    },
    registrations,
    get stored() {
      return stored;
    },
    fire: (type, event = {}) => listeners.get(type)?.(event),
    runTimers() {
      const callbacks = [...timers.values()];
      timers.clear();
      callbacks.forEach((callback) => callback());
    },
  };
}

function nodes(node) {
  if (!node || typeof node !== "object") return [];
  if (Array.isArray(node)) return node.flatMap(nodes);
  return [node, ...nodes(node.props?.children)];
}

function text(node) {
  if (typeof node === "string") return node;
  if (!node || typeof node !== "object") return "";
  if (Array.isArray(node)) return node.map(text).join("");
  return text(node.props?.children);
}

function promptEvent({ outcome = "accepted", reject = false } = {}) {
  let calls = 0;
  return {
    preventDefault() {},
    async prompt() {
      calls++;
      if (reject) throw new Error("Browser rejected prompt");
    },
    userChoice: Promise.resolve({ outcome, platform: "web" }),
    get calls() {
      return calls;
    },
  };
}

test("restricted storage cannot prevent iOS instructions or dismissal", () => {
  const app = mount({ userAgent: "iPhone Safari", storageBlocked: true });
  app.runTimers();
  const banner = app.render();
  assert.equal(banner.props.role, "region");
  assert.match(text(banner), /Add to Home Screen/);
  nodes(banner)
    .find((node) => node.props?.["aria-label"] === "Dismiss install suggestion")
    .props.onClick();
  assert.equal(app.render(), null);
  assert.equal(app.registrations[0][0], "/sw.js");
  assert.equal(app.registrations[0][1].updateViaCache, "none");
});

test("desktop-UA iPad receives Safari and web-app instructions", () => {
  const app = mount({
    userAgent: "Mozilla/5.0 Macintosh Safari",
    platform: "MacIntel",
    maxTouchPoints: 5,
  });
  app.runTimers();
  assert.match(text(app.render()), /In Safari/);
  assert.match(text(app.render()), /Open as Web App/);
});

test("installation promotion waits until invitation and authentication entry flows finish", () => {
  const app = mount({
    userAgent: "iPhone Safari",
    pathname: "/invite/test-fixture",
  });
  app.runTimers();
  assert.equal(app.render(), null);
  app.setPath("/sign-in");
  assert.equal(app.render(), null);
  app.setPath("/account");
  assert.match(text(app.render()), /Install BondCircle/);
  assert.equal(app.registrations.length, 1);
});

test("standalone sessions register updates without another install suggestion", () => {
  const app = mount({ userAgent: "iPhone Safari", standalone: true });
  app.runTimers();
  assert.equal(app.render(), null);
  assert.equal(app.registrations.length, 1);
});

test("native rejection consumes its event safely and a new event can retry", async () => {
  const app = mount();
  const rejected = promptEvent({ reject: true });
  app.fire("beforeinstallprompt", rejected);
  await nodes(app.render())
    .find((node) => node.props?.className === "bc-install-prompt__action")
    .props.onClick();
  assert.equal(rejected.calls, 1);
  assert.match(text(app.render()), /Installation could not start/);
  assert.equal(
    nodes(app.render()).some(
      (node) => node.props?.className === "bc-install-prompt__action",
    ),
    false,
  );
  const retry = promptEvent();
  app.fire("beforeinstallprompt", retry);
  await nodes(app.render())
    .find((node) => node.props?.className === "bc-install-prompt__action")
    .props.onClick();
  assert.equal(retry.calls, 1);
  assert.equal(app.render(), null);
});

test("dismissed native choice hides the consumed banner and honors cooldown", async () => {
  const app = mount();
  app.fire("beforeinstallprompt", promptEvent({ outcome: "dismissed" }));
  await nodes(app.render())
    .find((node) => node.props?.className === "bc-install-prompt__action")
    .props.onClick();
  assert.equal(app.render(), null);
  assert.ok(Number(app.stored) > 0);
  app.fire("beforeinstallprompt", promptEvent());
  assert.equal(app.render(), null);
});

test("installation cancels delayed iOS help", () => {
  const app = mount({ userAgent: "iPhone Safari" });
  app.fire("appinstalled");
  app.runTimers();
  assert.equal(app.render(), null);
});

test("future dismissal timestamps cannot suppress the banner indefinitely", () => {
  const app = mount({
    userAgent: "iPhone Safari",
    dismissedAt: String(Date.now() + 60_000),
  });
  app.runTimers();
  assert.match(text(app.render()), /Install BondCircle/);
});

test("manifest icon files match their declared dimensions", async () => {
  for (const size of [192, 512]) {
    const bytes = await readFile(
      new URL(`../../public/brand/icon-${size}.png`, import.meta.url),
    );
    assert.equal(bytes.readUInt32BE(16), size);
    assert.equal(bytes.readUInt32BE(20), size);
  }
  const maskable = await readFile(
    new URL("../../public/brand/icon-maskable-512.png", import.meta.url),
  );
  assert.equal(maskable.readUInt32BE(16), 512);
  assert.equal(maskable.readUInt32BE(20), 512);
});
