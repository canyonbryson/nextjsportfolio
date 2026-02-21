import CaseStudyTLDR from "@/components/CaseStudyTLDR";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import Link from "next/link";

const screenshots = [
  { src: "/assets/images/budget/1000002188.png", alt: "Grocery Budget dashboard", caption: "Dashboard" },
  { src: "/assets/images/budget/1000002189.png", alt: "Budget allocation screen", caption: "Budget" },
  { src: "/assets/images/budget/1000002190.png", alt: "Transactions list", caption: "Transactions" },
  { src: "/assets/images/budget/1000002191.png", alt: "Receipt capture and review", caption: "Receipts" },
  { src: "/assets/images/budget/1000002192.png", alt: "Meal plan and recipes", caption: "Meals" },
  { src: "/assets/images/budget/1000002194.png", alt: "App settings", caption: "Settings" },
];

export const metadata = {
  title: "Grocery Budget Case Study | Canyon Bryson",
  description:
    "Budgeting and meal-planning app with Plaid banking, receipt parsing, AI categorization, and envelope-style budgets.",
};

const stack = [
  "React Native + Expo",
  "TypeScript",
  "OpenAI",
  "Convex",
  "Clerk",
  "Plaid",
];

const pillars = [
  {
    title: "Auto-budgeting from bank transactions",
    description:
      "Plaid integration with envelope-style budgets, parent + subcategory hierarchy, transfer tracking, and rule/AI-assisted categorization.",
  },
  {
    title: "Receipt → items + grocery subcategories",
    description:
      "Camera capture, AI receipt parsing, item-level categorization, and linking receipts to transactions to split grocery spend.",
  },
  {
    title: "Recipe → ingredients → cost-per-serving",
    description:
      "URL ingestion, manual entry, saved recipes, weekly meal plan with slots, and AI-generated shopping list with pricing.",
  },
];

const categorizationPipeline = [
  {
    step: 1,
    label: "User rule cache",
    detail: "Fuzzy merchant match — wins over everything",
    highlight: true,
  },
  {
    step: 2,
    label: "Deterministic mapping",
    detail: "MCC codes, keywords",
    highlight: false,
  },
  {
    step: 3,
    label: "AI fallback",
    detail: "Only when unknown merchant and no MCC mapping",
    highlight: false,
  },
];

const screens = [
  { tab: "Dashboard", purpose: "Spend vs budget, alerts, sync/scan quick actions" },
  { tab: "Budget", purpose: "Period selector, allocations, rollover config" },
  { tab: "Transactions", purpose: "List, filters, category picker, receipt link suggestions" },
  { tab: "Receipts", purpose: "Needs review, linked/unlinked, edit parsed fields" },
  { tab: "Meals", purpose: "Meal plan, recipes, shopping list" },
  { tab: "Settings", purpose: "Account, plan, notifications, household" },
];

const decisions = [
  {
    title: "Guest mode with local-only storage",
    description:
      "Anonymous users get full manual functionality via expo-sqlite (budgets, transactions, recipes, meal plan) without Convex or Plaid. On sign-in, merge flow uploads local data with local-wins conflict resolution.",
    tradeoff:
      "No offline write queue in MVP; signed-in users require connectivity for writes.",
  },
  {
    title: "Categorization priority: rules > deterministic > AI",
    description:
      "User merchant rules (fuzzy match) always win. MCC/keyword mapping next. AI only for unknown merchants with no mapping. Manual categorization auto-creates fuzzy rules for future transactions.",
    tradeoff:
      "AI calls are minimized and reserved for paid tier, reducing cost and latency.",
  },
  {
    title: "Receipt linking with mismatch tolerance",
    description:
      "Link by time, store, and total. Within 5% tolerance allows link but flags for review. Linked receipts split grocery transactions into subcategory allocations; unlinked receipts do not affect budgets.",
    tradeoff:
      "Some false matches possible; review UX handles flagged cases.",
  },
  {
    title: "Cost-per-serving from receipt history first",
    description:
      "Pricing priority: (1) most recent purchase within 30 days from receipts, (2) AI web search. Free tier: user selects match; paid: AI suggests, flags uncertain for review.",
    tradeoff:
      "Accuracy depends on receipt history quality; newer users get more web-sourced estimates.",
  },
];

const aiTasks = [
  "Transaction categorization fallback",
  "Receipt OCR + parse (image → structured receipt)",
  "Item normalization (raw → canonical)",
  "Recipe URL ingestion",
  "Recipe cost-per-serving estimation",
  "Shopping list generation from meal plan",
];

