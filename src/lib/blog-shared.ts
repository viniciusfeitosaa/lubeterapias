import { z } from "zod";

export type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const coverUrlSchema = z
  .union([
    z.string().url(),
    z.string().regex(/^\/images\/.+/),
    z.literal(""),
    z.null(),
  ])
  .optional()
  .transform((v) => (v === "" || v === undefined ? null : v));

export const postInputSchema = z.object({
  title: z.string().min(1, "Título obrigatório").max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido (use minúsculas e hífens)"),
  excerpt: z.string().max(500).optional().default(""),
  body: z.string().optional().default(""),
  cover_url: coverUrlSchema,
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
