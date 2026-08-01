import { getApp, getApps, initializeApp } from "firebase/app";
import {
  browserSessionPersistence,
  connectAuthEmulator,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirebaseClientEnv } from "@/lib/env";

let authInitialized = false;
let authPersistenceReady: Promise<void> | null = null;

function getFirebaseBrowserConfig() {
  const config = getFirebaseClientEnv();
  if (
    typeof window !== "undefined" &&
    ["bondcircles.com", "www.bondcircles.com"].includes(
      window.location.hostname,
    )
  ) {
    return { ...config, authDomain: window.location.host };
  }
  return config;
}

export function getFirebaseClientApp() {
  return getApps().length
    ? getApp()
    : initializeApp(getFirebaseBrowserConfig());
}

export function getFirebaseAuth() {
  const auth = getAuth(getFirebaseClientApp());
  if (!authInitialized) {
    authInitialized = true;
    if (
      process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true" &&
      typeof window !== "undefined"
    ) {
      connectAuthEmulator(auth, "http://127.0.0.1:9099", {
        disableWarnings: true,
      });
    }
    authPersistenceReady = setPersistence(auth, browserSessionPersistence);
  }
  return auth;
}

export async function getPreparedFirebaseAuth() {
  const auth = getFirebaseAuth();
  await authPersistenceReady;
  return auth;
}

export function getFirebaseStorage() {
  return getStorage(getFirebaseClientApp());
}
