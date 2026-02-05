"use client";

import ProjectCard from "@/components/ProjectCard";
import ProjectCardCompact from "@/components/ProjectCardCompact";
import { projects, featuredProjects, archiveProjects } from "@/constants/projects";
import { useState } from "react";

type Filter = "all" | "featured" | "ai" | "fullstack" | "experiment";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "featured", label: "Featured" },
  { value: "ai", label: "AI Systems" },
  { value: "fullstack", label: "Full Stack" },
  { value: "experiment", label: "Experiments" },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const showFeatured = activeFilter === "all" || activeFilter === "featured";
  const showArchive = activeFilter !== "featured";

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="h1-hero">Projects</h1>
        <p className="body-large">
          A selection of AI systems, full-stack applications, and experiments
          I&apos;ve built.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === filter.value
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Featured Projects */}
      {showFeatured && (
        <section className="space-y-6">
          <h2 className="h2-section">Featured</h2>
          <div className="grid gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} featured />
            ))}
          </div>
        </section>
      )}

      {/* Archive Projects */}
      {showArchive && (
        <section className="space-y-4">
          {activeFilter === "all" && <h2 className="h2-section">Archive</h2>}
          <div className="card">
            {(activeFilter === "all"
              ? archiveProjects
              : filteredProjects.filter((p) => p.category !== "featured")
            ).map((project) => (
              <ProjectCardCompact key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="py-12 text-center">
          <p className="body-base">No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}
