import CaseStudyTLDR from "@/components/CaseStudyTLDR";
import Link from "next/link";

export const metadata = {
  title: "OrthoHCP Case Study | Canyon Bryson",
  description:
    "Healthcare professional onboarding platform with AI interviews, media portfolios, and Supabase infrastructure.",
};

const stack = [
  "Flutter",
  "Next.js 15",
  "React 19",
  "TypeScript",
  "Supabase",
  "OpenAI (Realtime)",
];

const metrics = [
  { value: "2", unit: "apps", label: "Flutter + Next.js" },
  { value: "8", unit: "roles", label: "Role-based access" },
  { value: "5", unit: "buckets", label: "Media storage" },
];

const constraints = [
  "Multi-platform delivery: Flutter mobile + Next.js web",
  "Secure access: RLS, JWT sessions, and signed URLs",
  "Media-heavy workflows: video interviews, portfolios, and documents",
  "Realtime UX: live updates and upload status tracking",
  "Healthcare-grade onboarding: clear, guided profile creation",
];

const pipelineSteps = [
  {
    step: 1,
    title: "Profile setup",
    description: "Multi-step onboarding for roles, specialties, and bio",
  },
  {
    step: 2,
    title: "Face alignment",
    description: "Guided positioning for consistent interviews",
  },
  {
    step: 3,
    title: "Interview playback",
    description: "AI-generated questions via TTS or prerecorded audio",
  },
  {
    step: 4,
    title: "Video recording",
    description: "High-quality capture with retries and progress tracking",
  },
  {
    step: 5,
    title: "Transcription",
    description: "Live speech-to-text during interviews",
  },
  {
    step: 6,
    title: "Upload & processing",
    description: "Secure storage, metadata tagging, and media organization",
  },
];

const decisions = [
  {
    title: "Supabase as the backend backbone",
    description:
      "Used Supabase for Postgres + RLS, authentication, real-time subscriptions, and storage. Edge Functions handle AI interview orchestration and secure server-side logic.",
    tradeoff:
      "Leans on platform features and conventions, but dramatically accelerates delivery and reduces infrastructure overhead.",
  },
  {
    title: "WebRTC-powered AI interviews",
    description:
      "Real-time OpenAI interviews run over WebRTC with live speech-to-text and text-to-speech. Interview state is coordinated through Riverpod providers on mobile.",
    tradeoff:
      "More complex client logic, but delivers a natural interview experience and higher quality responses.",
  },
  {
    title: "Two-front-end strategy",
    description:
      "Flutter powers the cross-platform app while Next.js provides the web dashboard. Shared Supabase auth keeps accounts consistent across devices.",
    tradeoff:
      "More surface area to maintain, but enables a best-in-class mobile experience and a polished web portal.",
  },
];

const technicalHighlights = [
  {
    title: "Row Level Security",
    description:
      "RLS policies ensure each user only accesses their own profiles, interviews, and media.",
  },
  {
    title: "Media storage organization",
    description:
      "Dedicated buckets for videos, images, documents, audios, and general media.",
  },
  {
    title: "Realtime updates",
    description:
      "Supabase Realtime keeps profile status and upload progress synced.",
  },
];

const improvements = [
  "Expand interview templates by specialty",
  "Add richer analytics dashboards in the web portal",
  "Introduce automated media QA checks for uploads",
  "Ship additional profile types beyond OrthoPatient/Athlete",
];

export default function OrthoHCPCaseStudy() {
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
          <h1 className="h1-hero">OrthoHCP</h1>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            Healthcare onboarding platform
          </span>
        </div>
        <p className="body-large">
          Comprehensive onboarding for Orthopedic Surgeons, Physical Therapists,
          Trainers, and other HCPs with AI-powered video interviews and media
          portfolios.
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
              Try the App
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Available on iOS and Android
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a 
              href="https://apps.apple.com/us/app/ortho-hcp/id6740589322" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary inline-flex items-center gap-2 whitespace-nowrap"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              App Store
            </a>
            <a 
              href="https://play.google.com/store/apps/details?id=com.orthohcp.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary inline-flex items-center gap-2 whitespace-nowrap"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
              </svg>
              Google Play
            </a>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
              {metric.value}
            </span>
            <span className="text-gray-500">{metric.unit}</span>
            <span className="text-gray-500">— {metric.label}</span>
          </div>
        ))}
      </div>

      {/* Main Content with TL;DR sidebar */}
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-10">
          {/* Problem & Context */}
          <section className="space-y-4">
            <h2 className="h2-section">Problem &amp; Context</h2>
            <p className="body-base">
              Ortho Marketing needed a scalable way to onboard healthcare
              professionals with rich profiles, interviews, and media portfolios.
              Existing workflows were manual and fragmented, making it hard to
              standardize quality and move candidates through approval.
            </p>
            <p className="body-base">
              OrthoHCP unifies onboarding into a structured, multi-step profile
              flow with AI interviews, storage-backed media uploads, and real-time
              updates across mobile and web.
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

          {/* Solution Overview - Pipeline */}
          <section className="space-y-4">
            <h2 className="h2-section">Solution Overview</h2>
            <ol className="grid gap-3 sm:grid-cols-2">
              {pipelineSteps.map((step) => (
                <li
                  key={step.step}
                  className="rounded-lg border border-gray-200 bg-white p-4 text-sm dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    {step.step}. {step.title}
                  </div>
                  <div className="mt-1 text-gray-600 dark:text-gray-400">
                    {step.description}
                  </div>
                </li>
              ))}
            </ol>
            <p className="body-base">
              The platform guides HCPs through profile creation, runs AI
              interviews in real time, and organizes all media in Supabase
              storage for easy review and approval workflows.
            </p>
          </section>

          {/* Technical Highlights */}
          <section className="space-y-4">
            <h2 className="h2-section">Technical Highlights</h2>
            <ul className="grid gap-3 sm:grid-cols-3">
              {technicalHighlights.map((highlight) => (
                <li
                  key={highlight.title}
                  className="rounded-lg border border-gray-200 bg-white p-4 text-sm dark:border-gray-800 dark:bg-gray-900"
                >
                  <span className="font-medium text-gray-900 dark:text-white">
                    {highlight.title}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {" "}
                    — {highlight.description}
                  </span>
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
        </div>

        {/* TL;DR Sidebar */}
        <div className="lg:order-last">
          <CaseStudyTLDR
            problem="Manual onboarding made it hard to standardize HCP profiles and interviews"
            role="Lead developer • Full stack + AI"
            timeframe="Multi-platform launch"
            notable={[
              "Flutter + Next.js apps",
              "Supabase RLS + Realtime",
              "WebRTC AI interviews",
              "Structured media storage",
            ]}
            links={{
              demo: "https://play.google.com/store/apps/details?id=com.orthohcp.app",
            }}
          />
        </div>
      </div>
    </div>
  );
}
