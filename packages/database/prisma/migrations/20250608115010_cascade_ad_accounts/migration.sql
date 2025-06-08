-- DropForeignKey
ALTER TABLE "AdAccount" DROP CONSTRAINT "AdAccount_linkedAccountId_fkey";

-- AddForeignKey
ALTER TABLE "AdAccount" ADD CONSTRAINT "AdAccount_linkedAccountId_fkey" FOREIGN KEY ("linkedAccountId") REFERENCES "LinkedAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
