import { getSite } from "@/lib/content";
import { DEFAULT_WA_TEXT, whatsappHref } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  const site = getSite();
  const href = whatsappHref(site.units[0].whatsapp, DEFAULT_WA_TEXT);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir conversa no WhatsApp"
      className="fixed right-4 bottom-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:shadow-xl md:right-6 md:bottom-6"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7"
        fill="currentColor"
        aria-hidden
      >
        <path d="M19.11 17.4c-.28-.14-1.64-.81-1.9-.9-.25-.1-.44-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.1-.18.05-.35-.02-.49-.07-.14-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.47h-.53c-.18 0-.48.07-.73.35-.25.28-.96.94-.96 2.29s.98 2.65 1.12 2.83c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.57.65.21 1.25.18 1.72.11.52-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32z" />
        <path d="M16.02 3C9.39 3 4 8.38 4 14.99c0 2.11.55 4.17 1.6 5.99L4 29l8.2-1.55c1.75.96 3.73 1.46 5.75 1.46h.01c6.63 0 12.02-5.38 12.02-12S22.65 3 16.02 3zm0 21.86h-.01c-1.78 0-3.53-.48-5.06-1.39l-.36-.21-4.86.92.98-4.74-.24-.38a9.84 9.84 0 0 1-1.51-5.24c0-5.44 4.44-9.87 9.9-9.87 2.64 0 5.13 1.03 7 2.9a9.8 9.8 0 0 1 2.9 6.97c0 5.44-4.44 9.87-9.9 9.87z" />
      </svg>
    </a>
  );
}
