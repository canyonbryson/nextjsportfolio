interface CaseStudyTLDRProps {
  problem: string;
  role: string;
  timeframe: string;
  notable: string[];
  links?: {
    demo?: string;
    video?: string;
    repo?: string;
  };
}

export default function CaseStudyTLDR({
  problem,
  role,
  timeframe,
  notable,
  links,
}: CaseStudyTLDRProps) {
  return (
    <aside className="sticky top-4 rounded-lg border border-accent/20 bg-accent/5 p-5 dark:border-accent/30 dark:bg-accent/10">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent">
        TL;DR
      </h2>
      <dl className="space-y-3 text-sm">
        <div>
          <dt className="font-medium text-gray-900 dark:text-white">Problem</dt>
          <dd className="mt-1 text-gray-600 dark:text-gray-400">{problem}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-900 dark:text-white">Role</dt>
          <dd className="mt-1 text-gray-600 dark:text-gray-400">{role}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-900 dark:text-white">
            Timeframe
          </dt>
          <dd className="mt-1 text-gray-600 dark:text-gray-400">{timeframe}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-900 dark:text-white">Notable</dt>
          <dd className="mt-1">
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              {notable.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
      {links && Object.keys(links).length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {links.demo && (
            <a
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs"
            >
              Demo
            </a>
          )}
          {links.video && (
            <a
              href={links.video}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs"
            >
              Video
            </a>
          )}
          {links.repo && (
            <a
              href={links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs"
            >
              Repo
            </a>
          )}
        </div>
      )}
    </aside>
  );
}
