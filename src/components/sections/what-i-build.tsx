"use client";

import React from "react";

export function WhatIBuild() {
  const categories = [
    {
      num: "01",
      title: "Web Applications",
      desc: "Full-stack interfaces prioritizing instant load times, server-side caching, and responsive state.",
      impact: "Reduces user bounce rates and increases search ranking visibility (SEO) via optimized Next.js static layouts."
    },
    {
      num: "02",
      title: "Backend Systems",
      desc: "Robust REST APIs, secure token auth protocols, optimized schemas, and strict connection pools.",
      impact: "Improves data integrity and server utilization, preventing performance degradation under concurrent user loads."
    },
    {
      num: "03",
      title: "Automation Tools",
      desc: "Asynchronous task queue managers, data collectors, web scrapers, and background crons.",
      impact: "Eliminates manual task overhead, freeing system resources and streamlining pipeline workflows."
    },
    {
      num: "04",
      title: "AI-Enhanced Applications",
      desc: "Large Language Model context parsing, streaming API responses, and vector embedding pipelines.",
      impact: "Enables product-driven smart workflows that deliver contextual, personalized responses to users."
    }
  ];

  return (
    <section id="what-i-build" className="relative bg-[#0c0a09] py-10 border-t border-stone-900">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl font-serif font-light italic text-white tracking-tight sm:text-4xl">
            capabilities.
          </h2>
          <p className="mt-4 text-xs text-stone-300 max-w-md leading-relaxed">
            Engineered systems designed to provide concrete business value and clean developer interfaces.
          </p>
        </div>

        {/* Index Table Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 border-t border-stone-850 pt-12">
          {categories.map((cat) => (
            <div key={cat.title} className="flex flex-col border-b border-stone-900/60 pb-8 last:border-0 md:last:border-b">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-stone-500">{cat.num}</span>
                <h3 className="text-sm font-serif font-medium text-white">{cat.title}</h3>
              </div>
              <p className="mt-4 text-xs text-stone-300 leading-relaxed">
                {cat.desc}
              </p>
              
              <div className="mt-5 flex flex-col gap-1 border-l border-stone-800 pl-3">
                <span className="text-[9px] font-mono uppercase tracking-wider text-stone-500 font-bold">business impact</span>
                <p className="text-xs text-stone-200 font-medium leading-relaxed">{cat.impact}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
