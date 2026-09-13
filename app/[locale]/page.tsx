import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { SceneCanvas } from "@/components/scene/SceneCanvas";
import { Header } from "@/components/ui/Header";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Projects } from "@/sections/Projects";
import { Stack } from "@/sections/Stack";
import { TerminalSection } from "@/sections/TerminalSection";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("title"), description: t("description") };
}

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <SceneCanvas />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Stack />
        <TerminalSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
