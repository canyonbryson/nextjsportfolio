import { Project } from "@/constants/projects";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({
  project,
  featured = false,
}: ProjectCardProps) {
  return (
    <article
      className={`card ${featured ? "card-hover" : ""} flex flex-col gap-4`}
    >
      {/* Title & Tagline */}
      <div>
        <h3 className="h3-card">{project.title}</h3>
        <p className="body-small mt-1">{project.tagline}</p>
      </div>

      {/* Proof Line */}
      <p className="body-base">{project.proofLine}</p>

      {/* Role */}
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {project.role}
      </p>

      {/* Stack Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, featured ? 10 : 6).map((tech) => (
          <span key={tech} className="stack-tag">
            {tech}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {project.links.caseStudy && (
          <Link href={project.links.caseStudy} className="btn-primary text-sm">
            Case Study
          </Link>
        )}
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm"
          >
            Demo
          </a>
        )}
        {project.links.video && (
          <a
            href={project.links.video}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm"
          >
            Video
          </a>
        )}
        {project.links.repo && (
          <a
            href={project.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm"
          >
            Repo
          </a>
        )}
      </div>
    </article>
  );
}
