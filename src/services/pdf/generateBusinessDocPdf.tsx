import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";
import { C, euro } from "./pdfTheme";

const HEADER_FILL = "#FD6E00";
const BRAND_FILL = "#E6007E";

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9.5, color: C.ink, backgroundColor: "#FFFDFB", paddingTop: 0, paddingHorizontal: 42, paddingBottom: 56, lineHeight: 1.45 },
  headerBand: { marginHorizontal: -42, paddingHorizontal: 42, paddingTop: 30, paddingBottom: 24, marginBottom: 22, backgroundColor: HEADER_FILL, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  brand: { fontSize: 26, fontFamily: "Helvetica-Bold", color: "#fff", letterSpacing: -0.5, lineHeight: 1 },
  brandTag: { fontSize: 8, color: "rgba(255,255,255,.9)", marginTop: 7, maxWidth: 230 },
  docBox: { alignItems: "flex-end" },
  docLabel: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#fff", letterSpacing: 2 },
  docNum: { fontSize: 11, fontFamily: "Helvetica-Bold", color: C.yellow, marginTop: 3 },
  docMeta: { fontSize: 8, color: "rgba(255,255,255,.85)", marginTop: 2 },

  parties: { flexDirection: "row", gap: 16, marginBottom: 20 },
  party: { flex: 1, borderRadius: 10, padding: 12 },
  partyEmit: { backgroundColor: "#FFF1E4" },
  partyDest: { backgroundColor: "#FFE9F2" },
  partyLabel: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: C.rose, letterSpacing: 1.2, marginBottom: 6, textTransform: "uppercase" },
  partyName: { fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 3 },
  partyLine: { fontSize: 8.5, color: "#7A4A5E", marginBottom: 1.5 },

  objet: { fontSize: 13, fontFamily: "Helvetica-Bold", color: C.ink, marginBottom: 12 },
  sectionTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: C.rose, marginBottom: 9, textTransform: "uppercase", letterSpacing: 1.2 },

  // Tableau lignes (facture)
  tHead: { flexDirection: "row", backgroundColor: BRAND_FILL, borderRadius: 6, paddingVertical: 7, paddingHorizontal: 10 },
  tHeadCell: { color: "#fff", fontSize: 8, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 0.5 },
  tRow: { flexDirection: "row", paddingVertical: 8, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: C.line },
  cDesc: { flex: 1 },
  cQty: { width: 50, textAlign: "right" },
  cPU: { width: 80, textAlign: "right" },
  cAmount: { width: 80, textAlign: "right" },
  cellTxt: { fontSize: 9 },
  cellBold: { fontSize: 9, fontFamily: "Helvetica-Bold" },

  totals: { marginTop: 14, alignSelf: "flex-end", width: 240 },
  tLine: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 },
  tLabel: { fontSize: 9.5, color: C.muted },
  tVal: { fontSize: 9.5, fontFamily: "Helvetica-Bold" },
  grand: { flexDirection: "row", justifyContent: "space-between", marginTop: 6, backgroundColor: BRAND_FILL, borderRadius: 8, paddingVertical: 9, paddingHorizontal: 12 },
  grandLabel: { color: "#fff", fontSize: 11, fontFamily: "Helvetica-Bold" },
  grandVal: { color: C.yellow, fontSize: 14, fontFamily: "Helvetica-Bold" },

  // Corps (contrat)
  para: { fontSize: 9.5, color: C.ink, marginBottom: 9, lineHeight: 1.55 },

  conditions: { marginTop: 20, padding: 12, backgroundColor: "#FFF6EC", borderRadius: 8 },
  conditionsText: { fontSize: 8, color: C.muted, lineHeight: 1.55 },
  signBox: { marginTop: 28, flexDirection: "row", gap: 24 },
  signCol: { flex: 1 },
  signLabel: { fontSize: 8, color: C.muted, marginBottom: 28, textTransform: "uppercase", letterSpacing: 0.5 },
  signLine: { borderTopWidth: 1, borderTopColor: C.line, paddingTop: 4, fontSize: 8, color: C.muted },

  footer: { position: "absolute", bottom: 22, left: 42, right: 42, flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: C.line, paddingTop: 7 },
  footerText: { fontSize: 7.5, color: C.muted },
});

interface Ligne { description: string; quantite: number; prixUnitaire: number }

export interface BusinessDocData {
  numero: string;
  type: string; // FACTURE | CONTRAT
  clientNom: string;
  clientContact?: string | null;
  clientEmail?: string | null;
  clientAdresse?: string | null;
  objet?: string | null;
  dateEmission: Date;
  dateEcheance?: Date | null;
  lignes: Ligne[];
  corps?: string | null;
  conditions?: string | null;
  tauxTva: number;
}

