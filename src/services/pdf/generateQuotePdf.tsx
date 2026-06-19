import fs from "fs";
import path from "path";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";
import { LEGAL_DOCS, type LegalDocSlug } from "@/lib/legalDocs";
import { C, euro, pdfNum } from "./pdfTheme";

// ── Palette minimaliste : un seul accent (orange) + neutres ──────
const ACCENT = "#FD6E00";   // accent unique
const INK = "#1F1B24";      // texte principal
const MUTED = "#6B6470";    // texte secondaire
const LINE = "#E6E2E9";     // filets
const SURFACE = "#F6F5F8";  // fonds de carte neutres
const DARK = "#23202B";     // carte prix (sombre, sobre)

// Émetteur — association porteuse du projet (infos exactes)
const EMETTEUR = {
  nom: "Eclat'Ens, association loi 1901",
  lignes: [
    "52 rue croix de Seguey, 33000 Bordeaux",
    "Tél : 06 60 11 71 93 · Email : eclatens@gmail.com",
    "SIRET : 938 875 002 00017",
    "TVA intracommunautaire : FR 31938875002 · Code APE : 94.99Z",
  ],
};

// Logo Eclat'Ens (lu une fois, encodé en data URI pour @react-pdf)
let ECLATENS_LOGO: string | null = null;
function eclatensLogo(): string | null {
  if (ECLATENS_LOGO !== null) return ECLATENS_LOGO || null;
  try {
    const p = path.join(process.cwd(), "public", "images", "LogoEclatens.png");
    ECLATENS_LOGO = `data:image/png;base64,${fs.readFileSync(p).toString("base64")}`;
  } catch {
    ECLATENS_LOGO = "";
  }
  return ECLATENS_LOGO || null;
}

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9.5, color: C.ink, backgroundColor: "#FFFDFB", paddingTop: 0, paddingHorizontal: 42, paddingBottom: 60, lineHeight: 1.45 },

  // En-tête — minimaliste : logo + bloc devis, filet d'accent
  headerBand: { paddingTop: 30, paddingBottom: 16, marginBottom: 20, borderBottomWidth: 2, borderBottomColor: ACCENT, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  brandLogo: { width: 132, height: 50, objectFit: "contain" },
  docBox: { alignItems: "flex-end" },
  docLabel: { fontSize: 20, fontFamily: "Helvetica-Bold", color: INK, letterSpacing: 3 },
  docNum: { fontSize: 11, fontFamily: "Helvetica-Bold", color: ACCENT, marginTop: 3 },
  docMeta: { fontSize: 8, color: MUTED, marginTop: 2 },

  // Émetteur / Destinataire (cartes neutres)
  parties: { flexDirection: "row", gap: 16, marginBottom: 20 },
  party: { flex: 1, borderRadius: 8, padding: 12, backgroundColor: SURFACE, borderWidth: 1, borderColor: LINE },
  partyLabel: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: ACCENT, letterSpacing: 1.2, marginBottom: 6, textTransform: "uppercase" },
  partyName: { fontSize: 11, fontFamily: "Helvetica-Bold", color: INK, marginBottom: 3 },
  partyLine: { fontSize: 8.5, color: MUTED, marginBottom: 1.5 },

  // Phrase de valeur
  intro: { fontSize: 9.5, fontFamily: "Helvetica-Oblique", color: MUTED, marginBottom: 18, lineHeight: 1.5 },

  // Titres de section
  sectionTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: INK, marginBottom: 9, textTransform: "uppercase", letterSpacing: 1.2 },
  section: { marginBottom: 18 },

  // Carte offre (neutre, accent sobre)
  offerCard: { backgroundColor: SURFACE, borderRadius: 10, borderWidth: 1, borderColor: LINE, padding: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  offerLeft: { flex: 1 },
  offerName: { fontSize: 16, fontFamily: "Helvetica-Bold", color: INK },
  offerMention: { fontSize: 8.5, color: MUTED, marginTop: 2 },
  offerSpecs: { flexDirection: "row", gap: 18, marginTop: 9 },
  spec: {},
  specVal: { fontSize: 13, fontFamily: "Helvetica-Bold", color: ACCENT },
  specLabel: { fontSize: 7.5, color: MUTED, marginTop: 1 },
  durBadge: { backgroundColor: ACCENT, borderRadius: 12, paddingVertical: 9, paddingHorizontal: 14, alignItems: "center" },
  durBadgeVal: { fontSize: 15, fontFamily: "Helvetica-Bold", color: "#fff" },
  durBadgeLabel: { fontSize: 7, color: "rgba(255,255,255,.9)", marginTop: 1, textTransform: "uppercase", letterSpacing: 0.5 },

  // Fonctionnalités
  featGrid: { flexDirection: "row", flexWrap: "wrap" },
  featItem: { flexDirection: "row", alignItems: "flex-start", width: "50%", marginBottom: 6, paddingRight: 10 },
  featTick: { width: 13, height: 13, borderRadius: 7, backgroundColor: ACCENT, marginRight: 7, marginTop: 0.5, justifyContent: "center", alignItems: "center" },
  featTickTxt: { color: "#fff", fontSize: 7, fontFamily: "Helvetica-Bold" },
  featTxt: { fontSize: 8.5, flex: 1, color: INK },

  // Bloc prix — sombre sobre, accent orange
  priceCard: { backgroundColor: DARK, borderRadius: 10, padding: 16 },
  priceRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5, alignItems: "center" },
  priceLabel: { color: "rgba(255,255,255,.6)", fontSize: 9 },
  priceValue: { color: "#fff", fontSize: 9.5, fontFamily: "Helvetica-Bold" },
  priceDiscount: { color: "#FFC9A3", fontSize: 9.5, fontFamily: "Helvetica-Bold" },
  priceDivider: { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,.16)", marginVertical: 8 },
  totalLabel: { color: "#fff", fontSize: 11, fontFamily: "Helvetica-Bold" },
  totalValue: { color: ACCENT, fontSize: 17, fontFamily: "Helvetica-Bold" },
  ttcLabel: { color: "rgba(255,255,255,.6)", fontSize: 9 },
  ttcValue: { color: "#fff", fontSize: 10, fontFamily: "Helvetica-Bold" },
  perMember: { color: "rgba(255,255,255,.8)", fontSize: 8.5, fontFamily: "Helvetica-Oblique", marginTop: 9, textAlign: "right" },

  // Documents contractuels
  docsList: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  docChip: { backgroundColor: C.cardBg, borderRadius: 20, paddingVertical: 4, paddingHorizontal: 10, fontSize: 8, color: C.ink },

  // Signature
  signSection: { marginTop: 6, borderTopWidth: 1, borderTopColor: C.line, paddingTop: 14 },
  signTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: C.orange, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 },
  signName: { fontSize: 10, fontFamily: "Helvetica-Bold", marginTop: 4 },
  signRole: { fontSize: 8.5, color: C.muted },
  signDate: { fontSize: 8, color: C.muted, marginTop: 2 },

  // Mentions + footer
  mentions: { marginTop: 16, padding: 11, backgroundColor: C.cardBgWarm, borderRadius: 8 },
  mentionsText: { fontSize: 7.5, color: C.muted, lineHeight: 1.55 },
  footer: { position: "absolute", bottom: 22, left: 42, right: 42, flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: C.line, paddingTop: 7 },
  footerText: { fontSize: 7.5, color: C.muted },

  // Pages des documents contractuels (annexés au devis)
  legalPage: { fontFamily: "Helvetica", fontSize: 9, color: INK, backgroundColor: "#fff", paddingTop: 42, paddingHorizontal: 48, paddingBottom: 64, lineHeight: 1.5 },
  legalKicker: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: ACCENT, letterSpacing: 1.4, textTransform: "uppercase", marginBottom: 4 },
  legalDocTitle: { fontSize: 15, fontFamily: "Helvetica-Bold", color: INK, marginBottom: 3 },
  legalDocVersion: { fontSize: 8, color: MUTED, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: LINE, paddingBottom: 10 },
  // Titres d'articles (orange) · sous-articles (rose) — cohérent avec les pages web
  legalH2: { fontSize: 11, fontFamily: "Helvetica-Bold", color: ACCENT, marginTop: 13, marginBottom: 5 },
  legalH3: { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: "#D90A5C", marginTop: 9, marginBottom: 4 },
  legalP: { fontSize: 9, color: INK, marginBottom: 6, lineHeight: 1.55, textAlign: "justify" },
  legalLi: { flexDirection: "row", marginBottom: 3, paddingLeft: 4 },
  legalLiBullet: { width: 10, fontSize: 9, color: ACCENT },
  legalLiText: { flex: 1, fontSize: 9, color: INK, lineHeight: 1.5 },
  // Bloc signature client en bas de chaque document légal
  legalSign: { marginTop: 20, borderTopWidth: 1, borderTopColor: LINE, paddingTop: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  legalSignCol: { maxWidth: 230 },
  legalSignLabel: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: ACCENT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 },
  legalSignMention: { fontSize: 8, color: MUTED, marginBottom: 6 },
  legalSignName: { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: INK },
  legalSignMeta: { fontSize: 8, color: MUTED, marginTop: 1 },
  legalSignImg: { width: 150, height: 46, objectFit: "contain" },
});