const improvements = [
  "Offline write queue for signed-in users",
  "Pantry tracking with auto-consumption from recipes",
  "Benchmarking (50th percentile spend) using anonymized opt-in data",
  "Store routing optimization for shopping lists",
  "Data export",
];

export default function BudgetProjectPage() {
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
          <h1 className="h1-hero">Grocery Budget</h1>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            Expo React Native
          </span>
        </div>
        <p className="body-large">
          Budgeting and meal-planning app: auto-budget from bank transactions
          (Plaid), receipt parsing with grocery subcategory splits, recipes with
          cost-per-serving, and AI-generated shopping lists.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <span key={tech} className="stack-tag">
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* Demo CTA Card */}
      <div className="card border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              View the Code
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              React Native + Expo on GitHub
            </p>
          </div>
          <a
            href="https://github.com/canyonbryson/budgetmoney"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 whitespace-nowrap"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>

      {/* Main Content with TL;DR sidebar */}
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-10">
          {/* Problem & Context */}
          <section className="space-y-4">
            <h2 className="h2-section">Problem &amp; Context</h2>
            <p className="body-base">
              Grocery spending is hard to track and plan. Manual budgeting is
              tedious; bank feeds don&apos;t tell you what you bought or how it
              maps to meals. Receipts pile up. Meal planning and shopping
              lists live in separate tools.
            </p>
            <p className="body-base">
              Grocery Budget unifies envelope-style budgeting (with Plaid
              auto-import), receipt capture and itemization, recipes with
              cost-per-serving, weekly meal planning, and AI-generated shopping
              lists. Receipts can link to bank transactions and split grocery
              spend into subcategories (e.g., Costco vs household vs eating
              out).
            </p>
          </section>

          {/* Core Pillars */}
          <section className="space-y-4">
            <h2 className="h2-section">Core Pillars</h2>
            <ul className="space-y-3">
              {pillars.map((pillar) => (
                <li
                  key={pillar.title}
                  className="rounded-lg border border-gray-200 bg-white p-4 text-sm dark:border-gray-800 dark:bg-gray-900"
                >
                  <span className="font-medium text-gray-900 dark:text-white">
                    {pillar.title}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {" "}
                    — {pillar.description}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Categorization Pipeline */}
          <section className="space-y-4">
            <h2 className="h2-section">Categorization Pipeline</h2>
            <p className="body-base">
              Transactions are categorized by strict priority: user rules first,
              deterministic mappings second, AI only as last resort.
            </p>
            <ol className="grid gap-3 sm:grid-cols-3">
              {categorizationPipeline.map((item) => (
                <li
                  key={item.step}
                  className={`rounded-lg border p-4 text-sm ${
                    item.highlight
                      ? "border-accent bg-accent/5"
                      : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
                  }`}
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    {item.step}. {item.label}
                  </div>
                  <div className="mt-1 text-gray-600 dark:text-gray-400">
                    {item.detail}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* App Screens */}
          <section className="space-y-4">
            <h2 className="h2-section">App Structure</h2>
            <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
              <div className="grid gap-3 sm:grid-cols-2">
                {screens.map((s) => (
                  <div key={s.tab} className="text-sm">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {s.tab}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {" "}
                      — {s.purpose}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* AI Tasks */}
          <section className="space-y-4">
            <h2 className="h2-section">AI System (Paid Tier)</h2>
            <p className="body-base">
              Every AI output stores confidence scores, sources (receipt vs web),
              and rationale. Low-confidence fields require review. User edits
              feed back into rules and caches.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {aiTasks.map((task, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {task}
                </li>
              ))}
            </ul>
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

          {/* Screenshots */}
          <section className="space-y-4">
            <h2 className="h2-section">Screenshots</h2>
            <ScreenshotGallery screenshots={screenshots} columns={3} />
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
            problem="Grocery spend is hard to track; budgeting, receipts, and meal planning live in silos"
            role="Developer"
            timeframe="MVP in progress"
            notable={[
              "Envelope budgets + Plaid",
              "Receipt → grocery subcategory splits",
              "Recipe cost-per-serving + AI shopping list",
              "Guest mode → merge on sign-in",
            ]}
            links={{
              demo: "https://github.com/canyonbryson/budgetmoney",
            }}
          />
        </div>
      </div>
    </div>
  );
}
