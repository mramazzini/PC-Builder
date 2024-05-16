-- CreateTable
CREATE TABLE "questionnaireEntry" (
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

    CONSTRAINT "questionnaireEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "questionnaireEntry" ADD CONSTRAINT "questionnaireEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
