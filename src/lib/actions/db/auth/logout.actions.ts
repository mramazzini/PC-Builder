"use server";
import { destroySession } from "@/src/lib/auth";

export const logout = async (): Promise<void> => {
  await destroySession();
};
