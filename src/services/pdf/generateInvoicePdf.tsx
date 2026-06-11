import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";

Font.registerHyphenationCallback((w) => [w]);

const C = {
  ink: "#2A0E1E",
  orange: "#FD6E00",
  rose: "#D90A5C",
  muted: "#8A6B78",
  line: "#ECD9E2",
  cardBg: "#FBF3F6",
  yellow: "#FFE456",
};

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9.5, color: C.ink, backgroundColor: "#FFFFFF", paddingTop: 0, paddingHorizontal: 42, paddingBottom: 56, lineHeight: 1.45 },
  topBand: { height: 6, marginHorizontal: -42, backgroundColor: C.rose },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginTop: 26, marginBottom: 22 },
  brand: { fontSize: 24, fontFamily: "Helvetica-Bold", color: C.orange, letterSpacing: -0.5 },
  brandTag: { fontSize: 8, color: C.muted, marginTop: 3, maxWidth: 220 },
  docBox: { alignItems: "flex-end" },
  docLabel: { fontSize: 16, fontFamily: "Helvetica-Bold", color: C.ink, letterSpacing: 2 },
  docNum: { fontSize: 10, fontFamily: "Helvetica-Bold", color: C.rose, marginTop: 3 },
  docMeta: { fontSize: 8, color: C.muted, marginTop: 2 },
  parties: { flexDirection: "row", gap: 16, marginBottom: 22 },
  party: { flex: 1, backgroundColor: C.cardBg, borderRadius: 8, padding: 12 },
  partyLabel: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: C.rose, letterSpacing: 1.2, marginBottom: 6, textTransform: "uppercase" },
  partyName: { fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 3 },
  partyLine: { fontSize: 8.5, color: C.muted, marginBottom: 1.5 },
  sectionTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: C.rose, marginBottom: 9, textTransform: "uppercase", letterSpacing: 1.2 },
  // Tableau lignes
  tHead: { flexDirection: "row", backgroundColor: C.ink, borderRadius: 6, paddingVertical: 7, paddingHorizontal: 10 },
  tHeadCell: { color: "#fff", fontSize: 8, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 0.5 },
  tRow: { flexDirection: "row", paddingVertical: 9, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: C.line },
  cDesc: { flex: 1 },
  cQty: { width: 70, textAlign: "right" },
  cAmount: { width: 90, textAlign: "right" },
  itemName: { fontSize: 10, fontFamily: "Helvetica-Bold" },
  itemSub: { fontSize: 8, color: C.muted, marginTop: 2 },
  // Totaux
  totals: { marginTop: 14, alignSelf: "flex-end", width: 240 },
  tLine: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 },
  tLabel: { fontSize: 9.5, color: C.muted },
  tVal: { fontSize: 9.5, fontFamily: "Helvetica-Bold" },
  grand: { flexDirection: "row", justifyContent: "space-between", marginTop: 6, backgroundColor: C.rose, borderRadius: 8, paddingVertical: 9, paddingHorizontal: 12 },
  grandLabel: { color: "#fff", fontSize: 11, fontFamily: "Helvetica-Bold" },
  grandVal: { color: C.yellow, fontSize: 14, fontFamily: "Helvetica-Bold" },
  pay: { marginTop: 22, padding: 12, backgroundColor: C.cardBg, borderRadius: 8 },
  payTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: C.rose, textTransform: "uppercase", letterSpacing: 1, marginBottom: 5 },
  payText: { fontSize: 8.5, color: C.muted, lineHeight: 1.5 },
  footer: { position: "absolute", bottom: 22, left: 42, right: 42, flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: C.line, paddingTop: 7 },
  footerText: { fontSize: 7.5, color: C.muted },
});

const euro = (n: number) => `${n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} €`;

interface InvoiceData {
  quote: {
    numero: string;
    createdAt: Date;
    planNom: string;
    dureeContrat: number;
    prixHT: number;
    prixTTC: number;
    signedAt?: Date | null;
    collectif: { nom: string; contact: string; email: string; telephone?: string | null; ville?: string | null; typeCollectif: string };
  };
}

