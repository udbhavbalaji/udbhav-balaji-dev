"use client";

import { portfolioItems } from "@/app/_lib/resources";
import Link from "next/link";
import type { ProjectItemProps } from "@/types";
import { MouseEvent, MouseEventHandler } from "react";

function Projects() {
  return (
    <div
      id="projects"
      className="container mx-auto flex flex-wrap items-center justify-center"
    >
      <h2 className="mx-auto my-10 flex w-3/4 flex-row text-4xl font-bold">
        Projects
      </h2>

      <div className="my-5 grid w-9/12 grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        {portfolioItems.map((project, idx) => (
          <ProjectItem key={idx} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectItem({ project }: { project: ProjectItemProps }) {
  const handleResourceClick: MouseEventHandler<HTMLDivElement> = (
    e: MouseEvent<HTMLDivElement>,
  ) => {
    window.open(project.resource?.link, "_blank", "noopener, noreferrer");
    e.stopPropagation();
  };

  return (
    <>
      <Link
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex max-w-lg flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
      >
        <h3 className="text-3xl">{project.title}</h3>

        <p className="flex flex-wrap items-center justify-start text-xs text-green-400">
          {project.stack.map((item) => (
            <span
              key={item}
              className="mx-1 my-1 inline-flex rounded-md border-2 border-green-400 p-1"
            >
              {item}
            </span>
          ))}
        </p>

        <p className="flex flex-wrap items-center justify-start text-xs text-green-400">
          {project.techSkills.map((skill) => (
            <span
              key={skill}
              className="mx-1 my-1 inline-flex rounded-md border-2 border-green-400 p-1"
            >
              {skill}
            </span>
          ))}
        </p>

        <div className="my-3">
          {project.descriptions.map((point, idx) => (
            <p
              key={idx}
              className="lg:text-md mb-2 flex flex-wrap items-center justify-start text-sm"
            >
              {`• ${point}\n`}
            </p>
          ))}
        </div>

        {project.resource ? (
          <div
            onClick={handleResourceClick}
            className="text-lg font-semibold text-green-400 decoration-green-400 decoration-2 underline-offset-4 hover:underline"
          >
            {project.resource.title}
          </div>
        ) : (
          <></>
        )}
      </Link>
    </>
  );
}

export default Projects;
