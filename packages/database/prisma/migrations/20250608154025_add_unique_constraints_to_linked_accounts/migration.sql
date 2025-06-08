/*
  Warnings:

  - A unique constraint covering the columns `[userId,accountId]` on the table `LinkedAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LinkedAccount_userId_accountId_key" ON "LinkedAccount"("userId", "accountId");
