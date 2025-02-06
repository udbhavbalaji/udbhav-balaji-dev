import { portfolioItems } from "@/app/portfolio/_resources";
import Title from "@/app/_components/ui/Title";
import PortfolioItem from "@/app/portfolio/_components/PortfolioItem";

export default function Portfolio() {
  return (
    <div>
      <div className="container relative mx-auto flex flex-wrap items-center justify-center">
        <div className="absolute top-0 w-full py-1">
          <Title
            id="portfolio"
            className={
              "mx-auto w-9/12 text-2xl font-bold underline decoration-4 underline-offset-8"
            }
          >
            Projects
          </Title>
        </div>
        <div className="mt-1 w-9/12">
          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {portfolioItems.map((project, index) => (
              <PortfolioItem
                title={project.title}
                imgUrl={project.imgUrl}
                stack={project.stack}
                techSkills={project.techSkills}
                link={project.link}
                description={project.description}
                index={index}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
