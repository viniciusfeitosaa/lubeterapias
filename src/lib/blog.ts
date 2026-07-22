import { z } from "zod";
import {
  createSupabaseAdmin,
  createSupabaseAnon,
  isSupabaseConfigured,
  type PostRow,
} from "@/lib/supabase/server";

export type { PostRow };

export const postInputSchema = z.object({
  title: z.string().min(1, "Título obrigatório").max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido (use minúsculas e hífens)"),
  excerpt: z.string().max(500).optional().default(""),
  body: z.string().optional().default(""),
  cover_url: z
    .union([z.string().url(), z.literal(""), z.null()])
    .optional()
    .transform((v) => (v === "" || v === undefined ? null : v)),
  published: z.boolean().optional().default(false),
});

export type PostInput = z.infer<typeof postInputSchema>;

export function slugify(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);
}

export async function listPublishedPosts(): Promise<PostRow[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createSupabaseAnon();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false });
    if (error) {
      console.error("listPublishedPosts", error.message);
      return [];
    }
    return (data ?? []) as PostRow[];
  } catch (err) {
    console.error("listPublishedPosts", err);
    return [];
  }
}

export async function getPublishedPostBySlug(
  slug: string,
): Promise<PostRow | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = createSupabaseAnon();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error) {
      console.error("getPublishedPostBySlug", error.message);
      return null;
    }
    return data as PostRow | null;
  } catch (err) {
    console.error("getPublishedPostBySlug", err);
    return null;
  }
}

export async function listAllPosts(): Promise<PostRow[]> {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as PostRow[];
}

export async function getPostById(id: string): Promise<PostRow | null> {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as PostRow | null;
}

export async function createPost(input: PostInput): Promise<PostRow> {
  const supabase = createSupabaseAdmin();
  const cover =
    input.cover_url && input.cover_url.length > 0 ? input.cover_url : null;
  const { data, error } = await supabase
    .from("posts")
    .insert({
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt ?? "",
      body: input.body ?? "",
      cover_url: cover,
      published: input.published,
      published_at: input.published ? new Date().toISOString() : null,
    })
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data as PostRow;
}

export async function updatePost(
  id: string,
  input: PostInput,
): Promise<PostRow> {
  const supabase = createSupabaseAdmin();
  const existing = await getPostById(id);
  if (!existing) throw new Error("Post não encontrado");

  const cover =
    input.cover_url && input.cover_url.length > 0 ? input.cover_url : null;

  let published_at = existing.published_at;
  if (input.published && !existing.published) {
    published_at = new Date().toISOString();
  }
  if (!input.published) {
    published_at = null;
  }

  const { data, error } = await supabase
    .from("posts")
    .update({
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt ?? "",
      body: input.body ?? "",
      cover_url: cover,
      published: input.published,
      published_at,
    })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data as PostRow;
}

export async function deletePost(id: string): Promise<void> {
  const supabase = createSupabaseAdmin();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function uploadBlogImage(
  file: File,
): Promise<{ url: string; path: string }> {
  const supabase = createSupabaseAdmin();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage.from("blog").upload(path, buffer, {
    contentType: file.type || "image/jpeg",
    upsert: false,
  });
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("blog").getPublicUrl(path);
  return { url: data.publicUrl, path };
}
