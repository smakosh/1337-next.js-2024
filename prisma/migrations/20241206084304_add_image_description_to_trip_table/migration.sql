-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "isPast" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL DEFAULT 'Trip description',
    "image" TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1733160972444-b31eb430072b?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    "userId" TEXT NOT NULL,
    CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Trip" ("day", "from", "id", "isPast", "time", "to", "type", "userId") SELECT "day", "from", "id", "isPast", "time", "to", "type", "userId" FROM "Trip";
DROP TABLE "Trip";
ALTER TABLE "new_Trip" RENAME TO "Trip";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
