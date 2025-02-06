import { JourneyItem } from "@/types/portfolio";

export default function ({
  index,
  title,
  year,
  type,
  details,
  techStack,
}: JourneyItem & { index: number }) {
  return (
    <li key={index} className="mx-4 mb-6 mt-6 w-full">
      <div className="flex flex-row flex-wrap items-center justify-start gap-4 text-xs md:text-sm">
        <div className="my-1 text-sm font-normal leading-none">{year}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <span
          className={`inline-block rounded-md px-2 py-1 text-sm ${
            type === "Class"
              ? "class-styles"
              : type === "Project"
                ? "project-styles"
                : "assignment-styles"
          }`}
        >
          {type}
        </span>
      </div>
      <p className="flex flex-row flex-wrap items-center justify-start gap-2 text-xs md:text-sm">
        {techStack.map((item, index) => (
          <span
            key={index}
            className="my-3 inline-block rounded-md border-2 border-stone-900 px-2 py-1 font-semibold dark:border dark:border-stone-100"
          >
            {item}
          </span>
        ))}
      </p>
      <p className="my-2 text-base font-normal">{details}</p>
    </li>
  );
}
