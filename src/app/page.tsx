import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { WhatIBuild } from "@/components/sections/what-i-build";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { TechStack } from "@/components/sections/tech-stack";
import { WhyWorkWithMe } from "@/components/sections/why-work-with-me";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhatIBuild />
      <FeaturedProjects />
      <TechStack />
      <WhyWorkWithMe />
      <Contact />
    </>
  );
}
