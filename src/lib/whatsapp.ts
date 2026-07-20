export function whatsappHref(phone: string, text?: string) {
  const base = `https://api.whatsapp.com/send?phone=${phone}`;
  if (!text) return base;
  return `${base}&text=${encodeURIComponent(text)}`;
}

export const DEFAULT_WA_TEXT =
  "Olá! Vim do site e gostaria de tirar dúvidas sobre a Casa LuBe.";
