import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  assertInvitationCapacity,
  assertInvitationTransition,
  createSecureInvitationToken,
  invitationExpiry,
  invitationMatchesUser,
} from "../../server/invitations/rules.ts";

const root = new URL("../../", import.meta.url);

test("invitation tokens are random and only their stable hashes need persistence", () => {
  const first = createSecureInvitationToken();
  const second = createSecureInvitationToken();
  assert.match(first.token, /^[A-Za-z0-9_-]{40,}$/);
  assert.match(first.tokenHash, /^[a-f0-9]{64}$/);
  assert.notEqual(first.token, second.token);
  assert.notEqual(first.tokenHash, second.tokenHash);
  assert.equal(
    createSecureInvitationToken(first.token).tokenHash,
    first.tokenHash,
  );
});

test("named invitations match only the intended verified contact", () => {
  assert.equal(
    invitationMatchesUser(
      {
        mode: "named",
        recipientEmail: "ada@example.com",
        recipientPhone: null,
      },
      { email: "ADA@example.com", phone: null },
    ),
    true,
  );
  assert.equal(
    invitationMatchesUser(
      { mode: "named", recipientEmail: null, recipientPhone: "+2348012345678" },
      { email: null, phone: "+2348012345678" },
    ),
    true,
  );
  assert.equal(
    invitationMatchesUser(
      {
        mode: "named",
        recipientEmail: "ada@example.com",
        recipientPhone: null,
      },
      { email: "other@example.com", phone: null },
    ),
    false,
  );
  assert.equal(
    invitationMatchesUser(
      { mode: "open", recipientEmail: null, recipientPhone: null },
      { email: null, phone: null },
    ),
    true,
  );
});

test("invitation state and capacity rules prevent revoked, expired and reused access", () => {
  assertInvitationTransition("created", "sent");
  assertInvitationTransition("sent", "opened");
  assertInvitationTransition("opened", "accepted");
  assert.throws(() => assertInvitationTransition("revoked", "accepted"));
  assert.throws(() => assertInvitationTransition("expired", "accepted"));
  assert.doesNotThrow(() => assertInvitationCapacity(2, 3, 0, 1));
  assert.throws(() => assertInvitationCapacity(3, 3, 0, 1), /capacity/i);
  assert.throws(
    () => assertInvitationCapacity(1, 3, 1, 1),
    /already been used/i,
  );
  assert.ok(Date.parse(invitationExpiry(7)) > Date.now());
});

test("Milestone 9 secure invitation and multi-circle membership surfaces are wired", async () => {
  const schema = await readFile(
    new URL("dataconnect/schema/schema.gql", root),
    "utf8",
  );
  const operations = await readFile(
    new URL("dataconnect/bondcircle/queries.gql", root),
    "utf8",
  );
  const repository = await readFile(
    new URL("server/repositories/invitations.ts", root),
    "utf8",
  );
  const createRoute = await readFile(
    new URL("app/api/circles/[circleId]/invitations/route.ts", root),
    "utf8",
  );
  const responseRoute = await readFile(
    new URL("app/api/invitations/[token]/respond/route.ts", root),
    "utf8",
  );
  const page = await readFile(
    new URL("app/invite/[token]/page.tsx", root),
    "utf8",
  );
  const manager = await readFile(
    new URL("components/invitations/InvitationManager.tsx", root),
    "utf8",
  );
  const auth = await readFile(
    new URL("features/auth/components.tsx", root),
    "utf8",
  );

  for (const model of [
    "type Invitation @table",
    "type InvitationAcceptance @table",
  ]) {
    assert.match(schema, new RegExp(model));
  }
  assert.doesNotMatch(schema, /\btoken:\s*String/);
  assert.match(schema, /tokenHash:\s*String!/);
  assert.match(operations, /mutation AcceptInvitationWithMembership/);
  assert.match(operations, /mutation ApproveInvitationMembership/);
  assert.match(repository, /createSecureInvitationToken/);
  assert.match(repository, /assertInvitationCapacity/);
  assert.match(repository, /assertPermission\(role,\s*"manage_members"\)/);
  assert.match(createRoute, /assertCanManageInvitations/);
  assert.match(responseRoute, /invitationMatchesUser/);
  assert.match(page, /InvitationDetails/);
  assert.match(page, /ExpiredInvitation/);
  assert.match(manager, /navigator\.share/);
  assert.match(manager, /navigator\.contacts/);
  assert.match(manager, /wa\.me/);
  assert.doesNotMatch(manager, /href=\{`sms:/);
  assert.match(manager, /mailto:/);
  assert.match(auth, /params\.get\("next"\)/);
});
