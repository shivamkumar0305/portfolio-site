import React from "react";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shivam Kumar",
    "jobTitle": "Backend Engineer",
    "url": "https://shivamkumar.dev",
    "sameAs": [
      "https://github.com/shivamkumar0305",
      "https://www.linkedin.com/in/shivam10305/"
    ],
    "knowsAbout": [
      "Backend Engineering",
      "Python",
      "Django",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Linux",
      "Systems Design",
      "APIs",
      "Next.js",
      "TypeScript"
    ],
    "description": "Backend-focused software engineer building scalable web applications using Django, PostgreSQL, Next.js, and modern cloud tools."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
