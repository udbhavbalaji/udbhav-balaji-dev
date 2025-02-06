import Title from "@/app/_components/ui/Title";
import { journeyItems } from "@/app/portfolio/_resources";
import JourneyItem from "@/app/portfolio/_components/JourneyItem";

export default function Journey() {
  return (
    <div>
      <div className="container relative mx-auto mt-5 flex flex-wrap items-center justify-center">
        <div className="absolute top-0 mt-8 w-full py-1">
          <Title
            className={
              "mx-auto w-9/12 text-2xl font-bold underline decoration-4 underline-offset-8"
            }
          >
            My Technical Journey
          </Title>
        </div>
        <div className="my-20 mb-10 flex w-9/12 flex-col justify-start rounded-md border border-stone-100 bg-stone-50 md:flex-row dark:border-gray-900 dark:bg-gray-800">
          <div className="w-full">
            <ol className="flex flex-wrap">
              {journeyItems.map((item, index) => (
                <JourneyItem
                  title={item.title}
                  year={item.year}
                  type={item.type}
                  details={item.details}
                  techStack={item.techStack}
                  index={index}
                  key={index}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
