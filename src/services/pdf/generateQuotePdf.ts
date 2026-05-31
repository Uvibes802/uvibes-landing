import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";
import React from "react";

// Désactiver hyphenation
Font.registerHyphenationCallback((w) => [w]);

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, color: "#4A1530", backgroundColor: "#FFFBF4", padding: 40 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 28, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: "#E0AEC4" },
  brand: { fontSize: 22, fontFamily: "Helvetica-Bold", color: "#FD6E00" },
  headerRight: { alignItems: "flex-end" },
  numero: { fontSize: 11, fontFamily: "Helvetica-Bold", color: "#4A1530" },
  date: { fontSize: 9, color: "#B0507E", marginTop: 2 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 11, fontFamily: "Helvetica-Bold", color: "#FD6E00", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 },
  row: { flexDirection: "row", marginBottom: 4 },
  label: { width: 160, color: "#B0507E", fontSize: 9 },
  value: { flex: 1, fontSize: 9, fontFamily: "Helvetica-Bold" },
  planCard: { backgroundColor: "#FFF6EC", borderRadius: 8, padding: 16, borderLeftWidth: 4, borderLeftColor: "#FD6E00", marginBottom: 16 },
  planName: { fontSize: 16, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  planDesc: { fontSize: 9, color: "#7A2050" },
  featureRow: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  featureCheck: { width: 14, height: 14, borderRadius: 7, backgroundColor: "#FD6E00", marginRight: 8, justifyContent: "center", alignItems: "center" },
  featureCross: { width: 14, height: 14, borderRadius: 7, backgroundColor: "#E0AEC4", marginRight: 8 },
  featureText: { fontSize: 9 },
  featureTextOff: { fontSize: 9, color: "#B0507E", textDecoration: "line-through" },
  priceSection: { backgroundColor: "#4A1530", borderRadius: 8, padding: 16, marginTop: 16 },
  priceRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  priceLabel: { color: "rgba(255,255,255,.65)", fontSize: 9 },
  priceValue: { color: "#fff", fontSize: 9, fontFamily: "Helvetica-Bold" },
  priceTotalLabel: { color: "#FFE456", fontSize: 12, fontFamily: "Helvetica-Bold" },
  priceTotalValue: { color: "#FFE456", fontSize: 16, fontFamily: "Helvetica-Bold" },
  divider: { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,.2)", marginVertical: 8 },
  signatureSection: { marginTop: 24, borderTopWidth: 1, borderTopColor: "#E0AEC4", paddingTop: 16 },
  signatureTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", marginBottom: 8 },
  signatureBox: { borderWidth: 1, borderColor: "#E0AEC4", borderRadius: 6, padding: 8, height: 80, justifyContent: "flex-end" },
  signatureName: { fontSize: 9, color: "#4A1530", marginTop: 4 },
  signatureRole: { fontSize: 8, color: "#B0507E" },
  signatureDate: { fontSize: 8, color: "#B0507E", marginTop: 2 },
  footer: { position: "absolute", bottom: 24, left: 40, right: 40, flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: "#E0AEC4", paddingTop: 8 },
  footerText: { fontSize: 8, color: "#B0507E" },
  mentions: { marginTop: 16, padding: 12, backgroundColor: "#FFF6EC", borderRadius: 6 },
  mentionsText: { fontSize: 8, color: "#B0507E", lineHeight: 1.5 },
});

