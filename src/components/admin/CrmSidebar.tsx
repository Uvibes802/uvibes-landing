"use client";

import {
  BarChart2, FileText, Home, LogOut,
  Settings, Users, Layers, PenLine, Star, CalendarDays, Mail, Ticket,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  {
    section: "CRM",
    items: [
      { href: "/admin/dashboard", icon: Home, label: "Dashboard" },
      { href: "/admin/devis", icon: FileText, label: "Devis" },
      { href: "/admin/promos", icon: Ticket, label: "Codes promo" },
      { href: "/admin/collectifs", icon: Users, label: "Collectifs" },
      { href: "/admin/rdv", icon: CalendarDays, label: "Rendez-vous" },
      { href: "/admin/newsletter", icon: Mail, label: "Newsletter" },
    ],
  },
  {
    section: "CMS",
    items: [
      { href: "/admin/cms/contenu", icon: PenLine, label: "Contenus éditoriaux" },
      { href: "/admin/cms/partenaires", icon: Layers, label: "Partenaires" },
      { href: "/admin/cms/temoignages", icon: Star, label: "Témoignages" },
      { href: "/admin/cms/equipe", icon: Users, label: "Équipe" },
      { href: "/admin/cms/tarification", icon: BarChart2, label: "Tarification" },
    ],
  },
  {
    section: "Système",
    items: [
      { href: "/admin/maintenance", icon: Settings, label: "Maintenance" },
    ],
  },
];

export default function CrmSidebar({ nom }: { nom?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="crm-sidebar">
      <div className="crm-sidebar-brand">
        Uvibes
        <span className="crm-sidebar-sub">CRM & Gestion</span>
      </div>

      <nav className="crm-nav">
        {NAV.map((group) => (
          <div key={group.section}>
            <div className="crm-nav-section">{group.section}</div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`crm-nav-item${active ? " --active" : ""}`}
                >
                  <Icon size={16} className="crm-nav-icon" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="crm-sidebar-footer">
        {nom && (
          <p style={{ fontSize: 12, color: "var(--crm-muted)", marginBottom: 8, paddingLeft: 4 }}>
            Connecté·e : {nom}
          </p>
        )}
        <button className="crm-logout-btn" onClick={handleLogout}>
          <LogOut size={14} /> Déconnexion
        </button>
      </div>
    </aside>
  );
}
