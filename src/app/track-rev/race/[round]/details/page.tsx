"use client";

import DropDown from "@/app/_components/ui/DropDown";
import useSeasonSchedule from "@/app/track-rev/_hooks/useSeasonSchedule";
import useTitle from "@/app/track-rev/_hooks/useTitle";
import useYear from "@/app/track-rev/_hooks/useYear";
import { Seasons } from "@/app/track-rev/_resources";
import { useEffect, use } from "react";
import { useParams } from "next/navigation";

const RaceDetails = () => {
  const { updateTitle } = useTitle();
  const { seasonSchedule: year, updateYear } = useYear();
  const { data, isLoading, error } = useSeasonSchedule(year);
  const { round } = useParams<{ round: string }>();

  useEffect(() => {
    updateTitle(
      `${year} ${data ? (data[year] ? data[year][parseInt(round) - 1] : "") : ""}`,
    );
  }, [year]);

  if (!data || !data[year]) return <div>No data</div>;

  const seasonRaceDetails = data[year];

  const raceDetails = seasonRaceDetails.find(
    (race) => race.round === parseInt(round),
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto flex w-full flex-wrap items-center justify-center rounded-lg bg-red-500">
      <h2 className="w-full text-4xl font-bold">Hello World</h2>

      <DropDown
        field="seasonSchedule"
        options={Seasons}
        currentValue={year}
        onYearChange={updateYear}
      />
    </div>
  );
};

export default RaceDetails;
