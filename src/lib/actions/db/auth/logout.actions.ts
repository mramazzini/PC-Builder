"use server";
import { destroySession } from "@/src/lib/utils/auth";

export const logout = async (): Promise<void> => {
  await destroySession();
};
