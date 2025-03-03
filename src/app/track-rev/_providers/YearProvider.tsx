"use client";

import {
  ProviderPropsType,
  YearContextType,
  YearStateType,
} from "@/types/track-rev";
import { createContext, useState } from "react";

export const YearContext = createContext<YearContextType | null>(null);

const YearProvider: React.FC<ProviderPropsType> = ({ children }) => {
  const [years, setYears] = useState<YearStateType>({
    constructorStandings: "2024",
    driverStandings: "2024",
    seasonSchedule: "2025",
  });

  const updateYear = (year: string, field: keyof YearStateType) => {
    setYears((prevState) => ({
      ...prevState,
      [field]: year,
    }));
  };

  return (
    <YearContext.Provider value={{ ...years, updateYear }}>
      {children}
    </YearContext.Provider>
  );
};

export default YearProvider;
