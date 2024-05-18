"use server";
import bcrypt from "bcrypt";
import { PrismaClient, User } from "@prisma/client";
import { generateToken } from "@/src/lib/utils/auth";
import { AuthResult } from "@/src/lib/utils/types";
const db = new PrismaClient();

export const login = async (data: {
  email: string;
  password: string;
}): Promise<AuthResult> => {
  const { email, password } = data;
  const user = await db.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    return AuthResult.UserNotFound;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return AuthResult.InvalidCredentials;
  }
  generateToken(user.id);
  return AuthResult.Success;
};
