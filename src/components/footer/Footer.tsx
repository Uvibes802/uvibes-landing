import Link from "next/link";
import Image from "next/image";
import ManageCookiesLink from "./ManageCookiesLink";
import VibrationLine from "@/components/shared/VibrationLine";
import "../../styles/footer/footer.css";

const NAV_COLS_FR = [
  {
    label: "Notre solution",
    links: [
      { href: "/solution", label: "Méthode" },
      { href: "/tarifs", label: "Tarifs" },
    ],
  },
  {
    label: "Notre univers",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/a-propos", label: "À propos" },
    ],
  },
  {
    label: "Nous contacter",
    links: [
      { href: "/#contact", label: "Nous écrire" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },
  {
    label: "Nos informations légales",
    links: [
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/conditions-d-utilisation", label: "CGU" },
      { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
      { href: "/politique-cookies", label: "Cookies" },
    ],
  },
];

// Mêmes cibles que la version FR (les pages légales restent en français) — labels traduits.
const NAV_COLS_EN = [
  {
    label: "Our solution",
    links: [
      { href: "/en/method", label: "Method" },
      { href: "/en/pricing", label: "Pricing" },
    ],
  },
  {
    label: "Our world",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/en/about", label: "About" },
    ],
  },
  {
    label: "Get in touch",
    links: [
      { href: "/en#contact", label: "Write to us" },
      { href: "/rendez-vous", label: "Book a call" },
    ],
  },
  {
    label: "Legal (FR)",
    links: [
      { href: "/mentions-legales", label: "Legal notice" },
      { href: "/conditions-d-utilisation", label: "Terms of use" },
      { href: "/politique-de-confidentialite", label: "Privacy policy" },
      { href: "/politique-cookies", label: "Cookies" },
    ],
  },
];

// Mêmes cibles que la version FR (les pages légales restent en français) — labels traduits.
const NAV_COLS_ES = [
  {
    label: "Nuestra solución",
    links: [
      { href: "/es/method", label: "Método" },
      { href: "/es/pricing", label: "Precios" },
    ],
  },
  {
    label: "Nuestro universo",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/es/about", label: "Sobre nosotros" },
    ],
  },
  {
    label: "Contáctanos",
    links: [
      { href: "/es#contact", label: "Escríbenos" },
      { href: "/rendez-vous", label: "Reservar una llamada" },
    ],
  },
  {
    label: "Legal (FR)",
    links: [
      { href: "/mentions-legales", label: "Aviso legal" },
      { href: "/conditions-d-utilisation", label: "Términos de uso" },
      { href: "/politique-de-confidentialite", label: "Política de privacidad" },
      { href: "/politique-cookies", label: "Cookies" },
    ],
  },
];

