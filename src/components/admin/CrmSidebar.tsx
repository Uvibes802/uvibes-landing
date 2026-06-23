"use client";

import {
  BarChart2, FileText, Home, LogOut,
  Settings, Users, Layers, PenLine, Star, CalendarDays, Mail, Ticket, ScrollText, Newspaper, KeyRound,
  KanbanSquare, ListTodo, FileSignature, ChevronsLeft, ChevronsRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const COLLAPSE_KEY = "crm-sidebar-collapsed";

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
  const [collapsed, setCollapsed] = useState(false);

  // Préférence mémorisée — appliquée aussi à .crm-main via une classe sur <body>
  // (la sidebar et le contenu sont des frères dans le layout, pas de prop à faire descendre)
  useEffect(() => {
    const saved = localStorage.getItem(COLLAPSE_KEY) === "1";
    setCollapsed(saved);
    document.body.classList.toggle("crm-sidebar-collapsed", saved);
  }, []);

  function toggle() {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
    document.body.classList.toggle("crm-sidebar-collapsed", next);
  }

  return (
    <aside className={`crm-sidebar${collapsed ? " --collapsed" : ""}`}>
      <div className="crm-sidebar-brand">
        <Image src="/images/favicon.png" alt="Uvibes" width={28} height={24} className="crm-sidebar-logo" />
        {!collapsed && <span className="crm-sidebar-sub">CRM & Gestion</span>}
      </div>

      <nav className="crm-nav">
        {NAV.map((group) => (
          <div key={group.section}>
            {!collapsed && <div className="crm-nav-section">{group.section}</div>}
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`crm-nav-item${active ? " --active" : ""}`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={16} className="crm-nav-icon" />
                  {!collapsed && item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="crm-sidebar-footer">
        {nom && !collapsed && (
          <p style={{ fontSize: 12, color: "var(--crm-muted)", marginBottom: 8, paddingLeft: 4 }}>
            Connecté·e : {nom}
          </p>
        )}
        {/* Navigation complète volontaire (pas de <Link> client/fetch) → fonctionne même si une extension casse fetch */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" className="crm-backsite-btn" title={collapsed ? "Retour au site" : undefined}>
          <Home size={14} /> {!collapsed && "Retour au site"}
        </a>
        {/* Déconnexion par formulaire natif → immunisé contre les extensions qui cassent fetch */}
        <form action="/api/admin/auth/logout" method="post">
          <button type="submit" className="crm-logout-btn" title={collapsed ? "Déconnexion" : undefined}>
            <LogOut size={14} /> {!collapsed && "Déconnexion"}
          </button>
        </form>
        <button type="button" className="crm-collapse-btn" onClick={toggle} title={collapsed ? "Déplier le menu" : "Replier le menu"}>
          {collapsed ? <ChevronsRight size={14} /> : <><ChevronsLeft size={14} /> Replier</>}
        </button>
      </div>
    </aside>
  );
}
