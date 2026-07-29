import { applicationDefault, cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getDataConnect } from "firebase-admin/data-connect";

const email = process.argv[2]?.trim().toLowerCase();
const dryRun = process.argv.includes("--dry-run");
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  throw new Error(
    "Usage: npm run owner:provision -- verified-owner@example.com",
  );
}

const projectId = process.env.FIREBASE_PROJECT_ID ?? "bond-circle";
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replaceAll("\\n", "\n");
const credential =
  clientEmail && privateKey
    ? cert({ projectId, clientEmail, privateKey })
    : applicationDefault();
const app = initializeApp({ projectId, credential }, "owner-provisioning");
const user = await getAuth(app).getUserByEmail(email);

if (!user.emailVerified || user.disabled) {
  throw new Error(
    "The owner must have an enabled Firebase account with a verified email.",
  );
}

if (dryRun) {
  console.log(
    `Verified eligible Firebase user ${user.uid} (${user.email ?? "email unavailable"}).`,
  );
  process.exit(0);
}

const dataConnect = getDataConnect(
  {
    location:
      process.env.FIREBASE_SQL_CONNECT_LOCATION ??
      process.env.NEXT_PUBLIC_FIREBASE_SQL_CONNECT_LOCATION ??
      "europe-west2",
    serviceId:
      process.env.FIREBASE_SQL_CONNECT_SERVICE_ID ??
      process.env.NEXT_PUBLIC_FIREBASE_SQL_CONNECT_SERVICE_ID ??
      "bondcircle-service",
    connector:
      process.env.FIREBASE_SQL_CONNECT_CONNECTOR_ID ??
      process.env.NEXT_PUBLIC_FIREBASE_SQL_CONNECTOR_ID ??
      "bondcircle",
  },
  app,
);

await dataConnect.executeMutation("ProvisionOwnerAdministrator", {
  userId: user.uid,
  createdAt: new Date().toISOString(),
});

console.log(`Owner access provisioned for verified Firebase user ${user.uid}.`);
