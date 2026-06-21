"use client";

export default function ManageCookiesLink({ locale = "fr" }: { locale?: "fr" | "en" }) {
  return (
    <button
      type="button"
      className="ft-nav-link ft-manage-cookies"
      onClick={() => window.dispatchEvent(new Event("uvibes:manage-cookies"))}
    >
      {locale === "en" ? "Manage cookies" : "Gérer les cookies"}
    </button>
  );
}
