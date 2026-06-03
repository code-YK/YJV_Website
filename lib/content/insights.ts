export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  /** Article body as an array of paragraphs. */
  body: string[];
}

/**
 * Placeholder editorial entries — field notes from the engine room. The bodies
 * are short illustrative drafts, not finished articles; replace with real posts
 * when the content exists.
 */
export const insights: Insight[] = [
  {
    slug: "multi-agent-orchestration-in-production",
    title: "Multi-agent orchestration in production",
    excerpt:
      "What actually breaks when you move from a single LLM call to a graph of agents — and the guardrails that keep it from spiralling.",
    category: "Architecture",
    readTime: "7 min",
    date: "May 2026",
    body: [
      "A single LLM call is easy to reason about: one prompt, one response, one place to look when it goes wrong. The moment you wire several agents into a graph — a router, a few specialists, a critic — the failure surface explodes. Latency compounds, errors cascade, and a confident-but-wrong intermediate step quietly poisons everything downstream.",
      "The fix is not a smarter model; it is boring infrastructure. Every agent action is logged with its full input and output so any run can be replayed. State transitions are explicit, not implied. And the graph has hard stops — a step that can't validate its own output hands control back rather than guessing.",
      "Most importantly, anything with revenue, PR, or compliance risk sits behind a human-in-the-loop gate. Autonomy is a dial, not a switch: you earn each notch by proving the workflow behaves under adversarial input, and you wire evals into CI so a regression is caught before it reaches a customer.",
    ],
  },
  {
    slug: "when-rag-beats-fine-tuning",
    title: "When RAG beats fine-tuning (and when it doesn't)",
    excerpt:
      "A decision framework for grounding models in your data without lighting money on fire.",
    category: "AI Engineering",
    readTime: "6 min",
    date: "Apr 2026",
    body: [
      "Teams reach for fine-tuning because it feels like the serious option. Usually it's the expensive one. If the problem is 'the model doesn't know our facts,' retrieval-augmented generation is almost always the cheaper, faster, more maintainable answer — the knowledge lives in a store you can update in seconds, not a checkpoint you have to retrain.",
      "Fine-tuning earns its keep when you need to change behaviour, not knowledge: a consistent tone, a strict output format, a domain skill the base model genuinely lacks. Even then, start with retrieval plus a tight prompt and only fine-tune once you've proven the ceiling.",
      "The decision rule we use: facts → RAG, format/behaviour → consider fine-tuning, and measure both against an eval set before committing. Whatever you choose, instrument it — without traces you're optimising blind.",
    ],
  },
  {
    slug: "human-in-the-loop-gates",
    title: "Designing human-in-the-loop gates",
    excerpt:
      "Where to put approval checkpoints in an autonomous workflow so revenue, PR, and compliance risk never run unattended.",
    category: "Workflows",
    readTime: "5 min",
    date: "Apr 2026",
    body: [
      "Full autonomy is rarely the goal. The goal is leverage with a safety margin. The art is placing approval gates exactly where the downside is irreversible — sending money, publishing publicly, deleting data, contacting a regulator — and nowhere else, so humans aren't drowned in rubber-stamp clicks.",
      "A good gate carries context: the action proposed, the agent's reasoning, the inputs it read, and a one-click approve / edit / reject. The cheapest way to lose trust is a gate that asks 'are you sure?' without telling the human what they're being sure about.",
      "Over time, gates that approve at 99%+ become candidates for automation, and gates that surprise reviewers become candidates for more scrutiny. The checkpoint set is a living thing, tuned from real decisions — not a config you set once and forget.",
    ],
  },
  {
    slug: "evals-from-sprint-one",
    title: "Why we wire evals in from sprint one",
    excerpt:
      "Regression-proofing agent behaviour with trace-based evals before a single feature ships to production.",
    category: "Quality",
    readTime: "8 min",
    date: "Mar 2026",
    body: [
      "Agent systems don't fail loudly. They drift. A prompt tweak that fixes one case silently breaks five others, and without a harness you find out from a customer. So evals go in during sprint one, before the system is even interesting — a small golden set that grows every time something surprises us.",
      "Trace-based evaluation means scoring the whole decision path, not just the final answer. Did the router pick the right specialist? Did the retrieval pull relevant context? A correct output via a broken path is a latent bug waiting for new input.",
      "Wired into CI, the eval suite turns 'I think this is better' into a number. Regressions get caught before merge, and shipping becomes a measured decision rather than a hopeful one.",
    ],
  },
  {
    slug: "pii-scrubbing-before-the-prompt",
    title: "PII scrubbing before the prompt leaves your VPC",
    excerpt:
      "A pragmatic pattern for keeping sensitive data out of third-party model calls.",
    category: "Security",
    readTime: "6 min",
    date: "Mar 2026",
    body: [
      "The simplest data-leak in an AI workflow is the one nobody designed: a customer record passed verbatim into a third-party model call. The pragmatic defence is a scrubbing layer at the VPC boundary that detects and redacts PII before any prompt leaves your control.",
      "Detection runs on a Presidio-style pipeline — names, emails, card numbers, identifiers — replacing them with stable tokens the model can still reason about. The mapping stays inside your perimeter, so responses can be re-hydrated on the way back without the raw data ever crossing the wire.",
      "It isn't free: redaction can strip context the model needed, so you tune the policy per workflow and test that scrubbed prompts still produce useful answers. The goal is the smallest blast radius that keeps the system working.",
    ],
  },
  {
    slug: "cost-aware-model-routing",
    title: "Cost-aware model routing with LiteLLM",
    excerpt:
      "Switching between OpenAI, Anthropic, and open-source models per task to cut spend without cutting quality.",
    category: "Infrastructure",
    readTime: "5 min",
    date: "Feb 2026",
    body: [
      "Not every task needs your most expensive model. Classification, extraction, and routing often run beautifully on smaller or open-source models at a fraction of the cost; only the genuinely hard reasoning steps justify the frontier tier.",
      "A routing layer like LiteLLM lets you express that as policy: cheap model first, escalate on low confidence, fall back across providers on rate limits or outages. The application code stays provider-agnostic, so swapping models is a config change, not a refactor.",
      "The payoff is twofold — a materially lower bill, and resilience: when one provider has a bad day, the workflow keeps running on another instead of falling over.",
    ],
  },
];
