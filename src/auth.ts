import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

/**
 * Resolve o hash bcrypt a partir do ambiente.
 * - Local/Next: ADMIN_PASSWORD_HASH com \$ escapado
 * - Netlify: $ nas env vars é expandido e corrompe o bcrypt → use ADMIN_PASSWORD_HASH_B64
 * - Fallback: $$ → $ (escape documentado pelo Netlify)
 */
function resolveAdminPasswordHash(): string | undefined {
  const b64 = process.env.ADMIN_PASSWORD_HASH_B64?.trim();
  if (b64) {
    try {
      return Buffer.from(b64, "base64").toString("utf8").trim();
    } catch {
      return undefined;
    }
  }

  const raw = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (!raw) return undefined;

  return raw.replace(/\\\$/g, "$").replace(/\$\$/g, "$");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "")
          .trim()
          .toLowerCase();
        const password = String(credentials?.password ?? "");

        const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        const adminHash = resolveAdminPasswordHash();

        if (!adminEmail || !adminHash || !email || !password) {
          console.error(
            "[auth] Config incompleta:",
            !adminEmail ? "ADMIN_EMAIL" : "",
            !adminHash ? "ADMIN_PASSWORD_HASH(_B64)" : "",
          );
          return null;
        }

        if (!adminHash.startsWith("$2")) {
          console.error(
            "[auth] Hash bcrypt inválido (Netlify pode ter corrompido $). Use ADMIN_PASSWORD_HASH_B64.",
          );
          return null;
        }

        if (email !== adminEmail) {
          return null;
        }

        const ok = await bcrypt.compare(password, adminHash);
        if (!ok) return null;

        return {
          id: "admin",
          email: adminEmail,
          name: "Administrador",
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = "admin";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "admin";
      }
      return session;
    },
  },
});
