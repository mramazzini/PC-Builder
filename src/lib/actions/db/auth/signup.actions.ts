"use server";
import { Prisma, User, PrismaClient } from "@prisma/client";
import { createUser } from "../create.actions";
import { validateEmail, validateSecureString } from "@/src/lib/utils/helpers";
import bcrypt from "bcrypt";
import { generateToken } from "@/src/lib/utils/auth";
import { AuthResult } from "@/src/lib/utils/types";

import { sendAccountConfirmationEmail } from "../../email/send.actions";
import { randomUUID } from "crypto";
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
  const oneHourFromNow = new Date();
  oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);
  const newUser = await createUser({
    email,
    password: hashedPassword,
    verificationExpiry: oneHourFromNow,
  });

  await sendAccountConfirmationEmail(
    newUser.email,
    await newUser.verificationToken
  );

  generateToken(newUser.id);
  return AuthResult.Success;
};

export const verifyEmailToken = (
  email: string,
  verificationToken: string
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    // find user by email and verification token
    const user = await db.user.findFirst({
      where: {
        email,
        verificationToken,
      },
    });

    if (!user) {
      reject(false);
      return false;
    }

    // get the current date and time
    const now = new Date();

    // check if the verification token has expired
    console.log(user);
    if (user.verificationExpiry < now) {
      reject(false);
      return false;
    }

    // update the user to verified

    db.user
      .update({
        where: {
          id: user.id,
        },
        data: {
          verified: true,
        },
      })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
};

export const resetVerificationToken = async (email: string) => {
  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return false;
  }

  const verificationToken = await generateUniqueToken();
  // Get the current date and time
  const now = new Date();

  // Add one hour to it
  now.setHours(now.getHours() + 1);
  try {
    await db.user.update({
      where: {
        email,
      },
      data: {
        verificationToken,
        verificationExpiry: now,
      },
    });
  } catch (error) {
    console.error(error);
    return false;
  }

  await sendAccountConfirmationEmail(email, verificationToken);

  return true;
};

const generateUniqueToken: any = async () => {
  const token = randomUUID();
  const tokenExists = await db.user.findFirst({
    where: {
      verificationToken: token,
    },
  });

  if (tokenExists) {
    return generateUniqueToken();
  }

  return token;
};
