"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { slugify } from "@/lib/blog";

type PostFormProps = {
  mode: "create" | "edit";
  postId?: string;
  initial?: {
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    cover_url: string | null;
    published: boolean;
  };
};

export function PostForm({ mode, postId, initial }: PostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [coverUrl, setCoverUrl] = useState(initial?.cover_url ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const preview = useMemo(() => body.slice(0, 400), [body]);

  function onTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  async function onUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.set("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha no upload");
      setCoverUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no upload");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      id: postId,
      title,
      slug,
      excerpt,
      body,
      cover_url: coverUrl || null,
      published,
    };

    try {
      const res = await fetch("/api/admin/posts", {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg =
          typeof data.error === "string"
            ? data.error
            : "Não foi possível salvar. Verifique os campos.";
        throw new Error(msg);
      }
      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="lube-card space-y-4 p-6">
        <label className="block text-sm font-bold">
          Título
          <input
            required
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="lube-input"
          />
        </label>

        <label className="block text-sm font-bold">
          Slug (URL)
          <input
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            className="lube-input font-mono text-sm"
          />
        </label>

        <label className="block text-sm font-bold">
          Resumo
          <textarea
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="lube-input resize-y"
          />
        </label>

        <label className="block text-sm font-bold">
          Conteúdo (Markdown)
          <textarea
            rows={16}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="lube-input resize-y font-mono text-sm"
            placeholder={"## Título\n\nEscreva o post em Markdown…"}
          />
        </label>
      </div>

      <div className="space-y-4">
        <div className="lube-card space-y-4 p-6">
          <p className="font-bold text-lube-ink">Capa</p>
          {coverUrl ? (
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-lube-ink/8">
              <Image
                src={coverUrl}
                alt=""
                fill
                className="object-cover"
                sizes="400px"
              />
            </div>
          ) : (
            <p className="text-sm text-lube-ink-soft">Nenhuma capa ainda.</p>
          )}
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void onUpload(file);
            }}
            className="block w-full text-sm"
          />
          <label className="block text-sm font-bold">
            URL da capa
            <input
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="lube-input"
              placeholder="https://…"
            />
          </label>
        </div>

        <div className="lube-card space-y-4 p-6">
          <label className="flex items-center gap-3 text-sm font-bold">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 accent-[var(--lube-teal)]"
            />
            Publicar no site
          </label>

          <div>
            <p className="text-xs font-bold tracking-wide text-lube-teal uppercase">
              Prévia do Markdown
            </p>
            <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap rounded-xl bg-lube-mist p-3 text-xs text-lube-ink-soft">
              {preview || "—"}
            </pre>
          </div>

          {error ? (
            <p className="text-sm font-semibold text-lube-coral" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={saving || uploading}
            className="lube-btn-primary inline-flex min-h-11 w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold tracking-wide disabled:opacity-60"
          >
            {saving ? "Salvando…" : mode === "create" ? "Criar post" : "Salvar"}
          </button>
        </div>
      </div>
    </form>
  );
}
