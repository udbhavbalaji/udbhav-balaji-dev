"use client";
import { useEffect } from "react";

import useTitle from "@/app/track-rev/_hooks/useTitle";
import NotImplementedComponent from "@/app/track-rev/_components/NotImplemented";

const Driver = () => {
  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Coming Soon...");
  }, []);

  return (
    <div className="container mx-auto flex w-full flex-wrap items-center justify-center rounded-lg">
      <NotImplementedComponent />
    </div>
  );
};

export default Driver;
