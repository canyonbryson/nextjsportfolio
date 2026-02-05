export const metadata = {
  title: "About | Canyon Bryson",
  description:
    "AI Engineer and Full-Stack Developer. What I optimize for, how I work, and what I value.",
};

const values = [
  {
    title: "Speed without shortcuts",
    description:
      "I ship fast by making good tradeoffs, not by skipping tests or documentation.",
  },
  {
    title: "Ownership over tasks",
    description:
      "I take responsibility for outcomes, not just completing assigned work.",
  },
  {
    title: "Clarity in communication",
    description:
      "I surface problems early, document decisions, and keep stakeholders informed.",
  },
  {
    title: "Continuous improvement",
    description:
      "I actively seek feedback, learn from mistakes, and refine my approach.",
  },
];

export default function About() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="space-y-4">
        <h1 className="h1-hero">About</h1>
        <p className="body-large max-w-2xl">
          I&apos;m an AI Engineer and Full-Stack Developer focused on shipping
          production systems that solve real problems.
        </p>
      </header>

      {/* What I Optimize For */}
      <section className="space-y-4">
        <h2 className="h2-section">What I Optimize For</h2>
        <div className="space-y-3">
          <p className="body-base">
            <span className="font-medium text-gray-900 dark:text-white">
              Speed + Correctness:
            </span>{" "}
            I believe you can have both. Fast iteration with solid foundations
            beats either extreme.
          </p>
          <p className="body-base">
            <span className="font-medium text-gray-900 dark:text-white">
              End-to-end ownership:
            </span>{" "}
            I prefer working across the stack—from data pipelines to AI models
            to user interfaces—rather than staying in a narrow lane.
          </p>
          <p className="body-base">
            <span className="font-medium text-gray-900 dark:text-white">
              Shipping over perfection:
            </span>{" "}
            A working product teaches you more than a perfect spec. I start with
            thin vertical slices and iterate based on real feedback.
          </p>
        </div>
      </section>

      {/* How I Collaborate */}
      <section className="space-y-4">
        <h2 className="h2-section">How I Collaborate</h2>
        <p className="body-base">
          I communicate proactively—daily updates on progress, early flags on
          blockers, and clear documentation of decisions and tradeoffs. I prefer
          async communication for deep work, with sync time reserved for
          alignment and problem-solving.
        </p>
        <p className="body-base">
          I work best with small teams where everyone has context and autonomy.
          I&apos;m comfortable leading projects or contributing as part of a
          team, depending on what the situation needs.
        </p>
      </section>

      {/* Values */}
      <section className="space-y-6">
        <h2 className="h2-section">Values</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {values.map((value) => (
            <div
              key={value.title}
              className="space-y-1 rounded-lg border border-gray-200 p-4 dark:border-gray-800"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                {value.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Personal Note */}
      <section className="border-t border-gray-200 pt-8 dark:border-gray-800">
        <p className="body-base max-w-2xl">
          Outside of work, I&apos;m a marathon runner and rock climber. Both
          require the same things that make good engineering: consistent effort,
          honest self-assessment, and showing up even when it&apos;s hard. I
          bring that same discipline to my work.
        </p>
      </section>
    </div>
  );
}
