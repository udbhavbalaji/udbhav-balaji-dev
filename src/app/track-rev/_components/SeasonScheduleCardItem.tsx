// External Imports
import { useRouter } from "next/navigation";

// Internal Imports
import { getWeeekendMonths, getMonthName } from "@/app/track-rev/_lib/utils";
import type { SeasonScheduleCardItemProps } from "@/types/track-rev";

const SeasonSchduleCardItem = ({
  index,
  cardData,
}: SeasonScheduleCardItemProps) => {
  const router = useRouter();

  let weekendSchedule: string;

  const startDate = cardData.Sessions.FirstPractice.date.split("-")[2];
  const endDate = cardData.Sessions.Race.date.split("-")[2];

  const { startMonth, endMonth } = getMonthName(
    getWeeekendMonths(cardData.Sessions),
  );

  if (startMonth === endMonth) {
    weekendSchedule = `${startDate} - ${endDate} ${endMonth.slice(0, 3)}`;
  } else {
    weekendSchedule = `${startDate} ${startMonth.slice(
      0,
      3,
    )} - ${endDate} ${endMonth.slice(0, 3)}`;
  }

  const handleCardClick = (round: number) => {
    router.push(`/track-rev/race/${round}/details`);
  };

  return (
    <li
      key={index}
      className="mx-auto flex w-8/12 items-center justify-center rounded-xl py-4"
    >
      <div
        className={`gap flex w-full cursor-pointer flex-col rounded-md border border-gray-900 p-4 shadow-lg hover:border-white ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
          }`}
        onClick={() => handleCardClick(cardData.round)}
      >
        <p className="text-sm font-semibold text-red-600">{`Round ${index + 1
          }`}</p>
        <div className="text-xl font-bold text-white">{cardData.raceName}</div>
        <div className="font-wideFont text-sm text-gray-400">
          {cardData.circuitName}
        </div>
        <p className="text-xs text-gray-500">{weekendSchedule}</p>
      </div>
    </li>
  );
};

export default SeasonSchduleCardItem;
