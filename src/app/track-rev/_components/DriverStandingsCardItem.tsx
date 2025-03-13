// External Imports
import { useRouter } from "next/navigation";

// Internal Imports
import type { DriverStandingCardItemProps } from "@/types/track-rev";

const DriverStandingCardItem = ({
  index,
  cardData,
}: DriverStandingCardItemProps) => {
  const router = useRouter();

  const driverNameStyling = `text-xl font-bold ${cardData.constructorId}`;
  // fix: Need to implement this function after deciding routes and stuff
  const handleCardClick = () => {
    router.push(`/track-rev/driver`);
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
        <div className={driverNameStyling}>{cardData.driverName}</div>
        <div className="font-wideFont text-sm text-gray-400">
          {cardData.points}
        </div>
        <p className="text-xs text-gray-500">{cardData.driverNumber}</p>
      </div>
    </li>
  );
};

export default DriverStandingCardItem;
