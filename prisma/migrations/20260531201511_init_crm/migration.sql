-- CreateTable
CREATE TABLE "Collectif" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "nom" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "ville" TEXT,
    "typeCollectif" TEXT NOT NULL,
    "tailleCollectif" TEXT NOT NULL,
    "usagesPrevus" TEXT NOT NULL DEFAULT '[]',
    "besoinsNotes" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'PROSPECT',
    "notes" TEXT,
    "source" TEXT NOT NULL DEFAULT 'formulaire_site'
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "numero" TEXT NOT NULL,
    "collectifId" TEXT NOT NULL,
    "planSlug" TEXT NOT NULL,
    "planNom" TEXT NOT NULL,
    "planCouleur" TEXT NOT NULL,
    "featuresJson" TEXT NOT NULL DEFAULT '[]',
    "nombreUtilisateurs" INTEGER NOT NULL,
    "dureeContrat" INTEGER NOT NULL,
    "remise" REAL NOT NULL DEFAULT 0,
    "prixHT" REAL NOT NULL,
    "prixTTC" REAL NOT NULL,
    "mentionPrix" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'BROUILLON',
    "validUntil" DATETIME,
    "signedAt" DATETIME,
    "signatureData" TEXT,
    "signedByName" TEXT,
    "signedByRole" TEXT,
    "pdfPath" TEXT,
    "pdfGeneratedAt" DATETIME,
    "sentAt" DATETIME,
    "sentTo" TEXT,
    CONSTRAINT "Quote_collectifId_fkey" FOREIGN KEY ("collectifId") REFERENCES "Collectif" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CmsContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cle" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "valeur" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "siteUrl" TEXT,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "ordre" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Testimony" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "texte" TEXT NOT NULL,
    "auteur" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "ordre" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "poste" TEXT NOT NULL,
    "equipe" TEXT NOT NULL,
    "photoUrl" TEXT,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "ordre" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "couleur" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prixAnnuel" REAL NOT NULL,
    "mention" TEXT,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "ordre" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "PlanFeature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "planId" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,
    "valeur" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "PlanFeature_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlanFeature_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'EDITOR',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLoginAt" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "Quote_numero_key" ON "Quote"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "CmsContent_cle_key" ON "CmsContent"("cle");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_slug_key" ON "Plan"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_slug_key" ON "Feature"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PlanFeature_planId_featureId_key" ON "PlanFeature"("planId", "featureId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
