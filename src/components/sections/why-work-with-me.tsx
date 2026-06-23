"use client";

import React from "react";
import { Cpu, Database, BookOpen, Target } from "lucide-react";

export function WhyWorkWithMe() {
  const points = [
    {
      title: "I build products, not tutorials.",
      icon: <Cpu size={14} className="text-stone-400" />,
      desc: "Every system I develop is built to solve a concrete workflow issue. I design with full consideration of concurrent tasks, security boundaries, and edge errors."
    },
    {
      title: "Strong backend fundamentals.",
      icon: <Database size={14} className="text-stone-400" />,
      desc: "Deep focus on database schema optimization, index selection, connection pooling, and Row-Level Security rather than just styling user interfaces."
    },
    {
      title: "Comfortable learning independently.",
      icon: <BookOpen size={14} className="text-stone-400" />,
      desc: "I am adept at reading documentation, parsing source code, and configuring virtual environments to solve blocking tasks without supervision."
    },
    {
      title: "Solving user problems first.",
      icon: <Target size={14} className="text-stone-400" />,
      desc: "Technology is a tool, not the goal. I prioritize feature engineering that directly impacts recruiter success, user flows, and client value."
    }
  ];

  return (
    <section id="why-me" className="relative bg-[#0c0a09] py-6 sm:py-12 border-t border-stone-900">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          
          {/* Header left */}
          <div className="lg:col-span-5">
            <h2 className="text-2xl sm:text-4xl font-serif font-light italic text-white tracking-tight">
              why shivam.
            </h2>
            <p className="mt-4 text-xs text-stone-300 max-w-sm leading-relaxed hidden sm:block">
              A software engineer who treats writing code as a structured architectural discipline. Focused on feature ownership and performance optimization.
            </p>
          </div>

          {/* Checklist right */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:flex sm:flex-col sm:space-y-6">
            {points.map((point) => (
              <div key={point.title} className="flex gap-2 sm:gap-4 sm:border-b sm:border-stone-850 sm:pb-5 last:border-0 last:pb-0 items-start">
                <div className="flex-shrink-0 mt-0.5">
                  {point.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xs font-semibold text-stone-200 leading-tight">{point.title}</h3>
                  <p className="mt-2 text-xs text-stone-300 leading-relaxed hidden sm:block">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
