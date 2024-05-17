"use server";
import bcrypt from "bcrypt";
import { PrismaClient, User } from "@prisma/client";

const db = new PrismaClient();

export const login = async (data: { email: string; password: string }) => {
  const { email, password } = data;
  const user = await db.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error(`User not found`);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error(`Invalid password`);
  }

  return user;
};
