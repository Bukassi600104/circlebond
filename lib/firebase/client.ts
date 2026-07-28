import { getApp, getApps, initializeApp } from "firebase/app";
import {
  inMemoryPersistence,
  connectAuthEmulator,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirebaseClientEnv } from "@/lib/env";

let authInitialized = false;

export function getFirebaseClientApp() {
  return getApps().length ? getApp() : initializeApp(getFirebaseClientEnv());
}

export function getFirebaseAuth() {
  const auth = getAuth(getFirebaseClientApp());
  if (!authInitialized) {
    authInitialized = true;
    void setPersistence(auth, inMemoryPersistence);
    if (
      process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true" &&
      typeof window !== "undefined"
    ) {
      connectAuthEmulator(auth, "http://127.0.0.1:9099", {
        disableWarnings: true,
      });
    }
  }
  return auth;
}

export function getFirebaseStorage() {
  return getStorage(getFirebaseClientApp());
}
