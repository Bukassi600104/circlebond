import assert from "node:assert/strict";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

const firebase = {
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: "synthetic-project",
  NEXT_PUBLIC_FIREBASE_API_KEY: "synthetic-public-key",
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "localhost",
  NEXT_PUBLIC_FIREBASE_APP_ID: "synthetic-app",
};
const sql = {
  NEXT_PUBLIC_FIREBASE_SQL_CONNECT_LOCATION: "europe-west2",
  NEXT_PUBLIC_FIREBASE_SQL_CONNECT_SERVICE_ID: "synthetic-service",
  NEXT_PUBLIC_FIREBASE_SQL_CONNECTOR_ID: "synthetic-connector",
};

for (const scenario of [
  {
    name: "missing configuration",
    env: {},
    status: 503,
    firebase: "not_configured",
    sqlConnect: "not_configured",
  },
  {
    name: "Firebase configured but SQL missing",
    env: firebase,
    status: 503,
    firebase: "configured",
    sqlConnect: "not_configured",
  },
  {
    name: "both backends configured",
    env: { ...firebase, ...sql },
    status: 200,
    firebase: "configured",
    sqlConnect: "configured",
  },
]) {
  test(`health reports the real configuration contract: ${scenario.name}`, async () => {
    const environment = await loadTypescriptModule(
      "lib/env.ts",
      {},
      {
        process: { env: scenario.env },
      },
    );
    const route = await loadTypescriptModule("app/api/health/route.ts", {
      "@/lib/env": environment,
      "next/server": { NextResponse: Response },
    });
    const response = await route.GET();
    const body = await response.json();
    assert.equal(response.status, scenario.status);
    assert.equal(body.status, scenario.status === 200 ? "ok" : "degraded");
    assert.equal(body.application, "ok");
    assert.equal(body.firebase, scenario.firebase);
    assert.equal(body.sqlConnect, scenario.sqlConnect);
    assert.ok(Number.isFinite(Date.parse(body.timestamp)));
    assert.equal(JSON.stringify(body).includes("synthetic-public-key"), false);
  });
}
