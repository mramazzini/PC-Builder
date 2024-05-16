/*
  Warnings:

  - You are about to drop the `questionnaireEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "questionnaireEntry" DROP CONSTRAINT "questionnaireEntry_userId_fkey";

-- DropTable
DROP TABLE "questionnaireEntry";

-- CreateTable
CREATE TABLE "QuestionnaireEntry" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "minBudget" INTEGER NOT NULL,
    "maxBudget" INTEGER NOT NULL,
    "usage" TEXT NOT NULL,
    "usageDetails" TEXT NOT NULL,
    "performance" TEXT NOT NULL,
    "performanceDetails" TEXT NOT NULL,
    "aesthetics" TEXT NOT NULL,
    "aestheticsDetails" TEXT NOT NULL,
    "other" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "QuestionnaireEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionnaireEntry" ADD CONSTRAINT "QuestionnaireEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
