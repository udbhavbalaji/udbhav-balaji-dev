"use client";

import { useEffect } from "react";
import useTitle from "@/app/track-rev/_hooks/useTitle";
import useErgast from "@/app/track-rev/_hooks/useErgast";

export default function TrackRevApp() {
  const { updateTitle } = useTitle();
  const { constructorStandings, error } = useErgast();

  useEffect(() => {
    updateTitle("Track Rev Home");
  }, []);

  return (
    <>
      {constructorStandings?.ConstructorStandings["2024"] &&
        constructorStandings.ConstructorStandings["2024"].map((standing) => {
          return (
            <div key={standing.constructorId}>{standing.constructorName}</div>
          );
        })}

      {error && <div>{error}</div>}
    </>
  );
}
