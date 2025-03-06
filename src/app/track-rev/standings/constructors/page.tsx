"use client";

// External Imports
import React, { useEffect } from "react";

// Internal Imports
import useTitle from "@/app/track-rev/_hooks/useTitle";
import useYear from "@/app/track-rev/_hooks/useYear";
import useConstructorStandings from "@/app/track-rev/_hooks/useConstructorStandings";
import DropDown from "@/app/_components/ui/DropDown";
import ConstructorStandingCardItem from "@/app/track-rev/_components/ConstructorStandingsCardItem";
import { Seasons } from "@/app/track-rev/_resources";

export default function ConstructorStandings() {
  const { updateTitle } = useTitle();
  const { constructorStandings: year, updateYear } = useYear();
  const { data, isLoading, error } = useConstructorStandings(year);

  useEffect(() => {
    updateTitle(`${year} Constructor Standings`);
  }, [year]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!data?.[year]) return <div>No data</div>;

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
