"use client";

import React from "react";
import { Code2 } from "lucide-react";
import { projects } from "@/config/projects";
import { ArchitectureCanvas } from "../architecture-canvas";

export function FeaturedProjects() {
  return (
    <section id="projects" className="relative bg-[#0c0a09] py-6 sm:py-10 border-t border-stone-900">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-6 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-serif font-light italic text-white tracking-tight">
            selected projects.
          </h2>
          <p className="mt-4 text-xs text-stone-300 max-w-md leading-relaxed hidden sm:block">
            Real systems built with a focus on latency optimization, database execution, and clean code paths.
          </p>
        </div>

        {/* Projects Stream */}
        <div className="space-y-10 sm:space-y-16">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="flex flex-col gap-4 sm:gap-8 border-t border-stone-900/60 pt-6 sm:pt-10 first:border-t-0 first:pt-0"
            >
              {/* Header Info */}
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-stone-400 mb-2 sm:mb-3 font-bold">
                  <Code2 className="h-3 w-3 text-orange-550" />
                  project 0{index + 1} / case study
                </div>
                
                <h3 className="text-xl sm:text-3xl font-serif font-medium text-white tracking-tight">
                  {project.name}
                </h3>
                
                <p className="mt-2 sm:mt-4 text-xs text-stone-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Problem vs Solution Split View */}
              <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-stone-900/40 pb-8">
                <div>
                  <span className="text-[8px] font-mono uppercase tracking-wider text-red-400/90 block font-bold">the problem</span>
                  <p className="text-[11px] text-stone-300 mt-2 leading-relaxed">{project.problem}</p>
                </div>
                <div>
                  <span className="text-[8px] font-mono uppercase tracking-wider text-emerald-400/90 block font-bold">the solution</span>
                  <p className="text-[11px] text-stone-200 mt-2 leading-relaxed">{project.solution}</p>
                </div>
              </div>

              {/* Topology & Stack block */}
              <div className="flex flex-col gap-4 sm:gap-6">
                {/* SVG canvas */}
                <div className="w-full overflow-x-auto">
                  <ArchitectureCanvas
                    projectId={project.id}
                    nodes={project.architectureNodes}
                    edges={project.architectureEdges}
                  />
                </div>

                {/* Stack & Links */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mt-1 sm:mt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-[#0c0a09] px-2.5 py-0.5 font-mono text-[9px] text-stone-300 border border-stone-850"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-6 text-[9px] font-mono uppercase tracking-widest font-bold">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-300 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                      >
                        <span>inspect source</span>
                        <span className="text-stone-550">→</span>
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-300 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                      >
                        <span>live demo</span>
                        <span className="text-stone-555">→</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
