import type { Metadata } from "next";
import { Baloo_2, Fraunces, Nunito_Sans } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { getSite } from "@/lib/content";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Casa LuBe — Espaço lúdico e de bem-estar",
    template: "%s · Casa LuBe",
  },
  description:
    "Clínica de diagnósticos e terapias para crianças com transtornos do neurodesenvolvimento. Unidade em Fortaleza-CE.",
  metadataBase: new URL("https://lubeterapia.com.br"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getSite();

  return (
    <html
      lang="pt-BR"
      className={`${baloo.variable} ${fraunces.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-lube-ink antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-lube-foam focus:px-4 focus:py-2 focus:font-bold focus:shadow-lg"
        >
          Ir para o conteúdo
        </a>
        <SiteHeader />
        <div id="conteudo" className="flex-1">
          {children}
        </div>
        <SiteFooter />
        <WhatsAppFloat phone={site.units[0].whatsapp} clinicName={site.brand.name} />
      </body>
    </html>
  );
}
