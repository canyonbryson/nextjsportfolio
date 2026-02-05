import CaseStudyTLDR from "@/components/CaseStudyTLDR";
import Link from "next/link";

export const metadata = {
  title: "AskDB Case Study | Canyon Bryson",
  description:
    "Natural language to SQL interface with safety guardrails. Talk to your database.",
};

const stack = ["Next.js", "TypeScript", "OpenAI", "PostgreSQL", "Tailwind CSS"];

const queryFlow = [
  {
    step: 1,
    label: "Question",
    example: '"How many users signed up this month?"',
    highlight: false,
  },
  {
    step: 2,
    label: "Schema Introspection",
    example: "Tables, columns, relationships",
    highlight: false,
  },
  {
    step: 3,
    label: "AI SQL Generation",
    example: "GPT-4 with few-shot examples",
    highlight: true,
  },
  {
    step: 4,
    label: "Read-only Execution",
    example: "SELECT-only permissions",
    highlight: false,
  },
  {
    step: 5,
    label: "Results + Explanation",
    example: "Data with plain-English summary",
    highlight: false,
  },
];

const constraints = [
  "Safety: Generated SQL must never modify data or expose sensitive information",
  "Accuracy: Wrong queries waste time; users need to trust the results",
  "Schema complexity: Must handle diverse database schemas without manual configuration",
  "Latency: Natural conversation requires sub-2-second response times",
  "Explainability: Users should understand what query was run and why",
];

const safetyLayers = [
  {
    layer: "Database Level",
    description: "Read-only user with SELECT-only permissions",
    icon: "🔒",
  },
  {
    layer: "Query Validation",
    description: "Regex patterns block dangerous keywords",
    icon: "🛡️",
  },
  {
    layer: "Schema Filtering",
    description: "Sensitive tables excluded from introspection",
    icon: "👁️",
  },
];

const decisions = [
  {
    title: "Read-only connection enforcement",
    description:
      "Database connections use a read-only user with SELECT-only permissions. Even if the AI generates a DROP TABLE, the database rejects it. Defense in depth.",
    tradeoff:
      "Can't support write operations even when legitimately needed, but eliminates entire category of risk.",
  },
  {
    title: "Schema introspection + few-shot examples",
    description:
      "Before generating SQL, the system introspects the database schema and includes relevant table/column info in the prompt. Combined with few-shot examples of good queries for the specific schema.",
    tradeoff:
      "Larger prompts = more tokens = higher cost (~$0.02/query), but dramatically better query accuracy.",
  },
  {
    title: "Query explanation alongside results",
    description:
      "Every response includes the generated SQL with syntax highlighting and a plain-English explanation of what it does. Users can verify before trusting the data.",
    tradeoff:
      "More verbose output, but builds trust and helps users learn SQL patterns.",
  },
];

const codeExample = `-- Generated SQL (read-only)
SELECT COUNT(*) as signups
FROM users
WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)
  AND created_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month';

-- Explanation: Counts all users created in the current
-- calendar month using PostgreSQL date functions.`;

const improvements = [
  "Add query history and favorites",
  "Implement chart/visualization generation for aggregate queries",
  "Support for multiple database types (MySQL, SQLite)",
  "Add collaborative features for team query sharing",
];

export default function AskDBCaseStudy() {
  return (
    <div className="space-y-10">
      {/* Back Link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Projects
      </Link>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="h1-hero">AskDB</h1>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            Side Project
          </span>
        </div>
        <p className="body-large">
          Talk to your database in plain English. Natural language to SQL with
          safety guardrails.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <span key={tech} className="stack-tag">
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* Main Content with TL;DR sidebar */}
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-10">
          {/* Problem & Context */}
          <section className="space-y-4">
            <h2 className="h2-section">Problem &amp; Context</h2>
            <p className="body-base">
              Non-technical team members constantly ask developers for
              &quot;quick queries.&quot; Product managers need user counts,
              support needs ticket stats, marketing needs conversion data. Each
              request interrupts deep work.
            </p>
            <p className="body-base">
              AskDB lets anyone query a database by asking questions in plain
              English. The AI generates safe, read-only SQL and returns results
              with explanations. No SQL knowledge required.
            </p>
          </section>

          {/* Constraints */}
          <section className="space-y-4">
            <h2 className="h2-section">Constraints</h2>
            <ul className="space-y-3">
              {constraints.map((constraint, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  <span className="text-sm">{constraint}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Solution Overview - Query Flow */}
          <section className="space-y-4">
            <h2 className="h2-section">Solution Overview</h2>
            <ol className="grid gap-3 sm:grid-cols-2">
              {queryFlow.map((step) => (
                <li
                  key={step.step}
                  className={`rounded-lg border p-4 text-sm ${
                    step.highlight
                      ? "border-accent bg-accent/5"
                      : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
                  }`}
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    {step.step}. {step.label}
                  </div>
                  <div className="mt-1 text-gray-600 dark:text-gray-400">
                    {step.example}
                  </div>
                </li>
              ))}
            </ol>
            <p className="body-base">
              User asks a question → system introspects schema → OpenAI
              generates SQL → query runs on read-only connection → results
              displayed with the SQL and explanation.
            </p>
          </section>

          {/* Safety Layers */}
          <section className="space-y-4">
            <h2 className="h2-section">Safety Architecture</h2>
            <ul className="grid gap-3 sm:grid-cols-3">
              {safetyLayers.map((layer) => (
                <li
                  key={layer.layer}
                  className="rounded-lg border border-gray-200 bg-white p-4 text-sm dark:border-gray-800 dark:bg-gray-900"
                >
                  <span className="font-medium text-gray-900 dark:text-white">
                    {layer.layer}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {" "}
                    — {layer.description}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Code Example */}
          <section className="space-y-4">
            <h2 className="h2-section">Example Output</h2>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-900 dark:border-gray-700">
              <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-800 px-4 py-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-400">
                  Generated Query
                </span>
              </div>
              <pre className="overflow-x-auto p-4 text-sm text-gray-300">
                <code>{codeExample}</code>
              </pre>
            </div>
          </section>

          {/* Key Decisions */}
          <section className="space-y-6">
            <h2 className="h2-section">Key Decisions</h2>
            {decisions.map((decision, i) => (
              <div key={i} className="space-y-2 border-l-2 border-accent pl-4">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {decision.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {decision.description}
                </p>
                <p className="text-sm italic text-gray-500">
                  Tradeoff: {decision.tradeoff}
                </p>
              </div>
            ))}
          </section>

          {/* What I'd Improve */}
          <section className="space-y-4">
            <h2 className="h2-section">What I&apos;d Improve</h2>
            <ul className="space-y-2">
              {improvements.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* TL;DR Sidebar */}
        <div className="lg:order-last">
          <CaseStudyTLDR
            problem="Non-technical team members constantly interrupt developers for 'quick queries'"
            role="Solo developer • Side project"
            timeframe="2 weeks initial build"
            notable={[
              "Natural language to safe SQL",
              "Multi-layer security enforcement",
              "Query explanation builds trust",
              "Sub-2s response times",
            ]}
            links={{
              demo: "https://askdb.useswiftcode.com",
            }}
          />
        </div>
      </div>
    </div>
  );
}
