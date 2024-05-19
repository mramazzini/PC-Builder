"use server";

import { QuestionnaireEntry, Prisma, PrismaClient } from "@prisma/client";

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
