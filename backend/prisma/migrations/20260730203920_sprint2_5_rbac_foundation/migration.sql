-- CreateTable
CREATE TABLE "contributor_applications" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "message" TEXT,
    "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    "reviewedById" UUID,
    "reviewedAt" TIMESTAMP(3),
    "adminNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contributor_applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contributor_applications_userId_key" ON "contributor_applications"("userId");

-- CreateIndex
CREATE INDEX "contributor_applications_status_idx" ON "contributor_applications"("status");

-- AddForeignKey
ALTER TABLE "contributor_applications" ADD CONSTRAINT "contributor_applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
