"use server";
import { Prisma, User, PrismaClient } from "@prisma/client";
import { createUser } from "../create.actions";
import { validateEmail, validateSecureString } from "@/src/lib/utils";
import bcrypt from "bcrypt";
const db = new PrismaClient();

export const signup = async (data: {
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<User> => {
  console.log("createUser");

  const { email, password, confirmPassword } = data;
  const user = await db.user.findFirst({
    where: {
      email,
    },
  });
  if (user) {
    throw new Error(`User already exists`);
  }
  if (!validateEmail(email)) {
    throw new Error("Invalid email");
  }
  const passwordError = validateSecureString(password, confirmPassword);
  if (passwordError) {
    throw new Error(passwordError);
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await createUser({
    email,
    password: hashedPassword,
  });

  return newUser;

  //   await addDefaultContentPacksToUser(newUser.id);
  //   const token = generateToken(newUser.id);
  //   return token;
};
