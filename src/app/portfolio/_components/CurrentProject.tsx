import Title from "@/app/_components/ui/Title";
import { currentProject } from "@/app/portfolio/_resources";

export default function CurrentProject() {
  let skills = currentProject.newSkills.join(", ");

  return (
    <div className="container relative mx-auto mt-5 flex flex-wrap items-center justify-center">
      <div className="absolute top-0 mt-8 w-full py-1">
        <Title className="mx-auto w-9/12 text-2xl font-bold underline decoration-4 underline-offset-8">
          I'm Currently Working On...
        </Title>
      </div>

      <div className="my-20 mb-10 flex w-9/12 flex-col justify-start rounded-md border-stone-100 bg-stone-50 md:flex-row dark:border-stone-900 dark:bg-gray-800">
        <img
          src={currentProject.imgUrl}
          className="h-50 md:h-100 m-5 w-1/2 overflow-hidden border-2 border-stone-200 object-cover dark:border-black"
        />

        <div className="m-5 flex w-full flex-row flex-wrap">
          <h3 className="mb-2 flex w-full text-lg font-semibold">
            {currentProject.title}
          </h3>
          <p className="mb-3 flex w-full flex-row items-center justify-start gap-2 text-xs md:text-sm">
            {currentProject.stack.map((item, index) => (
              <span
                key={index}
                className="inline-block rounded-md border-2 border-stone-900 px-2 py-1 font-semibold dark:border dark:border-stone-100"
              >
                {item}
              </span>
            ))}
          </p>
          <p className="md:text-md mx-auto mb-3 w-full text-sm font-bold">
            I'm doing this project to learn
            {` ${skills}`}
          </p>
          {currentProject.description.map((item, index) => (
            <p key={index} className="mb-3 w-full text-xs md:text-sm">
              {item}
            </p>
          ))}

          <a
            href={currentProject.link}
            className="font-semibold text-cyan-600 decoration-red-600 decoration-2 underline-offset-2 hover:underline"
          >
            Check out the Project on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
