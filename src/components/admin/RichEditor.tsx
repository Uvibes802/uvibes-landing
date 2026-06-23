"use client";

import dynamic from "next/dynamic";
import type ReactQuillType from "react-quill-new";
import { useMemo, useRef } from "react";
import "react-quill-new/dist/quill.snow.css";

// Éditeur riche WYSIWYG (Quill) — chargé côté client uniquement (pas de SSR).
// Cast nécessaire : dynamic() ne reporte pas le typage du ref-forwarding de la classe ReactQuill.
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div style={{ padding: 16, color: "var(--crm-muted)" }}>Chargement de l&apos;éditeur…</div>,
}) as unknown as typeof ReactQuillType;

export default function RichEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quillRef = useRef<any>(null);

  // Image insérée directement dans le texte — même endpoint d'upload que partout ailleurs en admin
  function imageHandler() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        const editor = quillRef.current?.getEditor?.();
        const range = editor?.getSelection(true);
        const index = range?.index ?? editor?.getLength() ?? 0;
        editor?.insertEmbed(index, "image", data.url, "user");
        editor?.setSelection(index + 1, 0);
      }
    };
    input.click();
  }

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["blockquote", "code-block", "link", "image"],
        ["clean"],
      ],
      handlers: { image: imageHandler },
    },
  }), []);

  return (
    <div className="rich-editor">
      <ReactQuill ref={quillRef} theme="snow" value={value} onChange={onChange} modules={modules} />
    </div>
  );
}
