"use client";

import React from "react";

export function TechStack() {
  const groups = [
    {
      title: "backend stack",
      items: [
        { name: "Python & Django", desc: "Core environment for API routing, service logic, and database operations." },
        { name: "PostgreSQL", desc: "Relational database schema structure, key index creation, and transaction logic." },
        { name: "Redis Cache", desc: "Memory clusters, session cache stores, and rate limiter bucket counts." }
      ]
    },
    {
      title: "frontend stack",
      items: [
        { name: "Next.js 15", desc: "App router architecture, Incremental Static Regeneration (ISR), and sitemaps." },
        { name: "TypeScript", desc: "Type safety schemas and strict interface mappings." },
        { name: "Tailwind CSS", desc: "Design systems implementation using utility tokens." }
      ]
    },
    {
      title: "devops & cloud",
      items: [
        { name: "Docker & Linux", desc: "Virtual containers, server systemd configuration, and bash scripting." },
        { name: "Supabase Infrastructure", desc: "Managed Postgres, Row-Level Security rules, and anonymized access pools." },
        { name: "Vercel Engine", desc: "Continuous deployment CDN routing and serverless function scaling." }
      ]
    }
  ];

  return (
    <section id="tech-stack" className="relative bg-[#0c0a09] py-6 sm:py-12 border-t border-stone-900">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-6 sm:mb-20">
          <h2 className="text-2xl sm:text-4xl font-serif font-light italic text-white tracking-tight">
            tech stack.
          </h2>
          <p className="mt-4 text-xs text-stone-300 max-w-md leading-relaxed hidden sm:block">
            Core technologies and runtime environments I use to build scalable products and automation layers.
          </p>
        </div>

        {/* Index Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-12 border-t border-stone-850 pt-6 sm:pt-12">
          {groups.map((group) => (
            <div key={group.title} className="flex flex-col">
              <span className="text-[9px] font-mono uppercase tracking-widest text-stone-400 mb-3 sm:mb-6 block font-bold">
                {group.title}
              </span>
              
              <div className="space-y-6 hidden sm:block">
                {group.items.map((item) => (
                  <div key={item.name} className="flex flex-col">
                    <span className="text-xs font-semibold text-stone-200">{item.name}</span>
                    <span className="text-xs text-stone-300 leading-relaxed mt-1.5">{item.desc}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-x-2 gap-y-1 sm:hidden">
                {group.items.map((item, idx) => (
                  <React.Fragment key={item.name}>
                    <span className="text-xs text-stone-300">{item.name}</span>
                    {idx < group.items.length - 1 && <span className="text-stone-600 select-none">•</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
