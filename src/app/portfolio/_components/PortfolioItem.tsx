import { PortfolioItem } from "@/types/portfolio";

export default function ({
  title,
  imgUrl,
  stack,
  techSkills,
  link,
  description,
  index,
}: PortfolioItem & { index: number }) {
  return (
    <div
      key={index}
      className="overflow-hidden rounded-md border-2 border-gray-900 dark:bg-gray-800"
    >
      <img
        src={imgUrl}
        alt="Project Image"
        className="h-36 w-full cursor-pointer object-cover md:h-48"
      />
      <div className="w-full p-4">
        <h3 className="md:txt-xl mb-2 text-lg font-semibold md:mb-3">
          {title}
        </h3>
        <p className="mb-3 flex flex-row flex-wrap items-center justify-start gap-2 text-xs md:text-sm">
          {stack.map((item, index) => (
            <span
              key={index}
              className="inline-block rounded-md border-2 border-stone-900 px-2 py-1 font-semibold dark:border dark:border-stone-100"
            >
              {item}
            </span>
          ))}
        </p>
        <p className="mb-3 flex flex-row flex-wrap items-center justify-start gap-2 text-xs md:text-sm">
          {techSkills.map((item, index) => (
            <span
              key={index}
              className="inline-block rounded-md border-2 border-stone-900 px-2 py-1 font-semibold dark:border dark:border-stone-100"
            >
              {item}
            </span>
          ))}
        </p>
        <p className="mb-3 flex max-w-md flex-row flex-wrap items-center justify-start gap-2 text-xs md:text-sm">
          {description}
        </p>
        <a
          href={link}
          target="_blank"
          className="font-semibold text-cyan-600 decoration-red-600 decoration-2 underline-offset-2 hover:underline"
          rel="noreferrer noopener"
        >
          Check Out the Project
        </a>
      </div>
    </div>
  );
}
