import { SeasonScheduleItem } from "@/types/track-rev";

export const getWeeekendMonths = (sessions: SeasonScheduleItem["Sessions"]): { startMonth: string; endMonth: string } => {
  const startMonth = sessions.FirstPractice.date.split("-")[1];
  const endMonth = sessions.Race.date.split("-")[1];

  if (!startMonth || !endMonth) throw new Error("Invalid Sesseion data");

  return { startMonth, endMonth };
};

export const getMonthName = ({ startMonth, endMonth }: { startMonth: string; endMonth: string }): { startMonth: string; endMonth: string } => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return {
    startMonth: monthNames[parseInt(startMonth) - 1]!,
    endMonth: monthNames[parseInt(endMonth) - 1]!,
  }
};
