"use server";
import { Prisma, QuestionnaireEntry, PrismaClient } from "@prisma/client";

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
