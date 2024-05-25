/*
  Warnings:

  - You are about to drop the column `itemDescription` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `itemName` on the `Item` table. All the data in the column will be lost.
  - Added the required column `name` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "itemDescription",
DROP COLUMN "itemName",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;
