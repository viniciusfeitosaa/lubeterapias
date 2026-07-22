import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(gfm).use(html, { sanitize: true }).process(markdown);
  return String(result);
}
