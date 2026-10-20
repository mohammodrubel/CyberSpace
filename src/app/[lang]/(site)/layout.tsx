import ContactModal from "@/components/ContactModal";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Locale } from "@/lib/i18n";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer lang={lang as Locale} />
      <ContactModal />
    </>
  );
}
