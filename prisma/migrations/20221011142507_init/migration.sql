-- CreateTable
CREATE TABLE "Paper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "publishedAt" DATETIME NOT NULL,
    "pmid" INTEGER NOT NULL,
    "doi" TEXT,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "abstract" TEXT
);

-- CreateTable
CREATE TABLE "StructuredData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "paperId" INTEGER NOT NULL,
    "investigatedScore" TEXT,
    "scoreAbbreviation" TEXT,
    "disease" TEXT,
    "construct" TEXT,
    "subgroup" TEXT,
    "n" INTEGER,
    "isComparative" BOOLEAN NOT NULL DEFAULT false,
    "isProposal" BOOLEAN NOT NULL DEFAULT false,
    "comparedWith" TEXT,
    "numItems" INTEGER,
    "itemsReportedByPhysician" BOOLEAN NOT NULL DEFAULT false,
    "itemsReportedByPatient" BOOLEAN NOT NULL DEFAULT false,
    "itemsReportedByOther" BOOLEAN NOT NULL DEFAULT false,
    "reportedMetrics" TEXT,
    "cosmin1_1" INTEGER,
    "cosmin1_2" INTEGER,
    "cosmin1_3" INTEGER,
    "cosmin1_4" INTEGER,
    "cosmin1_5" INTEGER,
    "cosmin1_6" INTEGER,
    "cosmin1_7" INTEGER,
    "cosmin1_8" INTEGER,
    "cosmin1_9" INTEGER,
    "cosmin2_1" INTEGER,
    "cosmin2_2" INTEGER,
    "cosmin2_3" INTEGER,
    "cosmin2_4" INTEGER,
    "cosmin2_5" INTEGER,
    "cosmin2_6" INTEGER,
    "cosmin2_7" INTEGER,
    "cosmin2_8" INTEGER,
    CONSTRAINT "StructuredData_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "StructuredData_paperId_key" ON "StructuredData"("paperId");
