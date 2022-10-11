/*
  Warnings:

  - A unique constraint covering the columns `[pmid]` on the table `Paper` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Paper_pmid_key" ON "Paper"("pmid");
