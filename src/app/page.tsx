import { About } from "@/sections/About";
import { BuildingWithAI } from "@/sections/BuildingWithAI";
import { Contact } from "@/sections/Contact";
import { Exploring } from "@/sections/Exploring";
import { Footer } from "@/sections/Footer";
import { Hero } from "@/sections/Hero";
import { SelectedWork } from "@/sections/SelectedWork";
import { Stack } from "@/sections/Stack";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <About />
      <BuildingWithAI />
      <Stack />
      <Exploring />
      <Contact />
      <Footer />
    </>
  );
}
