/*
  Warnings:

  - The primary key for the `QuestionnaireEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "QuestionnaireEntry" DROP CONSTRAINT "QuestionnaireEntry_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "QuestionnaireEntry_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "QuestionnaireEntry_id_seq";
