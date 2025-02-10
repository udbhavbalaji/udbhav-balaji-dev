"use client";

import useTitle from "@/app/track-rev/_hooks/useTitle";
import React, { useEffect } from "react";
import useYear from "../../_hooks/useYear";
import useDriverStandings from "../../_hooks/useDriverStandings";
import useConstructorStandings from "../../_hooks/useConstructorStandings";
import DropDown from "@/app/_components/ui/DropDown";
import { Seasons } from "../../_resources";
import ConstructorStandingCardItem from "../../_components/ConstructorStandingsCardItem";

export default function ConstructorStandings() {
  const { updateTitle } = useTitle();
  const { constructorStandings: year, updateYear } = useYear();
  const { data, isLoading, error } = useConstructorStandings(year);

  useEffect(() => {
    updateTitle(`${year} Constructor Standings`);
  }, [year]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!data || !data[year]) return <div>No data</div>;

  return (
     <div className="container mx-auto flex w-full flex-wrap items-center justify-center rounded-lg">
      <DropDown
        field="constructorStandings"
        options={Seasons}
        currentValue={year}
        onYearChange={updateYear}
      />
      <div className="my-10 flex w-11/12 flex-col justify-start rounded-md text-white md:flex-row">
        <ul className="flex flex-wrap">
          {data[year].map((item, index) => (
            <ConstructorStandingCardItem
              key={index}
              index={index}
              cardData={item}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

const DataComponent = ({
  name,
  position,
  points,
}: {
  name: string;
  position: number;
  points: number;
}) => {
  return (
    <div className="flex flex-row justify-between gap-2">
      Name: {name}
      Position: {position}
      Points: {points}
    </div>
  );
};
