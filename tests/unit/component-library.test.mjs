import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../../", import.meta.url);

test("locked brand tokens are defined once with their approved values", async () => {
  const tokens = await readFile(new URL("app/tokens.css", root), "utf8");
  const expected = {
    "--color-teal": "#0f4d46",
    "--color-green": "#6b8f7a",
    "--color-coral": "#f26d5a",
    "--color-coral-light": "#ffe3da",
    "--color-gold": "#d9a441",
    "--color-gold-light": "#f6e6bf",
    "--color-cream": "#fff8f1",
    "--color-soft-grey": "#f1f3f2",
    "--color-mint": "#e9f1ec",
    "--color-text-primary": "#1c2b2a",
    "--color-text-secondary": "#6b6f72",
  };

  for (const [name, value] of Object.entries(expected)) {
    assert.match(tokens, new RegExp(`${name}: ${value}`));
  }

  const componentCss = await readFile(
    new URL("app/components.css", root),
    "utf8",
  );
  assert.doesNotMatch(
    componentCss,
    /#[0-9a-f]{3,8}\b/i,
    "Components must consume named colour tokens instead of one-off hex values.",
  );
});

test("required Milestone 2 components are exported", async () => {
  const sources = await Promise.all(
    ["ui", "forms", "feedback", "layout"].map((folder) =>
      readFile(new URL(`components/${folder}/index.tsx`, root), "utf8"),
    ),
  );
  const combined = sources.join("\n");
  const required = [
    "Button",
    "IconButton",
    "TextInput",
    "PhoneInput",
    "EmailInput",
    "OtpInput",
    "AmountInput",
    "DatePicker",
    "Textarea",
    "UploadField",
    "Card",
    "CircleCard",
    "TierCard",
    "MemberAvatar",
    "StatusBadge",
    "ProgressBar",
    "ProgressRing",
    "Modal",
    "BottomSheet",
    "ConfirmationDialog",
    "Toast",
    "EmptyState",
    "ErrorState",
    "LoadingSkeleton",
    "Tabs",
    "NavigationBar",
    "Sidebar",
    "NotificationItem",
    "ActivityItem",
    "Comment",
    "AnnouncementCard",
  ];

  for (const component of required) {
    assert.match(
      combined,
      new RegExp(`export function ${component}\\b`),
      `${component} must remain available from the shared library.`,
    );
  }
});

test("accessibility and responsive contracts are encoded in the library", async () => {
  const css = await readFile(new URL("app/components.css", root), "utf8");
  const globals = await readFile(new URL("app/globals.css", root), "utf8");
  const ui = await readFile(new URL("components/ui/index.tsx", root), "utf8");

  assert.match(css, /min-height: var\(--touch-target\)/);
  assert.match(globals, /:focus-visible/);
  assert.match(css, /@media \(max-width: 44rem\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(ui, /aria-valuenow=/);
  assert.match(ui, /aria-selected=/);
  assert.match(ui, /aria-label="Unread"/);
});
