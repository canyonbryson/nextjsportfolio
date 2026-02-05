import ProjectCard from "@/components/ProjectCard";
import { featuredProjects, archiveProjects } from "@/constants/projects";
import Link from "next/link";

const tradingCards = [
  {
    index: "01 / 04",
    title: "Competitive Advantage",
    oneLiner: "Computational Math Major",
    bullets: [
      "Creative Problem Solving",
      "Pattern Recognition",
      "Abstract Reasoning",
      "Logical Deduction",
      "Attention to Detail",
    ],
    cons: ["I'm a nerd", "Will point out logical inconsistencies"],
  },
  {
    index: "02 / 04",
    title: "High Level Vision",
    oneLiner: "I understand the business perspective",
    bullets: [
      "Good software allows for viral growth, high margins, and low churn",
      "30-50% of software cost is from rework",
      "Technical Debt must be paid off",
      "Following good, reliable patterns is key",
    ],
    cons: ["May not understand assumptions", "Will question the \"why\""],
  },
  {
    index: "03 / 04",
    title: "Programming Philosophy",
    oneLiner: "Rely on repeatable and robust patterns",
    bullets: [
      "Abstracted code reduces uncertainty and rework",
      "Repeatable code reduces the surface area",
      "Reusable code is easier to test and debug",
    ],
    cons: ["Allergic to vague requirements", "Will add types"],
  },
  {
    index: "04 / 04",
    title: "AI Integration",
    oneLiner: "AI is amazing at following patterns",
    bullets: [
      "Meticulously define constraints + guardrails",
      "Provide robust patterns to follow",
      "Consistently evaluate outputs",
      "Adjust prompts and rules whenever AI misperforms",
    ],
    cons: ["Doesn't fully trust AI", "Will repeat a task to test AI models"],
  },
  
];


export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white md:text-6xl lg:text-7xl">
            Canyon Bryson
          </h1>
          <h2 className="text-2xl font-medium text-gray-600 dark:text-gray-400 md:text-3xl lg:text-4xl">
            AI Engineer + Full Stack Developer
          </h2>
        </div>
        <p className="body-large max-w-2xl">Current Position: Lead Engineer at ORTHOATHLETE</p>
      </section>

      {/* Trading Cards */}
      <section className="-mx-6 px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
          {tradingCards.map((card) => (
            <article
              key={card.index}
              className="card flex flex-col"
            >
              <span className="card-index">{card.index}</span>
              <h3 className="h2-card mt-3">{card.title}</h3>
              
              <p className="h3-card mt-2">{card.oneLiner}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {card.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-base text-gray-700 dark:text-gray-300"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="cons-strip">
                <span className="text-gray-400 dark:text-gray-600">Cons:</span>{" "}
                {card.cons.map((con, i) => (
                  <span key={i} className="cons-chip">
                    {con}
                    {i < card.cons.length - 1 && " · "}
                  </span>
                ))}
              </div>
            </article>
          ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-6">
        <h2 className="h2-section">Featured Projects</h2>
        <div className="grid gap-6 md:grid-cols-1">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} featured />
          ))}
        </div>
      </section>

      {/* Project Archive Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="h2-section">More Projects</h2>
          <Link
            href="/projects"
            className="text-sm font-medium text-accent hover:underline"
          >
            View all {archiveProjects.length + featuredProjects.length}+ projects →
          </Link>
        </div>
        <p className="body-base">
          Beyond the flagship projects above, I&apos;ve built healthcare data
          pipelines, sports analytics tools, mobile apps, and experimental ML
          demos.
        </p>
      </section>
    </div>
  );
}
