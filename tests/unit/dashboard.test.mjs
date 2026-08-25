import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("Milestone 4 persists dashboard circles in Firebase Data Connect", async () => {
  const schema = await source("dataconnect/schema/schema.gql");
  const operations = await source("dataconnect/bondcircle/queries.gql");
  const repository = await source("server/repositories/dashboard.ts");
  const runner = await source("scripts/run-development.mjs");

  assert.match(schema, /type Circle @table/);
  assert.match(schema, /type CircleMembership @table/);
  assert.match(operations, /query GetDashboardCircles/);
  assert.match(repository, /executeQuery/);
  assert.match(repository, /GetDashboardCircles/);
  assert.doesNotMatch(repository, /mock|fixture|sample/i);
  assert.match(runner, /DATA_CONNECT_EMULATOR_HOST/);
  assert.match(runner, /9399/);
});

test("dashboard exposes every approved mobile and desktop destination", async () => {
  const shell = await source("components/dashboard/DashboardShell.tsx");
  const sectionPage = await source("app/account/[section]/page.tsx");

  for (const label of [
    "Dashboard",
    "Created by me",
    "Joined circles",
    "Pending invitations",
    "Completed",
    "Archived",
    "Activity",
    "Notifications",
    "Profile",
    "Settings",
    "Home",
    "Circles",
    "Create",
  ]) {
    assert.match(shell, new RegExp(label));
  }
  assert.match(sectionPage, /notFound/);
  assert.match(shell, /<Link/);
});

test("home dashboard includes creation choices and all required circle groups", async () => {
  const home = await source("components/dashboard/DashboardHome.tsx");

  for (const label of [
    "Create Gift Circle",
    "Create Aso-Ebi Circle",
    "Create Support Circle",
    "Created by me",
    "Joined circles",
    "Pending invitations",
    "Completed circles",
    "Archived circles",
  ]) {
    assert.match(home, new RegExp(label));
  }
});

test("dashboard cards expose the complete Milestone 4 information set", async () => {
  const card = await source("components/dashboard/DashboardCircleCard.tsx");

  for (const field of [
    "imageUrl",
    "name",
    "type",
    "role",
    "memberCount",
    "progress",
    "deadline",
    "eventDate",
    "status",
  ]) {
    assert.match(card, new RegExp(field));
  }
});

test("dashboard has explicit empty, loading, and network-error states", async () => {
  const home = await source("components/dashboard/DashboardHome.tsx");
  const loading = await source("app/account/loading.tsx");
  const error = await source("app/account/error.tsx");

  assert.match(home, /DashboardEmptyState/);
  assert.match(loading, /LoadingSkeleton/);
  assert.match(error, /role="alert"/);
  assert.match(error, /reset/);
});

test("profile supports secure photo updates and sign out", async () => {
  const sectionPage = await source("app/account/[section]/page.tsx");
  const profile = await source("components/profile/ProfileSettings.tsx");
  const uploadRoute = await source("app/api/profile/photo/route.ts");
  const imageRoute = await source(
    "app/api/users/[userId]/profile-image/route.ts",
  );

  assert.match(sectionPage, /ProfileSettings/);
  assert.match(sectionPage, /LogoutButton/);
  assert.match(profile, /type="file"/);
  assert.match(profile, /accept="image\/jpeg,image\/png,image\/webp"/);
  assert.match(profile, /router\.refresh/);
  assert.match(uploadRoute, /assertTrustedMutation/);
  assert.match(uploadRoute, /authenticatePrincipal/);
  assert.match(uploadRoute, /enforceRateLimit/);
  assert.match(uploadRoute, /sanitizeUploadedImage/);
  assert.match(uploadRoute, /profilePhotoStorageAvailable/);
  assert.match(uploadRoute, /status: 503/);
  assert.match(uploadRoute, /users\/\$\{session\.uid\}\/profile\/photo/);
  assert.match(imageRoute, /authenticatePrincipal/);
  assert.match(imageRoute, /X-Content-Type-Options/);
});
