"use client";

import { useRouter } from "next/router";
import useYear from "@/app/track-rev/_hooks/useYear";
import useSeasonSchedule from "@/app/track-rev/_hooks/useSeasonSchedule";
import useTitle from "@/app/track-rev/_hooks/useTitle";
import { useEffect } from "react";
import DropDown from "@/app/_components/ui/DropDown";
import { Seasons } from "@/app/track-rev/_resources";
import SeasonScheduleCardItem from "@/app/track-rev/_components/SeasonScheduleCardItem";

// import useSeasonSchedule from "@hooks/useSeasonSchedule";
// import { getRaceScheduleCard } from "@utils/format";
// import RaceScheduleCardItem from "./ScheduleCardItem";
// import DropDown from "@components/ui/DropDown";
// import useErgast from "@hooks/useErgast";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { seasonOptions } from "@data/general";
// import ErrorPage from "@pages/ErrorPage";

const ScheduleCard = () => {
  const { updateTitle } =  useTitle();
  const { seasonSchedule: year, updateYear } = useYear();
  const { data, isLoading, error } = useSeasonSchedule(year);

  useEffect(() => {
    updateTitle(`${year} Season Schedule`);
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
            <SeasonScheduleCardItem
              key={index}
              index={index}
              cardData={item}
            />
          ))}
        </ul>
      </div>
    </div>
  );

  // return (
  //   <>
  //     {loading ? (
  //       <p>Loading...</p>
  //     ) : error ? (
  //       <ErrorPage title='Error' error={error} />
  //     ) : (
  //       <div className='container flex flex-wrap items-center justify-center mx-auto w-full rounded-lg'>
  //         <DropDown
  //           reqType='seasonSchedule'
  //           options={seasonOptions}
  //           currentValue={years.seasonSchedule}
  //           onYearChange={setYears}
  //         />
  //         <div className='text-white flex flex-col md:flex-row justify-start my-10 w-11/12 rounded-md'>
  //           <ul className='flex flex-wrap'>
  //             {cardData.map((item, index) => (
  //               <RaceScheduleCardItem
  //                 key={index}
  //                 index={index}
  //                 cardData={item}
  //               />
  //             ))}
  //           </ul>
  //         </div>
  //       </div>
  //     )}
  //   </>
  // );
};

export default ScheduleCard;