interface PdfData {
  quote: {
    numero: string;
    createdAt: Date;
    validUntil?: Date | null;
    planNom: string;
    planCouleur?: string;
    nombreUtilisateurs: number;
    dureeContrat: number;
    remise: number;
    prixHT: number;
    prixTTC: number;
    mentionPrix?: string | null;
    featuresJson: string;
    promoCode?: string | null;
    promoPercent?: number | null;
    acceptedDocs?: string | null;
    signedAt?: Date | null;
    signatureData?: string | null;
    signedByName?: string | null;
    signedByRole?: string | null;
    collectif: {
      nom: string;
      contact: string;
      email: string;
      telephone?: string | null;
      ville?: string | null;
      adresse?: string | null;
      siret?: string | null;
      typeCollectif: string;
    };
  };
  // Documents contractuels à joindre en pages suivantes (contenu issu de la base)
  legalDocs?: { slug: string; titre: string; version: string; contenu: string }[];
}

// Rendu du contenu markdown-léger d'un document légal en éléments @react-pdf.
// Mêmes conventions que LegalDocContent : `## ` titre · `### ` sous-titre · `- ` puce · ligne vide = paragraphe.
function renderLegalBlocks(contenu: string) {
  const blocks = contenu.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return blocks.map((block, i) => {
    if (block.startsWith("### ")) return <Text key={i} style={styles.legalH3}>{block.slice(4)}</Text>;
    if (block.startsWith("## ")) return <Text key={i} style={styles.legalH2}>{block.slice(3)}</Text>;
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    const isList = lines.length > 0 && lines.every((l) => l.startsWith("- "));
    if (isList) {
      return (
        <View key={i}>
          {lines.map((l, j) => (
            <View key={j} style={styles.legalLi}>
              <Text style={styles.legalLiBullet}>•</Text>
              <Text style={styles.legalLiText}>{l.slice(2)}</Text>
            </View>
          ))}
        </View>
      );
    }
    return <Text key={i} style={styles.legalP}>{lines.join(" ")}</Text>;
  });
}

