export const metadata = {
  title: "Resume | Canyon Bryson",
  description:
    "AI Engineer and Full-Stack Developer with 7 years experience shipping production systems.",
};

const competencies = {
  "Core Strengths": [
    "Computational math + CS foundation",
    "AI/ML product builder",
    "Full-stack delivery",
    "Product-first engineering",
    "Detail-oriented execution",
    "Fast learner",
  ],
  "AI/ML": ["LLM integration", "Prompt engineering", "RAG systems", "ML pipelines"],
  "Full Stack": ["Next.js / React", "TypeScript", "Node.js", "PostgreSQL"],
  Infrastructure: ["AWS", "Vercel", "Docker", "CI/CD"],
  Practices: ["System design", "Technical documentation", "Code review"],
};

const experience = [
  {
    role: "Lead Engineer",
    company: "ORTHOATHLETE",
    period: "2024 – Present",
    highlights: [
      "Built INJURED: AI-powered recovery platform across web + mobile",
      "Shipped OrthoHCP video interviewer in 30 days from zero to production",
      "Developed OrthoAgent + OrthoData for AI testing and data pipelines",
      "Led OrthoAthlete and OrthoPatient apps end-to-end",
    ],
  },
  {
    role: "Road Rally Developer",
    company: "Riddler Road Rally",
    period: "2024",
    highlights: [
      "Sole developer for interactive scavenger hunt platform",
      "Built web app (Astro + SolidJS) and mobile app (React Native)",
      "Implemented real-time multiplayer features with serverless AWS",
    ],
  },
  {
    role: "AIDIA Developer",
    company: "AIDIA",
    period: "2022 – 2024",
    highlights: [
      "Full-stack development across React, Astro, and SolidJS",
      "Built custom image recognition systems and mobile apps",
      "Shipped event-driven task management and automation tools",
    ],
  },
  {
    role: "USU Networking Developer",
    company: "Utah State University",
    period: "2023 – 2024",
    highlights: [
      "Built internal tools using Django, React, and Next.js",
      "Developed software for the networking team",
      "Managed PostgreSQL database systems",
    ],
  },
  {
    role: "USU BioTech Research Assistant",
    company: "Utah State University",
    period: "2020 – 2023",
    highlights: [
      "Developed a 3d printed ChemoStat using a raspberry pi and a various sensors to measure the pH, temperature, and syphon rate of a solution",
      "Developed hands-on science projects for students, such as:",
      "- A programmable 3D printed prosthetic hand (not useful as a prosthetic)",
      "-A mini bioreactor out of a mason jar and Arduino",
    ],
  },
  {
    role: "USU Water Quality Research Assistant",
    company: "Utah State University",
    period: "2021",
    highlights: [
      "Developed prgammable solutions for water quality monitoring and analysis",
      "Programmed raspberry pis, arduinos, and developed PCBs and sensors",
    ],
  },
  {
    role: "Freelance Developer",
    company: "Independent",
    period: "2022 – Present",
    highlights: [
      "Delivered client-facing web apps and automation tools",
      "Owned discovery, build, and delivery for small teams",
      "Shipped fast prototypes to validate product ideas",
    ],
  },
];

const education = {
  degree: "B.S. Computational Mathematics",
  school: "Utah State University",
  minor: "Computer Science Minor",
  year: "2020",
};

export default function Resume() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="space-y-4">
        <h1 className="h1-hero">Resume</h1>
        <p className="body-large">
          AI Engineer and Full-Stack Developer with 7 years of experience
          shipping production systems.
        </p>
        <a href="/resume.pdf" download className="btn-primary inline-flex">
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download PDF
        </a>
      </header>

      {/* Summary */}
      <section className="space-y-4">
        <h2 className="h2-section">Summary</h2>
        <p className="body-base">
          I build AI-powered products end-to-end: from data pipelines and model
          integration to backend systems and user interfaces. 7 years of
          experience across startups and freelance work, including a full
          product shipped in 30 days. I specialize in taking complex AI
          capabilities and shipping them as reliable, user-friendly features.
        </p>
      </section>

      {/* Core Competencies */}
      <section className="space-y-4">
        <h2 className="h2-section">Core Competencies</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {Object.entries(competencies).map(([category, skills]) => (
            <div key={category}>
              <h3 className="mb-2 font-medium text-gray-900 dark:text-white">
                {category}
              </h3>
              <ul className="space-y-1">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-6">
        <h2 className="h2-section">Experience</h2>
        {experience.map((job, i) => (
          <div
            key={i}
            className="space-y-3 border-l-2 border-gray-200 pl-4 dark:border-gray-800"
          >
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {job.role}
              </h3>
              <p className="text-sm text-gray-500">
                {job.company} • {job.period}
              </p>
            </div>
            <ul className="space-y-1">
              {job.highlights.map((highlight, j) => (
                <li
                  key={j}
                  className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="space-y-4">
        <h2 className="h2-section">Education</h2>
        <div className="space-y-1">
          <h3 className="font-medium text-gray-900 dark:text-white">
            {education.degree}
          </h3>
          <p className="text-sm text-gray-500">
            {education.school} • {education.minor} • {education.year}
          </p>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-4">
        <h2 className="h2-section">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "TypeScript",
            "JavaScript",
            "Python",
            "React",
            "Next.js",
            "Node.js",
            "PostgreSQL",
            "DynamoDB",
            "AWS",
            "Vercel",
            "OpenAI",
            "LangChain",
            "Tailwind CSS",
            "Prisma",
            "Docker",
            "Git",
          ].map((tech) => (
            <span key={tech} className="stack-tag">
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
