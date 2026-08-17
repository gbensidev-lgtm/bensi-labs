import { About } from "@/sections/About";
import { BuildingWithAI } from "@/sections/BuildingWithAI";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { Hero } from "@/sections/Hero";
import { Process } from "@/sections/Process";
import { SelectedWork } from "@/sections/SelectedWork";
import { Services } from "@/sections/Services";
import { Stack } from "@/sections/Stack";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Services />
      <About />
      <Process />
      <BuildingWithAI />
      <Stack />
      <Contact />
      <Footer />
    </>
  );
}
