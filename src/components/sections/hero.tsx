"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";

export function Hero() {
  const [logs, setLogs] = useState<{ id: number; text: string; type: "info" | "success" | "warn" }[]>([]);

  useEffect(() => {
    const logPool = [
      { text: "GET /api/v1/projects - 200 OK (Cache HIT) - 0.8ms", type: "success" },
      { text: "POST /api/v1/contact - rate limiter verified - bucket: 4/5", type: "info" },
      { text: "Worker thread sentinel-worker-3 spawned (PID: 4982)", type: "info" },
      { text: "PostgreSQL pool connected - active connections: 8/20", type: "info" },
      { text: "DB Query optimized: idx_projects_order index utilized - 0.5ms", type: "success" },
      { text: "Redis session state synchronized in cluster - 1.1ms", type: "success" },
      { text: "Event pipeline: ingested 1,200 logs/sec", type: "info" }
    ] as const;

    setLogs([
      { id: 1, text: "System Aegis Gateway initialized.", type: "success" },
      { id: 2, text: "Redis authentication cache check: connected.", type: "success" }
    ]);

    let index = 0;
    const interval = setInterval(() => {
      setLogs((prev) => [...prev.slice(-3), { id: Date.now(), ...logPool[index % logPool.length] }]);
      index++;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative flex min-h-[75vh] sm:min-h-[90vh] items-center justify-center overflow-hidden bg-[#0c0a09] pt-16 pb-8 sm:pt-24 sm:pb-12">
      <div className="mx-auto max-w-5xl px-6 sm:px-8 w-full">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Main Headline & CTAs (Left) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Badge */}
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-stone-850 bg-[#0c0a09] px-3 py-1 text-[9px] font-mono uppercase tracking-wider text-stone-400">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              available for internships
            </div>

            {/* Huge Serif Headline */}
            <h1 className="text-4xl sm:text-7xl font-serif font-light italic tracking-tight text-[#f5f5f4] leading-tight">
              software engineer.
            </h1>
            
            {/* Subheadline */}
            <p className="mt-4 sm:mt-6 max-w-lg text-xs sm:text-sm text-stone-300 leading-relaxed">
              <span className="hidden sm:inline">Final-year engineering student building production-ready backend architectures. Specialized in high-throughput APIs, cache clusters, database tuning, and automation tools.</span>
              <span className="inline sm:hidden">Building production-ready backend architectures and automated pipelines.</span>
            </p>

            {/* CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                size="default"
                onClick={() => handleScrollTo("#projects")}
              >
                view projects
              </Button>

              <a
                href="/assets/resume.pdf"
                download="Shivam_Kumar_Resume.pdf"
                className="inline-flex h-10 items-center justify-center rounded-full border border-stone-850 bg-[#0c0a09] px-5 font-mono text-[9px] uppercase tracking-wider text-[#F5F5F4] transition-all duration-200 hover:border-stone-700 hover:bg-stone-800 hover:text-white"
                onClick={() => {
                  if (typeof window !== "undefined" && (window as any).va) {
                    (window as any).va.track("resume_download");
                  }
                }}
              >
                download resume
              </a>
            </div>
          </div>

          {/* Simulated Backend CLI Telemetry (Right) */}
          <div className="lg:col-span-5 w-full hidden lg:block">
            <div className="rounded-xl border border-stone-850/60 bg-[#0c0a09] p-5 font-mono text-[10px] text-stone-400 shadow-xl shadow-black/10">
              <div className="flex items-center justify-between border-b border-stone-900 pb-3 mb-4">
                <div className="flex gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-850" />
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-850" />
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-850" />
                </div>
                <span className="text-[8px] uppercase tracking-widest text-stone-500 font-bold">shivam@backend ~ telemetry</span>
              </div>
              
              <div className="space-y-2 select-none h-32 flex flex-col justify-end">
                {logs.map((log) => (
                  <div key={log.id} className="transition-all duration-300 opacity-80 animate-fadeIn">
                    <span className="text-stone-600">[$] </span>
                    <span
                      className={
                        log.type === "success"
                          ? "text-emerald-500/80"
                          : log.type === "warn"
                          ? "text-amber-500/80"
                          : "text-stone-300"
                      }
                    >
                      {log.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
