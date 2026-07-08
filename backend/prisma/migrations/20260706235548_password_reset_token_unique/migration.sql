/*
  Warnings:

  - A unique constraint covering the columns `[tokenHash]` on the table `password_resets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "password_resets_tokenHash_key" ON "password_resets"("tokenHash");
