"use client";

// External Imports
import { useEffect } from "react";

// Internal Imports
import useTitle from "@/app/track-rev/_hooks/useTitle";
import NotImplementedComponent from "@/app/track-rev/_components/NotImplemented";

const RaceResults = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Race Results");
  }, []);

  return (
    <div className="container mx-auto flex w-full flex-wrap items-center justify-center rounded-lg">
      <NotImplementedComponent />
    </div>
  );
};

export default RaceResults;
