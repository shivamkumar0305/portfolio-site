"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function HoverCard({ children, className, ...props }: HoverCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={cn(
        "relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-6 transition-all duration-300",
        className
      )}
      style={
        {
          "--mouse-x": `${coords.x}px`,
          "--mouse-y": `${coords.y}px`,
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Background radial glow */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300",
          isFocused && "opacity-100"
        )}
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(99, 102, 241, 0.08), transparent 80%)`,
        }}
      />
      
      {/* Border radial glow */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-px rounded-xl border border-transparent opacity-0 transition-opacity duration-300",
          isFocused && "opacity-100"
        )}
        style={{
          background: `radial-gradient(150px circle at var(--mouse-x) var(--mouse-y), rgba(99, 102, 241, 0.4), transparent 85%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
