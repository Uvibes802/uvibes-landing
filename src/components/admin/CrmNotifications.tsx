"use client";

import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Msg {
  id: string;
  nom: string;
  prenom?: string | null;
  email: string;
  organisation?: string | null;
  categories?: string | null;
  message: string;
  lu: boolean;
  createdAt: string;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `il y a ${h} h`;
  const j = Math.floor(h / 24);
  return `il y a ${j} j`;
}

// Cloche de notifications du dashboard — messages du formulaire de contact.
export default function CrmNotifications() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [unread, setUnread] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  async function load() {
    try {
      const r = await fetch("/api/admin/notifications");
      if (!r.ok) return;
      const d = await r.json();
      setMessages(d.messages ?? []);
      setUnread(d.unread ?? 0);
    } catch {
      /* silencieux */
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 30000); // rafraîchit toutes les 30 s
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  async function markAll() {
    await fetch("/api/admin/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ all: true }),
    });
    setMessages((m) => m.map((x) => ({ ...x, lu: true })));
    setUnread(0);
  }

  async function markOne(id: string) {
    setMessages((m) => m.map((x) => (x.id === id ? { ...x, lu: true } : x)));
    setUnread((u) => Math.max(0, u - 1));
    await fetch("/api/admin/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).catch(() => {});
  }

  return (
    <div className="crm-notif" ref={ref}>
      <button
        type="button"
        className="crm-notif-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        aria-expanded={open}
      >
        <Bell size={18} />
        {unread > 0 && <span className="crm-notif-badge">{unread > 9 ? "9+" : unread}</span>}
      </button>

      {open && (
        <div className="crm-notif-panel">
          <div className="crm-notif-head">
            <span>Messages de contact</span>
            {unread > 0 && (
              <button type="button" className="crm-notif-readall" onClick={markAll}>
                Tout marquer lu
              </button>
            )}
          </div>
          <div className="crm-notif-list">
            {messages.length === 0 ? (
              <p className="crm-notif-empty">Aucun message pour l&apos;instant.</p>
            ) : (
              messages.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`crm-notif-item${m.lu ? "" : " --unread"}`}
                  onClick={() => markOne(m.id)}
                >
                  <span className="crm-notif-item-top">
                    <strong>{m.prenom ? `${m.prenom} ${m.nom}` : m.nom}</strong>
                    <span className="crm-notif-time">{timeAgo(m.createdAt)}</span>
                  </span>
                  <span className="crm-notif-item-email">
                    {m.email}{m.organisation ? ` · ${m.organisation}` : ""}
                  </span>
                  <span className="crm-notif-item-msg">{m.message}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
