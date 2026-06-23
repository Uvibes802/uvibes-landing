"use client";

const MCL_TXT: Record<string, string> = {
  en: "Manage cookies",
  es: "Gestionar cookies",
  de: "Cookies verwalten",
  it: "Gestisci i cookie",
  pt: "Gerir cookies",
  ru: "Управление cookie",
  zh: "管理 Cookie",
  ja: "Cookieの管理",
  hi: "कुकीज़ प्रबंधित करें",
  ar: "إدارة ملفات تعريف الارتباط",
};

export default function ManageCookiesLink({ locale = "fr" }: { locale?: string }) {
  return (
    <button
      type="button"
      className="ft-nav-link ft-manage-cookies"
      onClick={() => window.dispatchEvent(new Event("uvibes:manage-cookies"))}
    >
      {MCL_TXT[locale] ?? "Gérer les cookies"}
    </button>
  );
}
