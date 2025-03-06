"use client";

/* eslint-disable */

// External Imports
import { useEffect } from "react";

// Internal Imports
import useTitle from "@/app/track-rev/_hooks/useTitle";
// import useYear from "@/app/track-rev/_hooks/useYear";
// import useConstructorStandings from "@/app/track-rev/_hooks/useConstructorStandings";

export default function TrackRevApp() {
  const { updateTitle } = useTitle();
  // const { constructorStandings, error } = useErgast();
  // const { constructorStandings } = useYear();
  //@eslint-ignore
  // const { data, isLoading, error } =
  //   useConstructorStandings(constructorStandings);
  //
  // console.log("data", data);

  useEffect(() => {
    updateTitle("Track Rev Home");
  }, []);

  return (
    <>
      {/* {constructorStandings?.ConstructorStandings["2024"] &&
        constructorStandings.ConstructorStandings["2024"].map((standing) => {
          return (
            <div key={standing.constructorId}>{standing.constructorName}</div>
          );
        })} */}
    </>
  );
}