interface PdfData {
  quote: {
    numero: string;
    createdAt: Date;
    validUntil?: Date | null;
    planNom: string;
    planCouleur: string;
    nombreUtilisateurs: number;
    dureeContrat: number;
    remise: number;
    prixHT: number;
    prixTTC: number;
    featuresJson: string;
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
  const features: { slug: string; nom: string; inclus: boolean }[] = JSON.parse(
    quote.featuresJson || "[]"
  );

  const doc = React.createElement(
    Document,
    { title: `Devis ${quote.numero} — Uvibes` },
    React.createElement(
      Page,
      { size: "A4", style: styles.page },

      // Header
      React.createElement(
        View,
        { style: styles.header },
        React.createElement(Text, { style: styles.brand }, "Uvibes"),
        React.createElement(
          View,
          { style: styles.headerRight },
          React.createElement(Text, { style: styles.numero }, `Devis ${quote.numero}`),
          React.createElement(
            Text,
            { style: styles.date },
            `Émis le ${new Date(quote.createdAt).toLocaleDateString("fr-FR")}`
          ),
          quote.validUntil &&
            React.createElement(
              Text,
              { style: styles.date },
              `Valable jusqu'au ${new Date(quote.validUntil).toLocaleDateString("fr-FR")}`
            )
        )
      ),

      // Coordonnées collectif
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Destinataire"),
        React.createElement(
          View,
          { style: styles.row },
          React.createElement(Text, { style: styles.label }, "Organisation"),
          React.createElement(Text, { style: styles.value }, quote.collectif.nom)
        ),
        React.createElement(
          View,
          { style: styles.row },
          React.createElement(Text, { style: styles.label }, "Contact"),
          React.createElement(Text, { style: styles.value }, quote.collectif.contact)
        ),
        React.createElement(
          View,
          { style: styles.row },
          React.createElement(Text, { style: styles.label }, "Email"),
          React.createElement(Text, { style: styles.value }, quote.collectif.email)
        ),
        quote.collectif.telephone &&
          React.createElement(
            View,
            { style: styles.row },
            React.createElement(Text, { style: styles.label }, "Téléphone"),
            React.createElement(Text, { style: styles.value }, quote.collectif.telephone)
          ),
        React.createElement(
          View,
          { style: styles.row },
          React.createElement(Text, { style: styles.label }, "Type de collectif"),
          React.createElement(Text, { style: styles.value }, quote.collectif.typeCollectif)
        )
      ),

      // Plan
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Plan choisi"),
        React.createElement(
          View,
          { style: styles.planCard },
          React.createElement(Text, { style: styles.planName }, quote.planNom),
          React.createElement(
            View,
            { style: styles.row },
            React.createElement(Text, { style: styles.label }, "Utilisateurs"),
            React.createElement(
              Text,
              { style: styles.value },
              `${quote.nombreUtilisateurs} utilisateurs`
            )
          ),
          React.createElement(
            View,
            { style: styles.row },
            React.createElement(Text, { style: styles.label }, "Durée du contrat"),
            React.createElement(
              Text,
              { style: styles.value },
              `${quote.dureeContrat} mois`
            )
          )
        )
      ),

      // Features
      features.length > 0 &&
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(Text, { style: styles.sectionTitle }, "Fonctionnalités"),
          ...features.map((f) =>
            React.createElement(
              View,
              { key: f.slug, style: styles.featureRow },
              React.createElement(
                View,
                { style: f.inclus ? styles.featureCheck : styles.featureCross }
              ),
              React.createElement(
                Text,
                { style: f.inclus ? styles.featureText : styles.featureTextOff },
                f.nom
              )
            )
          )
        ),

      // Prix
      React.createElement(
        View,
        { style: styles.priceSection },
        quote.remise > 0 &&
          React.createElement(
            View,
            { style: styles.priceRow },
            React.createElement(Text, { style: styles.priceLabel }, "Remise appliquée"),
            React.createElement(Text, { style: styles.priceValue }, `−${quote.remise}%`)
          ),
        React.createElement(View, { style: styles.divider }),
        React.createElement(
          View,
          { style: styles.priceRow },
          React.createElement(Text, { style: styles.priceTotalLabel }, "Total HT"),
          React.createElement(
            Text,
            { style: styles.priceTotalValue },
            `${quote.prixHT.toLocaleString("fr-FR")} €`
          )
        ),
        React.createElement(
          View,
          { style: styles.priceRow },
          React.createElement(Text, { style: styles.priceLabel }, "TVA 20%"),
          React.createElement(
            Text,
            { style: styles.priceValue },
            `${(quote.prixTTC - quote.prixHT).toLocaleString("fr-FR")} €`
          )
        ),
        React.createElement(
          View,
          { style: styles.priceRow },
          React.createElement(Text, { style: styles.priceLabel }, "Total TTC"),
          React.createElement(
            Text,
            { style: styles.priceValue },
            `${quote.prixTTC.toLocaleString("fr-FR")} €`
          )
        )
      ),

      // Signature
      quote.signedAt &&
        React.createElement(
          View,
          { style: styles.signatureSection },
          React.createElement(Text, { style: styles.signatureTitle }, "Signature électronique"),
          quote.signatureData &&
            React.createElement(Image, {
              src: quote.signatureData,
              style: { width: 200, height: 60, objectFit: "contain" },
            }),
          quote.signedByName &&
            React.createElement(Text, { style: styles.signatureName }, quote.signedByName),
          quote.signedByRole &&
            React.createElement(Text, { style: styles.signatureRole }, quote.signedByRole),
          React.createElement(
            Text,
            { style: styles.signatureDate },
            `Signé le ${new Date(quote.signedAt).toLocaleDateString("fr-FR")} à ${new Date(quote.signedAt).toLocaleTimeString("fr-FR")}`
          )
        ),

      // Mentions
      React.createElement(
        View,
        { style: styles.mentions },
        React.createElement(
          Text,
          { style: styles.mentionsText },
          "Ce devis est valable 30 jours à compter de sa date d'émission. Tout devis signé électroniquement constitue un accord contractuel. TVA 20% applicable. Uvibes SAS — contact@uvibes.fr — uvibes.fr"
        )
      ),

      // Footer
      React.createElement(
        View,
        { style: styles.footer },
        React.createElement(Text, { style: styles.footerText }, "Uvibes — uvibes.fr"),
        React.createElement(Text, { style: styles.footerText }, quote.numero)
      )
    )
  );

  const buffer = await renderToBuffer(doc);
  return Buffer.from(buffer);
}
