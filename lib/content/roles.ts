import type { Role } from "./types";

export const roles: Role[] = [
  {
    slug: "ai-ml",
    name: "AI/ML Engineer",
    description:
      "Builds agentic systems and LLM pipelines that survive contact with real users, graph orchestration, evals, retrieval, and fine-tuning on your own data.",
    skills: [
      "LangGraph",
      "Evals & guardrails",
      "Fine-tuning",
      "RAG / pgvector",
      "Python",
      "OpenAI / Anthropic",
    ],
    experience: "5–12 yrs",
    icon: "BrainCircuit",
  },
  {
    slug: "full-stack",
    name: "Full-stack Engineer",
    description:
      "Owns features end-to-end across Next.js, FastAPI, and Postgres, the engineer clients hire to ship paying-customer SaaS in weeks, not quarters.",
    skills: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Postgres",
      "Tailwind",
      "tRPC / REST",
      "Stripe",
    ],
    experience: "5–10 yrs",
    icon: "Code2",
  },
  {
    slug: "backend",
    name: "Backend Engineer",
    description:
      "Designs the services and queues that hold under load, distributed systems, event pipelines, and the cost-aware APIs your AI features depend on.",
    skills: [
      "Python",
      "Go",
      "Distributed systems",
      "Postgres",
      "Redis / Kafka",
      "gRPC",
      "OpenTelemetry",
    ],
    experience: "6–12 yrs",
    icon: "Server",
  },
  {
    slug: "mobile",
    name: "Mobile Engineer",
    description:
      "Ships React Native and Expo apps with native-feeling motion, offline sync, and a clean path through app-store review on both stores.",
    skills: [
      "React Native",
      "Expo",
      "TypeScript",
      "Offline sync",
      "Push & deep linking",
      "EAS build",
    ],
    experience: "5–10 yrs",
    icon: "Smartphone",
  },
  {
    slug: "devops",
    name: "DevOps / Platform Engineer",
    description:
      "Treats reliability as a feature, Kubernetes, IaC, CI/CD, and observability that turns a prototype into something you can put a paying customer on.",
    skills: [
      "AWS",
      "GCP",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Grafana / Prometheus",
      "Cost controls",
    ],
    experience: "6–12 yrs",
    icon: "Cloud",
  },
  {
    slug: "data",
    name: "Data Engineer",
    description:
      "Builds the warehouse, models, and pipelines that feed your dashboards, agents, and LLM evals, clean lineage, tested transforms, no surprises.",
    skills: [
      "dbt",
      "Airflow",
      "Snowflake / BigQuery",
      "Postgres",
      "Python",
      "Spark",
      "Great Expectations",
    ],
    experience: "5–10 yrs",
    icon: "Database",
  },
];
