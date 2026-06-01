-- CreateTable
CREATE TABLE "RdvDisponibilite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jourSemaine" INTEGER NOT NULL,
    "heureDebut" TEXT NOT NULL,
    "heureFin" TEXT NOT NULL,
    "dureeMinutes" INTEGER NOT NULL DEFAULT 30,
    "actif" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "RdvReservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TEXT NOT NULL,
    "heure" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "organisation" TEXT,
    "sujet" TEXT NOT NULL,
    "message" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'EN_ATTENTE',
    "noteAdmin" TEXT
);
