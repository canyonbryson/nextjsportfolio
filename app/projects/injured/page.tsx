import CaseStudyTLDR from "@/components/CaseStudyTLDR";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import Link from "next/link";

export const metadata = {
  title: "INJURED Case Study | Canyon Bryson",
  description:
    "Expo React Native athlete recovery platform with AI-driven MRI analysis and real-time care coordination.",
};

const stack = [
  "Expo",
  "React Native",
  "TypeScript",
  "Convex",
  "Clerk",
  "OpenRouter",
];

const architectureLayers = [
  { name: "Expo Router", description: "File-based navigation" },
  { name: "OpenRouter", description: "Custom AI tools and automation" },
  { name: "Clerk Auth", description: "User & org sessions" },
  { name: "Convex", description: "Real-time backend" },
  { name: "i18n", description: "EN, ES, ZH-CN" },
  { name: "Expo Push", description: "Notifications" },
];

const features = [
  {
    title: "AI MRI Report Analysis",
    description:
      "Custom AI pipeline parses radiology reports into structured insights. Extracts injury details, severity classifications, and generates personalized recovery recommendations.",
  },
  {
    title: "Custom AI Tools",
    description:
      "OpenRouter integration enables custom AI workflows and automation. Real-time streaming responses for injury analysis, recovery guidance, and patient-provider communication.",
  },
  {
    title: "Real-time Sync",
    description:
      "Convex provides instant data synchronization across devices. Injury updates, messages, and recovery progress sync in real-time without polling.",
  },
  {
    title: "Multi-language Support",
    description:
      "Type-safe i18n system supporting English, Spanish, and Chinese. Fallback handling ensures graceful degradation for missing translations.",
  },
];

const aiCapabilities = [
  "MRI report parsing and structured extraction",
  "Injury severity classification",
  "Recovery timeline generation",
  "Personalized exercise recommendations",
  "Real-time AI chat assistance",
  "Automated appointment reminders",
];

const decisions = [
  {
    title: "Custom AI pipeline for MRI analysis",
    description:
      "Built a multi-stage AI pipeline using OpenRouter to parse radiology reports. First extracts structured entities (injuries, locations, severity), then classifies overall injury status, and finally generates recovery guidance. Each stage uses JSON mode for reliable parsing.",
    tradeoff:
      "More API calls and higher latency, but dramatically better accuracy than single-prompt approaches and easier to debug individual stages.",
  },
  {
    title: "OpenRouter for flexible AI tooling",
    description:
      "Chose OpenRouter over direct OpenAI SDK for access to multiple models and custom tool definitions. Enables switching models per use case and building specialized AI workflows without vendor lock-in.",
    tradeoff:
      "Additional abstraction layer, but provides flexibility to optimize costs and performance across different AI tasks.",
  },
  {
    title: "Convex for real-time state",
    description:
      "Chose Convex over traditional REST APIs for its built-in real-time subscriptions. Injury tracking requires instant updates when providers add notes or recovery plans change.",
    tradeoff:
      "Vendor dependency and learning curve, but eliminates WebSocket boilerplate and provides optimistic updates out of the box.",
  },
  {
    title: "Type-safe i18n architecture",
    description:
      "Custom translation system with enum-based keys and TypeScript inference. Compile-time errors catch missing translations before runtime.",
    tradeoff:
      "More boilerplate than string-based systems, but prevents translation bugs and improves developer experience.",
  },
];

const screenshots = [
  {
    src: "/assets/images/injured/home.png",
    alt: "INJURED home screen",
    caption: "Home dashboard",
  },
  {
    src: "/assets/images/injured/askAI.png",
    alt: "AI assistant interface",
    caption: "AI assistant",
  },
  {
    src: "/assets/images/injured/ReportAnalysis.png",
    alt: "Report analysis view",
    caption: "Report analysis",
  },
  {
    src: "/assets/images/injured/ReportAnalysis2.png",
    alt: "Report analysis second view",
    caption: "Report analysis 2",
  },
  {
    src: "/assets/images/injured/appointments.png",
    alt: "Appointments screen",
    caption: "Appointments",
  },
  {
    src: "/assets/images/injured/Roadmap.png",
    alt: "Recovery roadmap",
    caption: "Recovery roadmap",
  },
];

const improvements = [
  "Fine-tune models on common radiology report formats for better accuracy",
  "Add image-based analysis for X-rays and MRIs via vision models",
  "Implement caching for similar report patterns to reduce latency",
  "Build evaluation suite with ground-truth labeled reports",
];

export default function InjuredCaseStudy() {
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
          <h1 className="h1-hero">INJURED</h1>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            Expo React Native
          </span>
        </div>
        <p className="body-large">
          End-to-end athlete recovery platform with AI MRI analysis, real-time
          provider collaboration, and multilingual support across mobile.
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
              Built a mobile-first recovery platform that centralizes injury
              tracking, provider communication, and MRI report analysis for
              athletes and care teams. The system replaces fragmented workflows
              with real-time data, automated insights, and guided recovery plans.
            </p>
            <p className="body-base">
              INJURED consolidates injury tracking, provider communication, and
              AI-powered recovery guidance into a single mobile experience. The
              app uses custom AI tools to parse MRI reports, extract structured
              injury data, and generate personalized recovery plans.
            </p>
          </section>

          {/* Architecture */}
          <section className="space-y-4">
            <h2 className="h2-section">Architecture</h2>
            <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
              <div className="grid gap-3 sm:grid-cols-2">
                {architectureLayers.map((layer) => (
                  <div key={layer.name} className="text-sm">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {layer.name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {" "}
                      — {layer.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="body-base">
              Expo Router handles navigation, Clerk handles authentication, and
              Convex powers real-time state. OpenRouter enables custom AI tools
              and workflows, including MRI report analysis and recovery guidance.
            </p>
          </section>

          {/* Core Features */}
          <section className="space-y-4">
            <h2 className="h2-section">Core Features</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <li
                  key={feature.title}
                  className="rounded-lg border border-gray-200 bg-white p-4 text-sm dark:border-gray-800 dark:bg-gray-900"
                >
                  <span className="font-medium text-gray-900 dark:text-white">
                    {feature.title}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {" "}
                    — {feature.description}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* AI Capabilities */}
          <section className="space-y-4">
            <h2 className="h2-section">AI Capabilities</h2>
            <p className="body-base">
              Custom AI tools built with OpenRouter handle MRI report parsing,
              injury analysis, and recovery planning. The system uses structured
              output modes and multi-stage pipelines for reliable, accurate
              results.
            </p>
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                AI Features
              </h4>
              <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                {aiCapabilities.map((capability, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {capability}
                  </li>
                ))}
              </ul>
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

          {/* Screenshots */}
          <section className="space-y-4">
            <h2 className="h2-section">Screenshots</h2>
            <ScreenshotGallery screenshots={screenshots} columns={3} />
          </section>
        </div>

        {/* TL;DR Sidebar */}
        <div className="lg:order-last">
          <CaseStudyTLDR
            problem="Athletes lack a unified way to track injuries, communicate with providers, and understand recovery"
            role="Lead Engineer • Full stack + AI"
            timeframe="Ongoing (active development)"
            notable={[
              "Custom AI MRI report analysis",
              "Multi-stage AI parsing pipeline",
              "Real-time sync with Convex",
              "OpenRouter for flexible AI tooling",
            ]}
          />
        </div>
      </div>
    </div>
  );
}
