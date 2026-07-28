import { getDataConnect } from "firebase-admin/data-connect";
import { getFirebaseAdminApp } from "@/server/firebase/admin";

export function dataConnectConfig() {
  return {
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
  };
}

export function getBondCircleDataConnect() {
  return getDataConnect(dataConnectConfig(), getFirebaseAdminApp());
}
