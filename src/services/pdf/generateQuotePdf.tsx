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

// @react-pdf ne gère pas les dégradés CSS en backgroundColor → couleurs solides vives.
const HEADER_FILL = "#FD6E00"; // orange vif (en-tête)
const BRAND_FILL = "#E6007E";  // magenta vif (prix, badge, ticks)

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9.5, color: C.ink, backgroundColor: "#FFFDFB", paddingTop: 0, paddingHorizontal: 42, paddingBottom: 60, lineHeight: 1.45 },

  // En-tête — bandeau plein orange pleine largeur
  headerBand: { marginHorizontal: -42, paddingHorizontal: 42, paddingTop: 30, paddingBottom: 24, marginBottom: 22, backgroundColor: HEADER_FILL, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  brand: { fontSize: 26, fontFamily: "Helvetica-Bold", color: "#fff", letterSpacing: -0.5, lineHeight: 1 },
  brandTag: { fontSize: 8, color: "rgba(255,255,255,.9)", marginTop: 7, maxWidth: 230 },
  docBox: { alignItems: "flex-end" },
  docLabel: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#fff", letterSpacing: 2 },
  docNum: { fontSize: 11, fontFamily: "Helvetica-Bold", color: C.yellow, marginTop: 3 },
  docMeta: { fontSize: 8, color: "rgba(255,255,255,.85)", marginTop: 2 },

  // Émetteur / Destinataire (cartes teintées)
  parties: { flexDirection: "row", gap: 16, marginBottom: 20 },
  party: { flex: 1, borderRadius: 10, padding: 12 },
  partyEmit: { backgroundColor: "#FFF1E4" },
  partyDest: { backgroundColor: "#FFE9F2" },
  partyLabel: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: C.rose, letterSpacing: 1.2, marginBottom: 6, textTransform: "uppercase" },
  partyName: { fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 3 },
  partyLine: { fontSize: 8.5, color: "#7A4A5E", marginBottom: 1.5 },

  // Phrase de valeur
  intro: { fontSize: 9.5, fontFamily: "Helvetica-Oblique", color: C.rose, marginBottom: 18, lineHeight: 1.5 },

  // Titres de section
  sectionTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: C.rose, marginBottom: 9, textTransform: "uppercase", letterSpacing: 1.2 },
  section: { marginBottom: 18 },

  // Carte offre (teintée + accent dégradé)
  offerCard: { backgroundColor: "#FFF2F6", borderRadius: 12, padding: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  offerLeft: { flex: 1 },
  offerName: { fontSize: 16, fontFamily: "Helvetica-Bold", color: C.ink },
  offerMention: { fontSize: 8.5, color: "#7A4A5E", marginTop: 2 },
  offerSpecs: { flexDirection: "row", gap: 18, marginTop: 9 },
  spec: {},
  specVal: { fontSize: 13, fontFamily: "Helvetica-Bold", color: C.rose },
  specLabel: { fontSize: 7.5, color: "#7A4A5E", marginTop: 1 },
  durBadge: { backgroundColor: BRAND_FILL, borderRadius: 14, paddingVertical: 9, paddingHorizontal: 14, alignItems: "center" },
  durBadgeVal: { fontSize: 15, fontFamily: "Helvetica-Bold", color: "#fff" },
  durBadgeLabel: { fontSize: 7, color: "rgba(255,255,255,.9)", marginTop: 1, textTransform: "uppercase", letterSpacing: 0.5 },

  // Fonctionnalités
  featGrid: { flexDirection: "row", flexWrap: "wrap" },
  featItem: { flexDirection: "row", alignItems: "flex-start", width: "50%", marginBottom: 6, paddingRight: 10 },
  featTick: { width: 13, height: 13, borderRadius: 7, backgroundColor: BRAND_FILL, marginRight: 7, marginTop: 0.5, justifyContent: "center", alignItems: "center" },
  featTickTxt: { color: "#fff", fontSize: 7, fontFamily: "Helvetica-Bold" },
  featTxt: { fontSize: 8.5, flex: 1 },

  // Bloc prix — magenta vif
  priceCard: { backgroundColor: BRAND_FILL, borderRadius: 12, padding: 16 },
  priceRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5, alignItems: "center" },
  priceLabel: { color: "rgba(255,255,255,.62)", fontSize: 9 },
  priceValue: { color: "#fff", fontSize: 9.5, fontFamily: "Helvetica-Bold" },
  priceDiscount: { color: C.yellow, fontSize: 9.5, fontFamily: "Helvetica-Bold" },
  priceDivider: { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,.18)", marginVertical: 8 },
  totalLabel: { color: "#fff", fontSize: 11, fontFamily: "Helvetica-Bold" },
  totalValue: { color: C.yellow, fontSize: 17, fontFamily: "Helvetica-Bold" },
  ttcLabel: { color: "rgba(255,255,255,.62)", fontSize: 9 },
  ttcValue: { color: "#fff", fontSize: 10, fontFamily: "Helvetica-Bold" },
  perMember: { color: "rgba(255,255,255,.85)", fontSize: 8.5, fontFamily: "Helvetica-Oblique", marginTop: 9, textAlign: "right" },

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
      typeCollectif: string;
    };
  };
}

export async function generateQuotePdf(data: PdfData): Promise<Buffer> {
  const { quote } = data;
  const c = quote.collectif;

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
        {/* En-tête — bandeau dégradé */}
        <View style={styles.headerBand}>
          <View>
            <Text style={styles.brand}>Uvibes</Text>
            <Text style={styles.brandTag}>Activez les conversations positives au sein de votre collectif</Text>
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

        {/* Émetteur / Destinataire */}
        <View style={styles.parties}>
          <View style={[styles.party, styles.partyEmit]}>
            <Text style={styles.partyLabel}>Émetteur</Text>
            <Text style={styles.partyName}>Uvibes</Text>
            <Text style={styles.partyLine}>Projet porté par l&apos;association Éclatens</Text>
            <Text style={styles.partyLine}>contact@uvibes.fr</Text>
            <Text style={styles.partyLine}>uvibes.fr</Text>
          </View>
          <View style={[styles.party, styles.partyDest]}>
            <Text style={styles.partyLabel}>Destinataire</Text>
            <Text style={styles.partyName}>{c.nom}</Text>
            <Text style={styles.partyLine}>{c.contact}</Text>
            <Text style={styles.partyLine}>{c.email}</Text>
            {c.telephone ? <Text style={styles.partyLine}>{c.telephone}</Text> : null}
            <Text style={styles.partyLine}>
              {c.typeCollectif}
              {c.ville ? ` · ${c.ville}` : ""}
            </Text>
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

        {/* Documents contractuels */}
        {docSlugs.length > 0 && (
          <View style={[styles.section, { marginTop: 18 }]}>
            <Text style={styles.sectionTitle}>Documents contractuels</Text>
            <View style={styles.docsList}>
              {docSlugs.map((slug) => (
                <Text key={slug} style={styles.docChip}>{LEGAL_DOCS[slug].titre}</Text>
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
            Éclatens · contact@uvibes.fr · uvibes.fr
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Uvibes · uvibes.fr</Text>
          <Text style={styles.footerText}>Devis {quote.numero}</Text>
        </View>
      </Page>
    </Document>
  );

  const buffer = await renderToBuffer(doc);
  return Buffer.from(buffer);
}
