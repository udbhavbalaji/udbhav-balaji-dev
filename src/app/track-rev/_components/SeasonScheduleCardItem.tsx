import useYear from "@/app/track-rev/_hooks/useYear";
import { useRouter } from "next/navigation";
import { SeasonScheduleCardItemProps } from "@/types/track-rev";
import { getWeeekendMonths, getMonthName } from "@/app/track-rev/_lib/utils";

const SeasonSchduleCardItem = ({
  index,
  cardData,
}: SeasonScheduleCardItemProps) => {
  const router = useRouter();
  const { seasonSchedule: year } = useYear();

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

  const handleCardClick = (season: string, round: number) => {
    router.push(`/races/${season}/${round}`);
  };

  return (
    <li
      key={index}
      className="mx-auto flex w-8/12 items-center justify-center rounded-xl py-4"
    >
      <div
        className={`gap flex w-full cursor-pointer flex-col rounded-md p-4 shadow-lg ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
          }-card`}
        onClick={() => handleCardClick(year, cardData.round)}
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
