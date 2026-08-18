import { CursorSpotlight } from "@/components/CursorSpotlight";
import { Navbar } from "@/components/Navbar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Ir para o conteúdo
      </a>
      <CursorSpotlight />
      <Navbar />
      <main id="conteudo">{children}</main>
    </>
  );
}
