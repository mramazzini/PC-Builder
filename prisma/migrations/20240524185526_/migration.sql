/*
  Warnings:

  - A unique constraint covering the columns `[sku]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "amountSold" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "itemDescription" TEXT,
ADD COLUMN     "manufacturer" TEXT,
ADD COLUMN     "ratings" DOUBLE PRECISION,
ADD COLUMN     "sku" TEXT NOT NULL,
ADD COLUMN     "warrantyPeriod" INTEGER;

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_sku_key" ON "Item"("sku");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