const NAV_COLS_DE = [
  { label: "Unsere Lösung", links: [{ href: "/de/method", label: "Methode" }, { href: "/de/pricing", label: "Preise" }] },
  { label: "Unsere Welt", links: [{ href: "/blog", label: "Blog" }, { href: "/de/about", label: "Über uns" }] },
  { label: "Kontakt", links: [{ href: "/de#contact", label: "Schreib uns" }, { href: "/rendez-vous", label: "Termin vereinbaren" }] },
  { label: "Rechtliches (FR)", links: [
    { href: "/mentions-legales", label: "Impressum" },
    { href: "/conditions-d-utilisation", label: "Nutzungsbedingungen" },
    { href: "/politique-de-confidentialite", label: "Datenschutzerklärung" },
    { href: "/politique-cookies", label: "Cookies" },
  ] },
];
const NAV_COLS_IT = [
  { label: "La nostra soluzione", links: [{ href: "/it/method", label: "Metodo" }, { href: "/it/pricing", label: "Prezzi" }] },
  { label: "Il nostro mondo", links: [{ href: "/blog", label: "Blog" }, { href: "/it/about", label: "Chi siamo" }] },
  { label: "Contattaci", links: [{ href: "/it#contact", label: "Scrivici" }, { href: "/rendez-vous", label: "Prenota una chiamata" }] },
  { label: "Legale (FR)", links: [
    { href: "/mentions-legales", label: "Note legali" },
    { href: "/conditions-d-utilisation", label: "Termini di utilizzo" },
    { href: "/politique-de-confidentialite", label: "Informativa sulla privacy" },
    { href: "/politique-cookies", label: "Cookie" },
  ] },
];
const NAV_COLS_PT = [
  { label: "A nossa solução", links: [{ href: "/pt/method", label: "Método" }, { href: "/pt/pricing", label: "Preços" }] },
  { label: "O nosso universo", links: [{ href: "/blog", label: "Blog" }, { href: "/pt/about", label: "Sobre nós" }] },
  { label: "Contacta-nos", links: [{ href: "/pt#contact", label: "Escreve-nos" }, { href: "/rendez-vous", label: "Marcar uma chamada" }] },
  { label: "Legal (FR)", links: [
    { href: "/mentions-legales", label: "Aviso legal" },
    { href: "/conditions-d-utilisation", label: "Termos de utilização" },
    { href: "/politique-de-confidentialite", label: "Política de privacidade" },
    { href: "/politique-cookies", label: "Cookies" },
  ] },
];
const NAV_COLS_RU = [
  { label: "Наше решение", links: [{ href: "/ru/method", label: "Метод" }, { href: "/ru/pricing", label: "Цены" }] },
  { label: "Наш мир", links: [{ href: "/blog", label: "Блог" }, { href: "/ru/about", label: "О нас" }] },
  { label: "Связаться с нами", links: [{ href: "/ru#contact", label: "Написать нам" }, { href: "/rendez-vous", label: "Записаться на звонок" }] },
  { label: "Юридическая информация (FR)", links: [
    { href: "/mentions-legales", label: "Правовая информация" },
    { href: "/conditions-d-utilisation", label: "Условия использования" },
    { href: "/politique-de-confidentialite", label: "Политика конфиденциальности" },
    { href: "/politique-cookies", label: "Cookies" },
  ] },
];
const NAV_COLS_ZH = [
  { label: "我们的解决方案", links: [{ href: "/zh/method", label: "方法" }, { href: "/zh/pricing", label: "价格" }] },
  { label: "我们的世界", links: [{ href: "/blog", label: "博客" }, { href: "/zh/about", label: "关于我们" }] },
  { label: "联系我们", links: [{ href: "/zh#contact", label: "给我们写信" }, { href: "/rendez-vous", label: "预约通话" }] },
  { label: "法律信息（法语）", links: [
    { href: "/mentions-legales", label: "法律声明" },
    { href: "/conditions-d-utilisation", label: "使用条款" },
    { href: "/politique-de-confidentialite", label: "隐私政策" },
    { href: "/politique-cookies", label: "Cookie 政策" },
  ] },
];
const NAV_COLS_JA = [
  { label: "私たちのソリューション", links: [{ href: "/ja/method", label: "メソッド" }, { href: "/ja/pricing", label: "料金" }] },
  { label: "私たちの世界", links: [{ href: "/blog", label: "ブログ" }, { href: "/ja/about", label: "私たちについて" }] },
  { label: "お問い合わせ", links: [{ href: "/ja#contact", label: "お問い合わせはこちら" }, { href: "/rendez-vous", label: "通話を予約" }] },
  { label: "法的情報（フランス語）", links: [
    { href: "/mentions-legales", label: "法的通知" },
    { href: "/conditions-d-utilisation", label: "利用規約" },
    { href: "/politique-de-confidentialite", label: "プライバシーポリシー" },
    { href: "/politique-cookies", label: "Cookie" },
  ] },
];
const NAV_COLS_HI = [
  { label: "हमारा समाधान", links: [{ href: "/hi/method", label: "तरीका" }, { href: "/hi/pricing", label: "मूल्य" }] },
  { label: "हमारी दुनिया", links: [{ href: "/blog", label: "ब्लॉग" }, { href: "/hi/about", label: "हमारे बारे में" }] },
  { label: "संपर्क करें", links: [{ href: "/hi#contact", label: "हमें लिखें" }, { href: "/rendez-vous", label: "कॉल बुक करें" }] },
  { label: "कानूनी जानकारी (FR)", links: [
    { href: "/mentions-legales", label: "कानूनी सूचना" },
    { href: "/conditions-d-utilisation", label: "उपयोग की शर्तें" },
    { href: "/politique-de-confidentialite", label: "गोपनीयता नीति" },
    { href: "/politique-cookies", label: "कुकीज़" },
  ] },
];
const NAV_COLS_AR = [
  { label: "حلّنا", links: [{ href: "/ar/method", label: "الطريقة" }, { href: "/ar/pricing", label: "الأسعار" }] },
  { label: "عالمنا", links: [{ href: "/blog", label: "المدونة" }, { href: "/ar/about", label: "من نحن" }] },
  { label: "تواصل معنا", links: [{ href: "/ar#contact", label: "اكتب لنا" }, { href: "/rendez-vous", label: "حجز مكالمة" }] },
  { label: "معلومات قانونية (فرنسا)", links: [
    { href: "/mentions-legales", label: "إشعار قانوني" },
    { href: "/conditions-d-utilisation", label: "شروط الاستخدام" },
    { href: "/politique-de-confidentialite", label: "سياسة الخصوصية" },
    { href: "/politique-cookies", label: "ملفات تعريف الارتباط" },
  ] },
];

