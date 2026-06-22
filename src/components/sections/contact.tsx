"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Please fill out all fields." });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      // Handle non-JSON HTML error responses (like 404 or 500 pages) gracefully
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response received:", text);
        setStatus({
          type: "error",
          message: `Server returned an error (${res.status}). Please check your Vercel logs.`
        });
        return;
      }

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          type: "success",
          message: "Thank you! Your message was submitted successfully. I will get back to you shortly."
        });
        setFormData({ name: "", email: "", message: "" });

        try {
          if (typeof window !== "undefined" && (window as any).va) {
            (window as any).va.track("contact_submission", { status: "success" });
          }
        } catch (trackErr) {
          console.warn("Analytics tracking failed:", trackErr);
        }
      } else {
        const errorMsg = data.errors ? data.errors.map((err: any) => err.message).join(" ") : (data.error || "An error occurred.");
        setStatus({
          type: "error",
          message: errorMsg
        });
        try {
          if (typeof window !== "undefined" && (window as any).va) {
            (window as any).va.track("contact_submission", { status: "error" });
          }
        } catch (trackErr) {
          console.warn("Analytics tracking failed:", trackErr);
        }
      }
    } catch (err) {
      console.error("Fetch request error:", err);
      setStatus({
        type: "error",
        message: "Failed to connect to the server. Please check your connection and try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      name: "linkedin",
      value: "linkedin.com/in/shivam10305",
      href: "https://www.linkedin.com/in/shivam10305/",
      icon: (
        <svg className="h-4 w-4 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    {
      name: "github",
      value: "github.com/shivamkumar0305",
      href: "https://github.com/shivamkumar0305",
      icon: (
        <svg className="h-4 w-4 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      )
    },
    {
      name: "email",
      value: "shivamkumar0305@gmail.com",
      href: "mailto:shivamkumar0305@gmail.com",
      icon: (
        <svg className="h-4 w-4 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      )
    }
  ];

  return (
    <section id="contact" className="relative bg-[#0c0a09] py-16 border-t border-stone-900">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-16">

          {/* Methods Column */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <h2 className="text-3xl font-serif font-light italic text-white tracking-tight sm:text-4xl">
              conversation.
            </h2>
            <p className="mt-4 text-xs text-stone-300 leading-relaxed max-w-sm">
              Let's coordinate internship inquiries, project specifications, or collaboration details.
            </p>

            <div className="mt-12 space-y-6">
              {contactMethods.map((method) => (
                <a
                  key={method.name}
                  href={method.href}
                  target={method.name !== "email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group border-b border-stone-850 pb-4 last:border-0 last:pb-0"
                  onClick={() => {
                    try {
                      if (typeof window !== "undefined" && (window as any).va) {
                        (window as any).va.track(`${method.name}_click`);
                      }
                    } catch (trackErr) {
                      console.warn("Analytics tracking failed:", trackErr);
                    }
                  }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-[#0c0a09] border border-stone-850">
                    {method.icon}
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block font-bold">{method.name}</span>
                    <span className="text-xs font-mono text-stone-200 block mt-0.5 group-hover:text-white transition-colors">
                      {method.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block mb-2 font-bold">
                  your name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={loading}
                  className="w-full bg-transparent border-b border-stone-850 py-3 text-xs text-stone-200 placeholder:text-stone-700 focus:border-stone-400 focus:outline-none transition-colors duration-200"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block mb-2 font-bold">
                  your email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={loading}
                  className="w-full bg-transparent border-b border-stone-850 py-3 text-xs text-stone-200 placeholder:text-stone-700 focus:border-stone-400 focus:outline-none transition-colors duration-200"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block mb-2 font-bold">
                  your message
                </label>
                <textarea
                  id="message"
                  required
                  rows={3}
                  placeholder="Hi Shivam, I am interested in scheduling an interview..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={loading}
                  className="w-full bg-transparent border-b border-stone-850 py-3 text-xs text-stone-200 placeholder:text-stone-700 focus:border-stone-400 focus:outline-none transition-colors duration-200 resize-none h-24"
                />
              </div>

              {status && (
                <div
                  className={`rounded-lg px-4 py-3 text-xs font-mono tracking-tight ${status.type === "success"
                      ? "border border-emerald-950 bg-emerald-950/20 text-emerald-400"
                      : "border border-red-950 bg-red-950/20 text-red-400"
                    }`}
                >
                  {status.message}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
