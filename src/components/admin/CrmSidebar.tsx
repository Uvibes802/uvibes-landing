"use client";

import {
  BarChart2, FileText, Home, LogOut,
  Settings, Users, Layers, PenLine, Star, CalendarDays, Mail, Ticket, ScrollText, Newspaper, KeyRound,
  KanbanSquare, ListTodo, FileSignature,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  {
    section: "CRM",
    items: [
      { href: "/admin/dashboard", icon: Home, label: "Dashboard" },
      { href: "/admin/pipeline", icon: KanbanSquare, label: "Pipeline" },
      { href: "/admin/collectifs", icon: Users, label: "Collectifs" },
      { href: "/admin/taches", icon: ListTodo, label: "Tâches & relances" },
      { href: "/admin/devis", icon: FileText, label: "Devis" },
      { href: "/admin/documents", icon: FileSignature, label: "Contrats & factures" },
      { href: "/admin/promos", icon: Ticket, label: "Codes promo" },
      { href: "/admin/rdv", icon: CalendarDays, label: "Rendez-vous" },
      { href: "/admin/newsletter", icon: Mail, label: "Newsletter" },
    ],
  },
  {
    section: "CMS",
    items: [
      { href: "/admin/cms/contenu", icon: PenLine, label: "Contenus éditoriaux" },
      { href: "/admin/cms/blog", icon: Newspaper, label: "Blog" },
      { href: "/admin/cms/documents", icon: ScrollText, label: "Documents légaux" },
      { href: "/admin/cms/partenaires", icon: Layers, label: "Partenaires" },
      { href: "/admin/cms/temoignages", icon: Star, label: "Témoignages" },
      { href: "/admin/cms/equipe", icon: Users, label: "Équipe" },
      { href: "/admin/cms/tarification", icon: BarChart2, label: "Tarification" },
    ],
  },
  {
    section: "Système",
    items: [
      { href: "/admin/compte", icon: KeyRound, label: "Mon compte" },
      { href: "/admin/maintenance", icon: Settings, label: "Maintenance" },
    ],
  },
];

export default function CrmSidebar({ nom }: { nom?: string }) {
  const pathname = usePathname();

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
        {/* Navigation complète volontaire (pas de <Link> client/fetch) → fonctionne même si une extension casse fetch */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" className="crm-backsite-btn">
          <Home size={14} /> Retour au site
        </a>
        {/* Déconnexion par formulaire natif → immunisé contre les extensions qui cassent fetch */}
        <form action="/api/admin/auth/logout" method="post">
          <button type="submit" className="crm-logout-btn">
            <LogOut size={14} /> Déconnexion
          </button>
        </form>
      </div>
    </aside>
  );
}
