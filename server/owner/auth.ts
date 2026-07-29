import "server-only";

import { redirect } from "next/navigation";
import { readSession } from "@/server/auth";
import { getOwnerAdministrator } from "@/server/repositories/owner";

export async function readOwnerSession() {
  const session = await readSession();
  if (!session) return null;
  const owner = await getOwnerAdministrator(session.uid);
  if (!owner) return null;
  return { session, owner };
}

export async function requireOwnerSession() {
  const session = await readSession();
  if (!session) redirect("/sign-in?next=%2Fowner");
  const owner = await getOwnerAdministrator(session.uid);
  if (!owner) redirect("/account");
  return { session, owner };
}
