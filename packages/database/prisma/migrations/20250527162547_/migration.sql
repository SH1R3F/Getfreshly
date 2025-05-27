-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "variant" TEXT NOT NULL DEFAULT 'user',
    "isLoading" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FacebookAuth" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FacebookAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FacebookAdAccount" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FacebookAdAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Message_userId_idx" ON "Message"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FacebookAuth_userId_key" ON "FacebookAuth"("userId");

-- CreateIndex
CREATE INDEX "FacebookAuth_userId_idx" ON "FacebookAuth"("userId");

-- CreateIndex
CREATE INDEX "FacebookAdAccount_authId_idx" ON "FacebookAdAccount"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "FacebookAdAccount_accountId_authId_key" ON "FacebookAdAccount"("accountId", "authId");

-- AddForeignKey
ALTER TABLE "FacebookAdAccount" ADD CONSTRAINT "FacebookAdAccount_authId_fkey" FOREIGN KEY ("authId") REFERENCES "FacebookAuth"("id") ON DELETE CASCADE ON UPDATE CASCADE;
