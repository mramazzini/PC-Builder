"use server";
import { Prisma, User, PrismaClient } from "@prisma/client";
import { createUser } from "../create.actions";
import { validateEmail, validateSecureString } from "@/src/lib/utils/helpers";
import bcrypt from "bcrypt";
import { generateToken } from "@/src/lib/utils/auth";
import { AuthResult } from "@/src/lib/utils/types";
const db = new PrismaClient();

export const signup = async (data: {
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<AuthResult> => {
  console.log("createUser");

  const { email, password, confirmPassword } = data;
  const user = await db.user.findFirst({
    where: {
      email,
    },
  });
  if (user) {
    return AuthResult.UserAlreadyExists;
  }
  if (!validateEmail(email)) {
    return AuthResult.UserAlreadyExists;
  }
  const passwordError: AuthResult = validateSecureString(
    password,
    confirmPassword
  );

  if (passwordError !== AuthResult.Success) {
    return passwordError;
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await createUser({
    email,
    password: hashedPassword,
  });

  generateToken(newUser.id);
  return AuthResult.Success;
};
