// External Imports
import { useRouter } from "next/navigation";

// External Imports
import type { ConstructorStandingCardItemProps } from "@/types/track-rev";

const ConstructorStandingCardItem = ({
  index,
  cardData,
}: ConstructorStandingCardItemProps) => {
  const router = useRouter();

  const constructorNameStyling = `text-xl font-bold ${cardData.constructorId}`;

  const handleCardClick = () => {
    router.push(`/track-rev/constructor`);
  };

  return (
    <li
      key={index}
      className="mx-auto flex w-8/12 items-center justify-center rounded-xl py-4"
    >
      <div
        className={`gap flex w-full cursor-pointer flex-col rounded-md p-4 shadow-lg ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
          }`}
        onClick={() => handleCardClick()}
      >
        <p className="text-sm font-semibold text-red-600">
          {cardData.position}
        </p>
        <div className={constructorNameStyling}>{cardData.constructorName}</div>
        <div className="font-wideFont text-sm text-gray-400">
          {cardData.points}
        </div>
      </div>
    </li>
  );
};

export default ConstructorStandingCardItem;
