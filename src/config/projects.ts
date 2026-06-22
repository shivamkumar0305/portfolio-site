export interface Project {
  id: string;
  name: string;
  description: string;
  problem: string;
  solution: string;
  stack: string[];
  githubLink: string;
  liveLink?: string;
  architectureNodes: {
    id: string;
    label: string;
    type: "client" | "service" | "database" | "cache" | "queue";
  }[];
  architectureEdges: {
    from: string;
    to: string;
    label?: string;
  }[];
}

export const projects: Project[] = [
  {
    id: "financeflow",
    name: "FinanceFlow",
    description: "A financial records management REST API with granular RBAC, monthly aggregations, and soft-delete features.",
    problem: "Precision accounting demands zero rounding errors, strict auditing compliance, and role-scoped read/write data blocks.",
    solution: "Designed a Django REST application using DecimalField columns, soft-delete triggers, and custom RBAC layers. Optimized analytics endpoints using Django ORM aggregate and annotate, executing queries in < 1ms.",
    stack: ["Python", "Django", "PostgreSQL", "JWT", "Docker", "Git"],
    githubLink: "https://github.com/shivamkumar0305/financeflow-fullstack", // Replace with your actual GitHub link
    liveLink: "https://financeflow-fullstack.vercel.app", // Replace with your actual demo link
    architectureNodes: [
      { id: "client", label: "Client App", type: "client" },
      { id: "api", label: "Django REST API", type: "service" },
      { id: "auth", label: "JWT Auth Check", type: "cache" },
      { id: "db", label: "PostgreSQL DB", type: "database" }
    ],
    architectureEdges: [
      { from: "client", to: "api", label: "RBAC Request" },
      { from: "api", to: "auth", label: "Verify Token" },
      { from: "api", to: "db", label: "Query (aggregates)" }
    ]
  },
  {
    id: "ticketflow",
    name: "TicketFlow",
    description: "An asynchronous support ticket management helpdesk exposing API endpoints, Celery workers, and WebSocket comments.",
    problem: "Heavy background processes (like email triggers) increase HTTP response latency, degrading helpdesk user experience.",
    solution: "Architected a Celery worker pool and Redis message broker to offload email alerts. Integrated threaded ticket commenting and customized database pagination.",
    stack: ["Python", "Django", "Celery", "Redis", "PostgreSQL", "Docker", "Vercel"],
    githubLink: "https://github.com/shivamkumar0305/ticketflow-fullstack", // Replace with your actual GitHub link
    liveLink: "https://ticketflow-fullstack.vercel.app/", // Replace with your actual demo link
    architectureNodes: [
      { id: "client", label: "Client UI", type: "client" },
      { id: "django", label: "Django App", type: "service" },
      { id: "db", label: "PostgreSQL Store", type: "database" },
      { id: "broker", label: "Redis Broker", type: "queue" },
      { id: "celery", label: "Celery Workers", type: "service" }
    ],
    architectureEdges: [
      { from: "client", to: "django", label: "Create Ticket" },
      { from: "django", to: "db", label: "Save State" },
      { from: "django", to: "broker", label: "Queue Alert" },
      { from: "broker", to: "celery", label: "Consume" }
    ]
  },
  {
    id: "recipe-api",
    name: "Recipe API",
    description: "A Recipe Management backend with structured tag/ingredient queries, image uploads, and TDD checks.",
    problem: "Handling multipart recipe media uploads and complex ingredient tags requires scalable indexing and comprehensive code testing.",
    solution: "Built a token-secured REST API using Python's Pillow library for image processing. Enforced strict Test-Driven Development (TDD) writing unittest suites before writing logic.",
    stack: ["Python", "Django REST Framework", "PostgreSQL", "Docker", "TDD", "Git"],
    githubLink: "", // Replace with your actual GitHub link
    liveLink: "", // Replace with your actual demo link
    architectureNodes: [
      { id: "client", label: "Client Client", type: "client" },
      { id: "api", label: "Django REST API", type: "service" },
      { id: "s3", label: "Media Uploads", type: "cache" },
      { id: "db", label: "PostgreSQL DB", type: "database" }
    ],
    architectureEdges: [
      { from: "client", to: "api", label: "Multipart POST" },
      { from: "api", to: "s3", label: "Store Asset" },
      { from: "api", to: "db", label: "Save Schema" }
    ]
  }
];
