"use server";
import { Prisma, QuestionnaireEntry, PrismaClient, User } from "@prisma/client";

const db = new PrismaClient();

export const createQuestionnaireEntry = async (
  data: Prisma.QuestionnaireEntryCreateInput
): Promise<QuestionnaireEntry> => {
  "use server";
  console.log("createQuestionnaireEntry");
  return db.questionnaireEntry.create({
    data,
  });
};

export const createUser = async (
  data: Prisma.UserCreateInput
): Promise<User> => {
  "use server";
  console.log("createUser");
  return db.user.create({
    data,
  });
};
