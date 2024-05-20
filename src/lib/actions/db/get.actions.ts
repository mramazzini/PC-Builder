"use server";

import { QuestionnaireEntry, Prisma, PrismaClient, User } from "@prisma/client";

const db = new PrismaClient();

export const getQuestionnaireEntry = async (
  id: string
): Promise<QuestionnaireEntry | null> => {
  const data = await db.questionnaireEntry.findUnique({
    where: {
      id,
    },
  });

  return data;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const data = await db.user.findUnique({
    where: {
      email,
    },
  });

  return data;
};

export const getUserById = async (id: number): Promise<User | null> => {
  const data = await db.user.findUnique({
    where: {
      id,
    },
  });

  return data;
};
