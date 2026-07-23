import "server-only";

import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { PostInput, PostRow } from "@/lib/blog-shared";
import {
  deleteRepoFile,
  getRepoTextFile,
  isGitHubConfigured,
  putRepoBinaryFile,
  putRepoTextFile,
} from "@/lib/github-content";

export type { PostRow, PostInput } from "@/lib/blog-shared";
export { postInputSchema, slugify } from "@/lib/blog-shared";

const POSTS_RELATIVE = "content/blog/posts.json";
const POSTS_ABSOLUTE = path.join(process.cwd(), POSTS_RELATIVE);
const BLOG_IMAGES_DIR = path.join(process.cwd(), "public", "images", "blog");

function sortByUpdatedDesc(posts: PostRow[]): PostRow[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
}

function sortPublished(posts: PostRow[]): PostRow[] {
  return [...posts].sort((a, b) => {
    const da = a.published_at ? new Date(a.published_at).getTime() : 0;
    const db = b.published_at ? new Date(b.published_at).getTime() : 0;
    return db - da;
  });
}

async function readPostsFromDisk(): Promise<PostRow[]> {
  try {
    const raw = await fs.readFile(POSTS_ABSOLUTE, "utf8");
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data as PostRow[];
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return [];
    throw err;
  }
}

async function readPostsFromGitHub(): Promise<PostRow[]> {
  const file = await getRepoTextFile(POSTS_RELATIVE);
  if (!file) return [];
  const data = JSON.parse(file.content) as unknown;
  if (!Array.isArray(data)) return [];
  return data as PostRow[];
}

async function readAllPostsForAdmin(): Promise<PostRow[]> {
  if (isGitHubConfigured()) {
    try {
      return await readPostsFromGitHub();
    } catch (err) {
      console.error("readPostsFromGitHub", err);
      return readPostsFromDisk();
    }
  }
  return readPostsFromDisk();
}

async function writePosts(posts: PostRow[], message: string): Promise<void> {
  const payload = `${JSON.stringify(posts, null, 2)}\n`;

  if (isGitHubConfigured()) {
    await putRepoTextFile(POSTS_RELATIVE, payload, message);
    // Espelha no disco local quando possível (dev / build local).
    try {
      await fs.mkdir(path.dirname(POSTS_ABSOLUTE), { recursive: true });
      await fs.writeFile(POSTS_ABSOLUTE, payload, "utf8");
    } catch {
      /* Netlify/funções serverless podem ser read-only */
    }
    return;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "GITHUB_TOKEN/GITHUB_REPO não configurados. Sem isso o painel não grava em produção.",
    );
  }

  await fs.mkdir(path.dirname(POSTS_ABSOLUTE), { recursive: true });
  await fs.writeFile(POSTS_ABSOLUTE, payload, "utf8");
}

function assertUniqueSlug(posts: PostRow[], slug: string, exceptId?: string) {
  const clash = posts.find((p) => p.slug === slug && p.id !== exceptId);
  if (clash) {
    throw new Error(`Já existe um post com o slug "${slug}"`);
  }
}

export async function listPublishedPosts(): Promise<PostRow[]> {
  try {
    const posts = await readPostsFromDisk();
    return sortPublished(posts.filter((p) => p.published));
  } catch (err) {
    console.error("listPublishedPosts", err);
    return [];
  }
}

export async function getPublishedPostBySlug(
  slug: string,
): Promise<PostRow | null> {
  try {
    const posts = await readPostsFromDisk();
    return posts.find((p) => p.slug === slug && p.published) ?? null;
  } catch (err) {
    console.error("getPublishedPostBySlug", err);
    return null;
  }
}

export async function listAllPosts(): Promise<PostRow[]> {
  const posts = await readAllPostsForAdmin();
  return sortByUpdatedDesc(posts);
}

export async function getPostById(id: string): Promise<PostRow | null> {
  const posts = await readAllPostsForAdmin();
  return posts.find((p) => p.id === id) ?? null;
}

export async function createPost(input: PostInput): Promise<PostRow> {
  const posts = await readAllPostsForAdmin();
  assertUniqueSlug(posts, input.slug);

  const now = new Date().toISOString();
  const cover =
    input.cover_url && input.cover_url.length > 0 ? input.cover_url : null;

  const post: PostRow = {
    id: randomUUID(),
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt ?? "",
    body: input.body ?? "",
    cover_url: cover,
    published: Boolean(input.published),
    published_at: input.published ? now : null,
    created_at: now,
    updated_at: now,
  };

  await writePosts([post, ...posts], `blog: cria post "${post.title}"`);
  return post;
}

export async function updatePost(
  id: string,
  input: PostInput,
): Promise<PostRow> {
  const posts = await readAllPostsForAdmin();
  const index = posts.findIndex((p) => p.id === id);
  if (index < 0) throw new Error("Post não encontrado");

  assertUniqueSlug(posts, input.slug, id);
  const existing = posts[index];
  const cover =
    input.cover_url && input.cover_url.length > 0 ? input.cover_url : null;

  let published_at = existing.published_at;
  if (input.published && !existing.published) {
    published_at = new Date().toISOString();
  }
  if (!input.published) {
    published_at = null;
  }

  const updated: PostRow = {
    ...existing,
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt ?? "",
    body: input.body ?? "",
    cover_url: cover,
    published: Boolean(input.published),
    published_at,
    updated_at: new Date().toISOString(),
  };

  const next = [...posts];
  next[index] = updated;
  await writePosts(next, `blog: atualiza post "${updated.title}"`);
  return updated;
}

export async function deletePost(id: string): Promise<void> {
  const posts = await readAllPostsForAdmin();
  const existing = posts.find((p) => p.id === id);
  if (!existing) throw new Error("Post não encontrado");

  const next = posts.filter((p) => p.id !== id);
  await writePosts(next, `blog: remove post "${existing.title}"`);

  // Remove capa local do repo se for path interno.
  if (existing.cover_url?.startsWith("/images/blog/")) {
    const rel = `public${existing.cover_url}`;
    if (isGitHubConfigured()) {
      try {
        await deleteRepoFile(rel, `blog: remove capa de "${existing.title}"`);
      } catch (err) {
        console.error("delete cover", err);
      }
    } else {
      try {
        await fs.unlink(path.join(process.cwd(), rel));
      } catch {
        /* ignore */
      }
    }
  }
}

export async function uploadBlogImage(
  file: File,
): Promise<{ url: string; path: string }> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext)
    ? ext
    : "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
  const relativePath = `public/images/blog/${filename}`;
  const publicUrl = `/images/blog/${filename}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  if (isGitHubConfigured()) {
    await putRepoBinaryFile(
      relativePath,
      buffer,
      `blog: upload capa ${filename}`,
    );
    try {
      await fs.mkdir(BLOG_IMAGES_DIR, { recursive: true });
      await fs.writeFile(path.join(BLOG_IMAGES_DIR, filename), buffer);
    } catch {
      /* read-only FS */
    }
    return { url: publicUrl, path: relativePath };
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "GITHUB_TOKEN/GITHUB_REPO não configurados. Sem isso o upload não funciona em produção.",
    );
  }

  await fs.mkdir(BLOG_IMAGES_DIR, { recursive: true });
  await fs.writeFile(path.join(BLOG_IMAGES_DIR, filename), buffer);
  return { url: publicUrl, path: relativePath };
}
