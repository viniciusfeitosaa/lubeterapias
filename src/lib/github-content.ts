import "server-only";

type GitHubConfig = {
  token: string;
  owner: string;
  repo: string;
  branch: string;
};

type GhFile = {
  content: string;
  sha: string;
};

export function isGitHubConfigured(): boolean {
  return Boolean(process.env.GITHUB_TOKEN?.trim() && process.env.GITHUB_REPO?.trim());
}

function getConfig(): GitHubConfig {
  const token = process.env.GITHUB_TOKEN?.trim();
  const full = process.env.GITHUB_REPO?.trim();
  const branch = process.env.GITHUB_BRANCH?.trim() || "main";
  if (!token || !full) {
    throw new Error(
      "Configure GITHUB_TOKEN e GITHUB_REPO (ex.: owner/repo) para gravar posts.",
    );
  }
  const [owner, repo] = full.split("/");
  if (!owner || !repo) {
    throw new Error("GITHUB_REPO deve ser no formato owner/repo");
  }
  return { token, owner, repo, branch };
}

async function ghFetch(
  path: string,
  init?: RequestInit & { config?: GitHubConfig },
): Promise<Response> {
  const config = init?.config ?? getConfig();
  const { config: _c, ...rest } = init ?? {};
  return fetch(`https://api.github.com/repos/${config.owner}/${config.repo}${path}`, {
    ...rest,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${config.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(rest.headers ?? {}),
    },
    cache: "no-store",
  });
}

async function getRepoFileMeta(
  filePath: string,
): Promise<{ sha: string; contentBase64?: string } | null> {
  const config = getConfig();
  const res = await ghFetch(
    `/contents/${filePath}?ref=${encodeURIComponent(config.branch)}`,
    { config },
  );
  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub GET ${filePath}: ${res.status} ${body}`);
  }
  const data = (await res.json()) as {
    content?: string;
    encoding?: string;
    sha: string;
  };
  return {
    sha: data.sha,
    contentBase64:
      data.encoding === "base64" && data.content
        ? data.content.replace(/\n/g, "")
        : undefined,
  };
}

/** Lê arquivo de texto do repo. Retorna null se não existir. */
export async function getRepoTextFile(filePath: string): Promise<GhFile | null> {
  const meta = await getRepoFileMeta(filePath);
  if (!meta) return null;
  if (!meta.contentBase64) {
    throw new Error(`Conteúdo inesperado em ${filePath}`);
  }
  return {
    content: Buffer.from(meta.contentBase64, "base64").toString("utf8"),
    sha: meta.sha,
  };
}

/** Cria ou atualiza arquivo de texto. */
export async function putRepoTextFile(
  filePath: string,
  content: string,
  message: string,
): Promise<void> {
  const config = getConfig();
  const existing = await getRepoTextFile(filePath);
  const res = await ghFetch(`/contents/${filePath}`, {
    method: "PUT",
    config,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: Buffer.from(content, "utf8").toString("base64"),
      branch: config.branch,
      ...(existing ? { sha: existing.sha } : {}),
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub PUT ${filePath}: ${res.status} ${body}`);
  }
}

/** Cria ou atualiza arquivo binário (ex.: imagem). */
export async function putRepoBinaryFile(
  filePath: string,
  buffer: Buffer,
  message: string,
): Promise<void> {
  const config = getConfig();
  const existing = await getRepoFileMeta(filePath);

  const res = await ghFetch(`/contents/${filePath}`, {
    method: "PUT",
    config,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: buffer.toString("base64"),
      branch: config.branch,
      ...(existing ? { sha: existing.sha } : {}),
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub PUT ${filePath}: ${res.status} ${body}`);
  }
}

/** Remove arquivo do repo. Ignora se não existir. */
export async function deleteRepoFile(
  filePath: string,
  message: string,
): Promise<void> {
  const existing = await getRepoFileMeta(filePath);
  if (!existing) return;
  const config = getConfig();
  const res = await ghFetch(`/contents/${filePath}`, {
    method: "DELETE",
    config,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      sha: existing.sha,
      branch: config.branch,
    }),
  });
  if (!res.ok && res.status !== 404) {
    const body = await res.text();
    throw new Error(`GitHub DELETE ${filePath}: ${res.status} ${body}`);
  }
}
