"use client";
import useTitle from "@/app/track-rev/_hooks/useTitle";
import { useEffect } from "react";

const RaceResults = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Race Results");
  }, []);

  return (
    <div className="container mx-auto mt-10 flex w-full flex-wrap items-center justify-center rounded-lg">
      <h2 className="mx-auto w-full text-center text-5xl font-bold">
        We're working on it!
      </h2>
      <h3 className="mx-auto my-5 w-full text-center text-xl">
        Check Back Soon!
      </h3>
    </div>
  );
};

export default RaceResults;
