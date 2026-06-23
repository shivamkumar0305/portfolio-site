"use client";

import React from "react";

export function About() {
  const dailyTech = [
    { name: "Python / Django", desc: "Building modular REST APIs and ORM query optimizations." },
    { name: "PostgreSQL", desc: "Designing partition tables, composite indexes, and evaluating EXPLAIN ANALYZE profiles." },
    { name: "Redis", desc: "Implementing sliding-window rate limiters and memory-buffer caching clusters." },
    { name: "Docker & Linux", desc: "Virtualizing isolated services and writing automation deployment bash scripts." },
    { name: "Next.js / TypeScript", desc: "Wiring high-performance servers to clean, fast static interfaces." }
  ];

  return (
    <section id="about" className="relative bg-[#0c0a09] py-6 sm:py-10 border-t border-stone-900">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-8 sm:gap-16 lg:grid-cols-12">
          
          {/* bio */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-4xl font-serif font-light italic text-white tracking-tight">
              engineering.
            </h2>
            <p className="mt-4 sm:mt-6 text-xs text-stone-300 leading-relaxed max-w-md">
              <span className="hidden sm:inline">I am a systems-focused backend developer who builds highly reliable products. Instead of coding boilerplate tutorials, I design and run systems capable of managing concurrent tasks, rate limiting, and database indexing.</span>
              <span className="inline sm:hidden">I build production backend systems capable of handling concurrency, rate limiting, and database indexing.</span>
            </p>
            <p className="mt-4 text-xs text-stone-300 leading-relaxed max-w-md hidden sm:block">
              My engineering approach prioritizes database query tuning, network speed, and shipping modular code. I thrive in environments where engineers are expected to own features from design documents to post-deployment telemetry.
            </p>
          </div>

          {/* technical list */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="border border-stone-850 rounded-lg p-4 sm:p-6 bg-[#0c0a09]">
              <span className="text-[9px] font-mono uppercase tracking-widest text-stone-400 block mb-4 sm:mb-6 font-bold">
                daily system toolbox
              </span>
              
              <div className="space-y-4 hidden sm:block">
                {dailyTech.map((tech) => (
                  <div key={tech.name} className="flex justify-between items-start border-b border-stone-900/60 pb-3 last:border-0 last:pb-0">
                    <div className="w-1/3 shrink-0">
                      <span className="text-xs font-mono text-stone-200">{tech.name}</span>
                    </div>
                    <div className="w-2/3">
                      <span className="text-xs text-stone-400 leading-relaxed block">{tech.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 sm:hidden">
                {dailyTech.map((tech) => (
                  <span
                    key={tech.name}
                    className="rounded bg-[#0c0a09] px-2 py-0.5 font-mono text-[9px] text-stone-300 border border-stone-850"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