const FT_TXT: Record<string, { homeAria: string; tagline: string; slogan: string }> = {
  en: { homeAria: "Back to Uvibes home", tagline: "Switch on the right vibes.", slogan: "The unexpected starts here." },
  es: { homeAria: "Volver al inicio de Uvibes", tagline: "Activa las ondas adecuadas.", slogan: "Lo inesperado empieza aquí." },
  de: { homeAria: "Zurück zur Uvibes-Startseite", tagline: "Aktiviere die richtigen Schwingungen.", slogan: "Das Unerwartete beginnt hier." },
  it: { homeAria: "Torna alla home di Uvibes", tagline: "Attiva le vibrazioni giuste.", slogan: "L'inatteso inizia qui." },
  pt: { homeAria: "Voltar ao início da Uvibes", tagline: "Ativa as vibrações certas.", slogan: "O inesperado começa aqui." },
  ru: { homeAria: "Вернуться на главную Uvibes", tagline: "Включи нужные волны.", slogan: "Неожиданное начинается здесь." },
  zh: { homeAria: "返回 Uvibes 首页", tagline: "开启正确的频率。", slogan: "意想不到，从这里开始。" },
  ja: { homeAria: "Uvibesホームに戻る", tagline: "正しいバイブスをオンに。", slogan: "予想外の出会いはここから。" },
  hi: { homeAria: "Uvibes होम पर वापस जाएं", tagline: "सही वाइब्स ऑन करें।", slogan: "अनपेक्षित यहीं से शुरू होता है।" },
  ar: { homeAria: "العودة إلى الصفحة الرئيسية لـ Uvibes", tagline: "فعّل الطاقة الإيجابية المناسبة.", slogan: "غير المتوقع يبدأ من هنا." },
};

const NAV_COLS_BY_LOCALE: Record<string, typeof NAV_COLS_FR> = {
  en: NAV_COLS_EN, es: NAV_COLS_ES, de: NAV_COLS_DE, it: NAV_COLS_IT, pt: NAV_COLS_PT,
  ru: NAV_COLS_RU, zh: NAV_COLS_ZH, ja: NAV_COLS_JA, hi: NAV_COLS_HI, ar: NAV_COLS_AR,
};

export default function Footer({ locale = "fr" }: { locale?: string }) {
  const NAV_COLS = NAV_COLS_BY_LOCALE[locale] ?? NAV_COLS_FR;
  const homeHref = locale !== "fr" ? `/${locale}` : "/";
  const ft = locale !== "fr" ? FT_TXT[locale] : undefined;

  return (
    <footer className="ft-footer">
      {/* Blobs colorés — saturent la section */}
      <div className="ft-blobs" aria-hidden="true">
        <span className="ft-blob ft-blob--b" />
        <span className="ft-blob ft-blob--c" />
      </div>

      <div className="ft-inner">
        {/* Top — brand + nav côte à côte */}
        <div className="ft-top">
          <div className="ft-brand">
            <Link href={homeHref} aria-label={ft ? ft.homeAria : "Retour à l'accueil Uvibes"}>
              <Image
                src="/images/Logo%20VI%20blanc.png"
                alt="Uvibes"
                width={160}
                height={80}
                className="ft-logo"
              />
            </Link>
            <p className="ft-tagline v-serif">
              {ft ? ft.tagline : "Activez les bonnes ondes."}
            </p>
          </div>

          <div className="ft-nav">
            {NAV_COLS.map((col) => (
              <div key={col.label} className="ft-nav-col">
                <div className="ft-nav-label-wrap">
                  <p className="v-mono ft-nav-label">
                    <span className="ft-nav-label-dot" aria-hidden="true" />
                    {col.label}
                  </p>
                  <VibrationLine
                    className="ft-nav-underline"
                    width={48} height={8}
                    amplitude={2.2} freq={2}
                    stroke="rgba(255,255,255,.5)" strokeWidth={1.5}
                    speed={5}
                  />
                </div>
                <ul className="ft-nav-list">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className="ft-nav-link">{l.label}</Link>
                    </li>
                  ))}
                  {col.label === NAV_COLS[3].label && (
                    <li><ManageCookiesLink locale={locale} /></li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="ft-divider" aria-hidden="true" />

        <div className="ft-bottom">
          <p className="v-mono ft-copy">© 2026 Uvibes</p>
          <p className="ft-slogan v-serif">
            {ft ? ft.slogan : "L'inattendu commence ici."}
          </p>
          <Link href="/admin/login" className="ft-admin-link" aria-label="Espace administration">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
