import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Uso: node scripts/hash-password.mjs "sua-senha"');
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
// Escape $ para o Next.js não expandir variáveis no .env
console.log(hash.replaceAll("$", "\\$"));
console.log("\nCole no .env:");
console.log(`ADMIN_PASSWORD_HASH=${hash.replaceAll("$", "\\$")}`);
