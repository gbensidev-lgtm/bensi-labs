import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bensi Labs — AI Product Engineer · Software · Data",
  description:
    "Bensi Labs — Gustavo Bensi. Construindo soluções inteligentes com IA e dados.",
  metadataBase: new URL("https://bensilabs.dev"),
  openGraph: {
    title: "Bensi Labs — AI Product Engineer · Software · Data",
    description:
      "Bensi Labs — Gustavo Bensi. Construindo soluções inteligentes com IA e dados.",
    type: "website",
    locale: "pt_BR",
    url: "https://bensilabs.dev",
    siteName: "Bensi Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bensi Labs — AI Product Engineer · Software · Data",
    description:
      "Bensi Labs — Gustavo Bensi. Construindo soluções inteligentes com IA e dados.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background font-sans text-foreground antialiased">
        <a href="#conteudo" className="skip-link">
          Ir para o conteúdo
        </a>
        <CursorSpotlight />
        <Navbar />
        <main id="conteudo">{children}</main>
      </body>
    </html>
  );
}
