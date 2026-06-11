"use client";

import { Upload } from "lucide-react";
import { useRef, useState } from "react";

// Champ image admin : on peut coller une URL OU téléverser un fichier depuis l'ordinateur.
// Les deux options sont proposées (l'upload remplit l'URL automatiquement).
export default function ImageUpload({
  value,
  onChange,
  placeholder = "URL de l'image, ou téléversez un fichier →",
}: {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) onChange(data.url);
      else setErr(data.error || "Erreur lors du téléversement");
    } catch {
      setErr("Erreur réseau");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          className="crm-field-input"
          style={{ flex: 1 }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        <button type="button" className="crm-btn --outline --sm" onClick={() => inputRef.current?.click()} disabled={busy}>
          <Upload size={13} /> {busy ? "…" : "Téléverser"}
        </button>
        <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFile} />
      </div>
      {value && (
        // Aperçu d'une URL arbitraire (locale ou distante) → balise img simple
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="Aperçu" style={{ maxHeight: 46, maxWidth: 130, objectFit: "contain", borderRadius: 6, alignSelf: "flex-start", background: "#fff", border: "1px solid rgba(0,0,0,.08)" }} />
      )}
      {err && <span style={{ fontSize: 12, color: "#dc2626" }}>{err}</span>}
    </div>
  );
}