export async function generateBusinessDocPdf(d: BusinessDocData): Promise<Buffer> {
  const isFacture = d.type === "FACTURE";
  const label = isFacture ? "FACTURE" : "CONTRAT";

  const totalHT = d.lignes.reduce((s, l) => s + l.quantite * l.prixUnitaire, 0);
  const tva = Math.round(totalHT * (d.tauxTva / 100) * 100) / 100;
  const ttc = Math.round((totalHT + tva) * 100) / 100;

  const paragraphes = (d.corps || "").split(/\n{2,}|\n/).map((p) => p.trim()).filter(Boolean);

  const doc = (
    <Document title={`${label} ${d.numero} — Uvibes`} author="Uvibes">
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBand}>
          <View>
            <Text style={styles.brand}>Uvibes</Text>
            <Text style={styles.brandTag}>Projet porté par l&apos;association Éclatens</Text>
          </View>
          <View style={styles.docBox}>
            <Text style={styles.docLabel}>{label}</Text>
            <Text style={styles.docNum}>{d.numero}</Text>
            <Text style={styles.docMeta}>Émis le {new Date(d.dateEmission).toLocaleDateString("fr-FR")}</Text>
            {d.dateEcheance && (
              <Text style={styles.docMeta}>
                {isFacture ? "Échéance" : "Valable jusqu'au"} : {new Date(d.dateEcheance).toLocaleDateString("fr-FR")}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.parties}>
          <View style={[styles.party, styles.partyEmit]}>
            <Text style={styles.partyLabel}>Émetteur</Text>
            <Text style={styles.partyName}>Uvibes · Association Éclatens</Text>
            <Text style={styles.partyLine}>contact@uvibes.fr</Text>
            <Text style={styles.partyLine}>uvibes.fr</Text>
          </View>
          <View style={[styles.party, styles.partyDest]}>
            <Text style={styles.partyLabel}>{isFacture ? "Facturé à" : "Entre les parties"}</Text>
            <Text style={styles.partyName}>{d.clientNom}</Text>
            {d.clientContact ? <Text style={styles.partyLine}>{d.clientContact}</Text> : null}
            {d.clientEmail ? <Text style={styles.partyLine}>{d.clientEmail}</Text> : null}
            {d.clientAdresse ? <Text style={styles.partyLine}>{d.clientAdresse}</Text> : null}
          </View>
        </View>

        {d.objet ? <Text style={styles.objet}>{d.objet}</Text> : null}

        {isFacture ? (
          <>
            <Text style={styles.sectionTitle}>Détail</Text>
            <View style={styles.tHead}>
              <Text style={[styles.tHeadCell, styles.cDesc]}>Description</Text>
              <Text style={[styles.tHeadCell, styles.cQty]}>Qté</Text>
              <Text style={[styles.tHeadCell, styles.cPU]}>P.U. HT</Text>
              <Text style={[styles.tHeadCell, styles.cAmount]}>Montant HT</Text>
            </View>
            {d.lignes.map((l, i) => (
              <View key={i} style={styles.tRow}>
                <Text style={[styles.cellTxt, styles.cDesc]}>{l.description}</Text>
                <Text style={[styles.cellTxt, styles.cQty]}>{l.quantite}</Text>
                <Text style={[styles.cellTxt, styles.cPU]}>{euro(l.prixUnitaire)}</Text>
                <Text style={[styles.cellBold, styles.cAmount]}>{euro(l.quantite * l.prixUnitaire)}</Text>
              </View>
            ))}
            <View style={styles.totals}>
              <View style={styles.tLine}><Text style={styles.tLabel}>Total HT</Text><Text style={styles.tVal}>{euro(totalHT)}</Text></View>
              <View style={styles.tLine}><Text style={styles.tLabel}>TVA {d.tauxTva}%</Text><Text style={styles.tVal}>{euro(tva)}</Text></View>
              <View style={styles.grand}>
                <Text style={styles.grandLabel}>Total TTC</Text>
                <Text style={styles.grandVal}>{euro(ttc)}</Text>
              </View>
            </View>
          </>
        ) : (
          <View>
            {paragraphes.map((p, i) => <Text key={i} style={styles.para}>{p}</Text>)}
            <View style={styles.signBox}>
              <View style={styles.signCol}>
                <Text style={styles.signLabel}>Le Prestataire</Text>
                <Text style={styles.signLine}>Uvibes · Association Éclatens</Text>
              </View>
              <View style={styles.signCol}>
                <Text style={styles.signLabel}>Le Client</Text>
                <Text style={styles.signLine}>{d.clientNom}</Text>
              </View>
            </View>
          </View>
        )}

        {d.conditions ? (
          <View style={styles.conditions}>
            <Text style={styles.conditionsText}>{d.conditions}</Text>
          </View>
        ) : null}

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Uvibes · uvibes.fr</Text>
          <Text style={styles.footerText}>{label} {d.numero}</Text>
        </View>
      </Page>
    </Document>
  );

  const buffer = await renderToBuffer(doc);
  return Buffer.from(buffer);
}
