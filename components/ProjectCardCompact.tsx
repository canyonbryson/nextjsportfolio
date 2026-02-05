import { Project } from "@/constants/projects";

interface ProjectCardCompactProps {
  project: Project;
}

export default function ProjectCardCompact({
  project,
}: ProjectCardCompactProps) {
  return (
    <article className="flex items-start justify-between gap-4 border-b border-gray-100 py-4 last:border-0 dark:border-gray-800">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900 dark:text-white">
            {project.title}
          </h3>
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>
        <p className="body-small mt-1">{project.proofLine}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech} className="stack-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