export async function generateInvoicePdf(data: InvoiceData): Promise<Buffer> {
  const { quote } = data;
  const c = quote.collectif;
  const tva = Math.round((quote.prixTTC - quote.prixHT) * 100) / 100;

  // Numéro de facture dérivé du devis, échéance à 30 jours.
  const factureNum = quote.numero.replace(/^UV/, "FAC");
  const emission = new Date();
  const echeance = new Date();
  echeance.setDate(echeance.getDate() + 30);

  const doc = (
    <Document title={`Facture ${factureNum} — Uvibes`} author="Uvibes">
      <Page size="A4" style={styles.page}>
        <View style={styles.topBand} />

        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>Uvibes</Text>
            <Text style={styles.brandTag}>Projet porté par l&apos;association Éclatens</Text>
          </View>
          <View style={styles.docBox}>
            <Text style={styles.docLabel}>FACTURE</Text>
            <Text style={styles.docNum}>{factureNum}</Text>
            <Text style={styles.docMeta}>Émise le {emission.toLocaleDateString("fr-FR")}</Text>
            <Text style={styles.docMeta}>Échéance : {echeance.toLocaleDateString("fr-FR")}</Text>
            <Text style={styles.docMeta}>Réf. devis : {quote.numero}</Text>
          </View>
        </View>

        <View style={styles.parties}>
          <View style={styles.party}>
            <Text style={styles.partyLabel}>Émetteur</Text>
            <Text style={styles.partyName}>Uvibes — Association Éclatens</Text>
            <Text style={styles.partyLine}>contact@uvibes.fr</Text>
            <Text style={styles.partyLine}>uvibes.fr</Text>
          </View>
          <View style={styles.party}>
            <Text style={styles.partyLabel}>Facturé à</Text>
            <Text style={styles.partyName}>{c.nom}</Text>
            <Text style={styles.partyLine}>{c.contact}</Text>
            <Text style={styles.partyLine}>{c.email}</Text>
            {c.ville ? <Text style={styles.partyLine}>{c.ville}</Text> : null}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Détail de la prestation</Text>
        <View style={styles.tHead}>
          <Text style={[styles.tHeadCell, styles.cDesc]}>Description</Text>
          <Text style={[styles.tHeadCell, styles.cQty]}>Durée</Text>
          <Text style={[styles.tHeadCell, styles.cAmount]}>Montant HT</Text>
        </View>
        <View style={styles.tRow}>
          <View style={styles.cDesc}>
            <Text style={styles.itemName}>Abonnement {quote.planNom}</Text>
            <Text style={styles.itemSub}>Solution Uvibes — animation et pilotage de votre collectif</Text>
          </View>
          <Text style={[styles.cQty, { fontSize: 9.5 }]}>{quote.dureeContrat} mois</Text>
          <Text style={[styles.cAmount, { fontSize: 9.5, fontFamily: "Helvetica-Bold" }]}>{euro(quote.prixHT)}</Text>
        </View>

        <View style={styles.totals}>
          <View style={styles.tLine}>
            <Text style={styles.tLabel}>Total HT</Text>
            <Text style={styles.tVal}>{euro(quote.prixHT)}</Text>
          </View>
          <View style={styles.tLine}>
            <Text style={styles.tLabel}>TVA 20%</Text>
            <Text style={styles.tVal}>{euro(tva)}</Text>
          </View>
          <View style={styles.grand}>
            <Text style={styles.grandLabel}>Total à régler TTC</Text>
            <Text style={styles.grandVal}>{euro(quote.prixTTC)}</Text>
          </View>
        </View>

        <View style={styles.pay}>
          <Text style={styles.payTitle}>Conditions de règlement</Text>
          <Text style={styles.payText}>
            Paiement à 30 jours à compter de la date d&apos;émission. Les coordonnées bancaires
            de l&apos;association Éclatens vous sont communiquées séparément. En cas de retard,
            des pénalités au taux légal majoré et une indemnité forfaitaire de 40 € pour frais
            de recouvrement seront applicables (art. D.441-5 du Code de commerce). TVA 20% applicable.
          </Text>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Uvibes · uvibes.fr</Text>
          <Text style={styles.footerText}>Facture {factureNum}</Text>
        </View>
      </Page>
    </Document>
  );

  const buffer = await renderToBuffer(doc);
  return Buffer.from(buffer);
}
