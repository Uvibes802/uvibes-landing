"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "@/styles/shared/select.css";

export interface SelectOption {
  value: string;
  label: string;
}

// Menu déroulant custom — rendu identique sur macOS, Windows et Linux (le <select>
// natif est stylé différemment par chaque OS). Accessible : clavier + ARIA listbox.
export default function Select({
  value,
  onChange,
  options,
  id,
  ariaLabel,
  placeholder = "Choisir…",
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  id?: string;
  ariaLabel?: string;
  placeholder?: string;
  error?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  // Ferme au clic en dehors
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  function choose(v: string) {
    onChange(v);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      setActive((a) => Math.min(a + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open && active >= 0) choose(options[active].value);
      else setOpen((o) => !o);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className={`uv-select${open ? " --open" : ""}`} ref={ref}>
      <button
        type="button"
        id={id}
        className={`uv-select-trigger${error ? " --error" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
      >
        <span className={selected ? "" : "uv-select-placeholder"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={18} className="uv-select-arrow" aria-hidden="true" />
      </button>
      {open && (
        <ul className="uv-select-list" role="listbox" tabIndex={-1}>
          {options.map((o, i) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={`uv-select-option${o.value === value ? " --selected" : ""}${i === active ? " --active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(o.value)}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
