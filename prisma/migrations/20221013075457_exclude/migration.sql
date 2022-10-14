-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StructuredData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "exclude" BOOLEAN NOT NULL DEFAULT false,
    "paperId" INTEGER NOT NULL,
    "investigatedScore" TEXT,
    "scoreAbbreviation" TEXT,
    "disease" TEXT,
    "construct" TEXT,
    "subgroup" TEXT,
    "n" TEXT,
    "isComparative" BOOLEAN NOT NULL DEFAULT false,
    "isProposal" BOOLEAN NOT NULL DEFAULT false,
    "comparedWith" TEXT,
    "numItems" TEXT,
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
INSERT INTO "new_StructuredData" ("comparedWith", "construct", "cosmin1_1", "cosmin1_2", "cosmin1_3", "cosmin1_4", "cosmin1_5", "cosmin1_6", "cosmin1_7", "cosmin1_8", "cosmin1_9", "cosmin2_1", "cosmin2_2", "cosmin2_3", "cosmin2_4", "cosmin2_5", "cosmin2_6", "cosmin2_7", "cosmin2_8", "createdAt", "disease", "id", "investigatedScore", "isComparative", "isProposal", "itemsReportedByOther", "itemsReportedByPatient", "itemsReportedByPhysician", "n", "numItems", "paperId", "reportedMetrics", "scoreAbbreviation", "subgroup", "updatedAt") SELECT "comparedWith", "construct", "cosmin1_1", "cosmin1_2", "cosmin1_3", "cosmin1_4", "cosmin1_5", "cosmin1_6", "cosmin1_7", "cosmin1_8", "cosmin1_9", "cosmin2_1", "cosmin2_2", "cosmin2_3", "cosmin2_4", "cosmin2_5", "cosmin2_6", "cosmin2_7", "cosmin2_8", "createdAt", "disease", "id", "investigatedScore", "isComparative", "isProposal", "itemsReportedByOther", "itemsReportedByPatient", "itemsReportedByPhysician", "n", "numItems", "paperId", "reportedMetrics", "scoreAbbreviation", "subgroup", "updatedAt" FROM "StructuredData";
DROP TABLE "StructuredData";
ALTER TABLE "new_StructuredData" RENAME TO "StructuredData";
CREATE UNIQUE INDEX "StructuredData_paperId_key" ON "StructuredData"("paperId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