export async function generateQuotePdf(data: PdfData): Promise<Buffer> {
  const { quote, legalDocs = [] } = data;
  const c = quote.collectif;
  const logo = eclatensLogo();

  // Fonctionnalités incluses uniquement (mise en valeur de l'offre)
  const allFeatures: { slug: string; nom: string; inclus: boolean }[] = JSON.parse(quote.featuresJson || "[]");
  const features = allFeatures.filter((f) => f.inclus);

  // Décomposition du prix. prixHT stocké = brut × (1−remise volume/durée) × (1−code promo).
  // On reconstruit le brut pour détailler chaque remise en euros (valorisant pour le client).
  const promo = quote.promoPercent ?? 0;
  const auto = quote.remise ?? 0;
  const round2 = (n: number) => Math.round(n * 100) / 100;
  const montantBrut = round2(quote.prixHT / (1 - promo / 100) / (1 - auto / 100));
  const remiseAutoEuros = round2(montantBrut * (auto / 100));
  const sousTotalApresAuto = round2(montantBrut - remiseAutoEuros);
  const promoEuros = round2(sousTotalApresAuto * (promo / 100));
  const tva = round2(quote.prixTTC - quote.prixHT);

  // « ≈ X €/membre/mois » — total ÷ durée (mois) ÷ membres
  const parMembre =
    quote.nombreUtilisateurs > 0 && quote.dureeContrat > 0
      ? quote.prixHT / quote.dureeContrat / quote.nombreUtilisateurs
      : 0;

  // Documents contractuels acceptés / requis
  const docSlugs: LegalDocSlug[] = (() => {
    try {
      const arr = JSON.parse(quote.acceptedDocs || "[]");
      return Array.isArray(arr) ? arr.filter((s): s is LegalDocSlug => s in LEGAL_DOCS) : [];
    } catch {
      return [];
    }
  })();

  const doc = (
    <Document title={`Devis ${quote.numero} — Uvibes`} author="Uvibes">
      <Page size="A4" style={styles.page}>
        {/* En-tête — logo Eclat'Ens + bloc devis */}
        <View style={styles.headerBand}>
          <View>
            {logo ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={logo} style={styles.brandLogo} />
            ) : (
              <Text style={{ fontSize: 18, fontFamily: "Helvetica-Bold", color: INK }}>Eclat&apos;Ens</Text>
            )}
          </View>
          <View style={styles.docBox}>
            <Text style={styles.docLabel}>DEVIS</Text>
            <Text style={styles.docNum}>{quote.numero}</Text>
            <Text style={styles.docMeta}>Émis le {new Date(quote.createdAt).toLocaleDateString("fr-FR")}</Text>
            {quote.validUntil && (
              <Text style={styles.docMeta}>Valable jusqu&apos;au {new Date(quote.validUntil).toLocaleDateString("fr-FR")}</Text>
            )}
          </View>
        </View>

        {/* Prestataire (Eclat'Ens) / Client — noms d'entreprise directs */}
        <View style={styles.parties}>
          <View style={styles.party}>
            <Text style={styles.partyLabel}>Prestataire</Text>
            <Text style={styles.partyName}>{EMETTEUR.nom}</Text>
            {EMETTEUR.lignes.map((l, i) => (
              <Text key={i} style={styles.partyLine}>{l}</Text>
            ))}
          </View>
          <View style={styles.party}>
            <Text style={styles.partyLabel}>Client</Text>
            <Text style={styles.partyName}>{c.nom}</Text>
            <Text style={styles.partyLine}>{c.contact}</Text>
            <Text style={styles.partyLine}>{c.email}</Text>
            {c.telephone ? <Text style={styles.partyLine}>{c.telephone}</Text> : null}
            {c.adresse ? <Text style={styles.partyLine}>{c.adresse}</Text> : (c.ville ? <Text style={styles.partyLine}>{c.ville}</Text> : null)}
            {c.siret ? <Text style={styles.partyLine}>SIRET : {c.siret}</Text> : null}
            <Text style={styles.partyLine}>{c.typeCollectif}</Text>
          </View>
        </View>

        {/* Phrase de valeur */}
        <Text style={styles.intro}>
          Uvibes est une solution socio-digitale qui renforce le lien social, le bien-être et l&apos;engagement
          au sein de votre collectif, par des conversations positives et des rencontres inattendues.
        </Text>

        {/* Offre */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Votre offre</Text>
          <View style={styles.offerCard}>
            <View style={styles.offerLeft}>
              <Text style={styles.offerName}>{quote.planNom}</Text>
              {quote.mentionPrix ? <Text style={styles.offerMention}>{quote.mentionPrix}</Text> : null}
              <View style={styles.offerSpecs}>
                <View style={styles.spec}>
                  <Text style={styles.specVal}>{quote.nombreUtilisateurs}</Text>
                  <Text style={styles.specLabel}>Membres</Text>
                </View>
                <View style={styles.spec}>
                  <Text style={styles.specVal}>{Math.round((quote.dureeContrat / 12) * 10) / 10} an{quote.dureeContrat >= 24 ? "s" : ""}</Text>
                  <Text style={styles.specLabel}>Engagement</Text>
                </View>
              </View>
            </View>
            <View style={styles.durBadge}>
              <Text style={styles.durBadgeVal}>{quote.dureeContrat}</Text>
              <Text style={styles.durBadgeLabel}>mois</Text>
            </View>
          </View>
        </View>

        {/* Fonctionnalités incluses */}
        {features.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ce que comprend votre abonnement</Text>
            <View style={styles.featGrid}>
              {features.map((f) => (
                <View key={f.slug} style={styles.featItem}>
                  <View style={styles.featTick}>
                    <Text style={styles.featTickTxt}>✓</Text>
                  </View>
                  <Text style={styles.featTxt}>{f.nom}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Prix */}
        <View style={styles.priceCard}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Abonnement {quote.planNom} ({quote.dureeContrat} mois)</Text>
            <Text style={styles.priceValue}>{euro(montantBrut)}</Text>
          </View>
          {auto > 0 && (
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Remise volume &amp; engagement (−{auto}%)</Text>
              <Text style={styles.priceDiscount}>−{euro(remiseAutoEuros)}</Text>
            </View>
          )}
          {promo > 0 && (
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Code promo {quote.promoCode ? quote.promoCode : ""} (−{promo}%)</Text>
              <Text style={styles.priceDiscount}>−{euro(promoEuros)}</Text>
            </View>
          )}
          <View style={styles.priceDivider} />
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total HT</Text>
            <Text style={styles.totalValue}>{euro(quote.prixHT)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.ttcLabel}>TVA 20%</Text>
            <Text style={styles.ttcValue}>{euro(tva)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.ttcLabel}>Total TTC</Text>
            <Text style={styles.ttcValue}>{euro(quote.prixTTC)}</Text>
          </View>
          {parMembre > 0 && (
            <Text style={styles.perMember}>
              soit environ {pdfNum(parMembre, { maximumFractionDigits: 2 })} € HT / membre / mois
            </Text>
          )}
        </View>

        {/* Conditions de paiement */}
        <View style={[styles.section, { marginTop: 18 }]}>
          <Text style={styles.sectionTitle}>Conditions de paiement</Text>
          <Text style={{ fontSize: 9, color: INK, lineHeight: 1.5 }}>
            Paiement en une seule fois, à la mise en place de l&apos;abonnement.
          </Text>
        </View>

        {/* Documents contractuels — joints en pages suivantes */}
        {(legalDocs.length > 0 || docSlugs.length > 0) && (
          <View style={[styles.section, { marginTop: 18 }]}>
            <Text style={styles.sectionTitle}>Cadre contractuel applicable (joint ci-après)</Text>
            <View style={styles.docsList}>
              {(legalDocs.length > 0
                ? legalDocs.map((d) => ({ key: d.slug, titre: d.titre }))
                : docSlugs.map((slug) => ({ key: slug, titre: LEGAL_DOCS[slug].titre }))
              ).map((d) => (
                <Text key={d.key} style={styles.docChip}>{d.titre}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Signature */}
        {quote.signedAt && (
          <View style={styles.signSection} wrap={false}>
            <Text style={styles.signTitle}>Signature électronique</Text>
            {quote.signatureData ? (
              // @react-pdf Image n'est pas une balise <img> HTML — la règle alt-text ne s'applique pas
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={quote.signatureData} style={{ width: 190, height: 56, objectFit: "contain" }} />
            ) : null}
            {quote.signedByName ? <Text style={styles.signName}>{quote.signedByName}</Text> : null}
            {quote.signedByRole ? <Text style={styles.signRole}>{quote.signedByRole}</Text> : null}
            <Text style={styles.signDate}>
              Signé le {new Date(quote.signedAt).toLocaleDateString("fr-FR")} à {new Date(quote.signedAt).toLocaleTimeString("fr-FR")}
            </Text>
          </View>
        )}

        {/* Mentions */}
        <View style={styles.mentions}>
          <Text style={styles.mentionsText}>
            Devis valable 30 jours à compter de sa date d&apos;émission, sauf mention contraire ci-dessus.
            Prix en euros, TVA 20% applicable. Tout devis signé électroniquement vaut acceptation des documents
            contractuels associés et constitue un accord ferme. Uvibes, projet porté par l&apos;association
            Eclat&apos;Ens · eclatens@gmail.com · uvibes.fr
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Eclat&apos;Ens · uvibes.fr</Text>
          <Text style={styles.footerText}>Devis {quote.numero}</Text>
        </View>
      </Page>

      {/* Documents contractuels annexés — une page par document (contenu issu de l'admin) */}
      {legalDocs.map((d) => (
        <Page key={d.slug} size="A4" style={styles.legalPage}>
          <Text style={styles.legalKicker}>Document contractuel · annexé au devis {quote.numero}</Text>
          <Text style={styles.legalDocTitle}>{d.titre}</Text>
          <Text style={styles.legalDocVersion}>Version du {d.version}</Text>
          {renderLegalBlocks(d.contenu)}

          {/* Signature du client — en bas de chaque document légal */}
          <View style={styles.legalSign} wrap={false}>
            <View style={styles.legalSignCol}>
              <Text style={styles.legalSignLabel}>Signature du client</Text>
              <Text style={styles.legalSignMention}>(précédée de la mention «&nbsp;Bon pour accord&nbsp;»)</Text>
              {quote.signedByName ? <Text style={styles.legalSignName}>{quote.signedByName}</Text> : null}
              {quote.signedByRole ? <Text style={styles.legalSignMeta}>{quote.signedByRole}</Text> : null}
              {quote.signedAt ? <Text style={styles.legalSignMeta}>Le {new Date(quote.signedAt).toLocaleDateString("fr-FR")}</Text> : null}
            </View>
            {quote.signatureData ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={quote.signatureData} style={styles.legalSignImg} />
            ) : null}
          </View>

          <View style={styles.footer} fixed>
            <Text style={styles.footerText}>Eclat&apos;Ens · uvibes.fr</Text>
            <Text style={styles.footerText}>Devis {quote.numero}</Text>
          </View>
        </Page>
      ))}
    </Document>
  );

  const buffer = await renderToBuffer(doc);
  return Buffer.from(buffer);
}
