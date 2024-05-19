-- CreateEnum
CREATE TYPE "QStatus" AS ENUM ('QUEUED', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "QuestionnaireEntry" ADD COLUMN     "status" "QStatus" NOT NULL DEFAULT 'QUEUED';
