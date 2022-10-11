-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "publishedAt" DATETIME,
    "pmid" INTEGER NOT NULL,
    "doi" TEXT,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "abstract" TEXT,
    "journal" TEXT
);
INSERT INTO "new_Paper" ("abstract", "authors", "createdAt", "doi", "id", "journal", "pmid", "publishedAt", "title", "updatedAt") SELECT "abstract", "authors", "createdAt", "doi", "id", "journal", "pmid", "publishedAt", "title", "updatedAt" FROM "Paper";
DROP TABLE "Paper";
ALTER TABLE "new_Paper" RENAME TO "Paper";
CREATE UNIQUE INDEX "Paper_pmid_key" ON "Paper"("pmid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
