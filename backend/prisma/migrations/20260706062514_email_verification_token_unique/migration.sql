/*
  Warnings:

  - A unique constraint covering the columns `[tokenHash]` on the table `email_verifications` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "email_verifications_tokenHash_key" ON "email_verifications"("tokenHash");
