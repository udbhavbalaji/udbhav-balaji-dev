"use client";

import { api } from "@/trpc/react";
import {
  ConstructorStandingsContextType,
  DriverStandingsContextType,
  ErgastContextType,
  ProviderPropsType,
} from "@/types/track-rev";
import { createContext, useEffect, useState } from "react";
import useYear from "../_hooks/useYear";

export const ErgastContext = createContext<ErgastContextType | null>(null);

const ErgastProvider: React.FC<ProviderPropsType> = ({ children }) => {
  const [constructorStandings, setConstructorStandings] = useState<
    ConstructorStandingsContextType["ConstructorStandings"]
  >({});

  const [driverStandings, setDriverStandings] = useState<
    DriverStandingsContextType["DriverStandings"]
  >({});

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { constructorStandings: yearC } = useYear();

  const toggleLoading = () => {
    setLoading((prevState) => !prevState);
  };

  const handleError = (error: string | Error) => {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError(error);
    }
  };

  const fetchConstructorStandings = async (year: string) => {
    setError(null);
    setLoading(true);
    try {
      // todo: continue from here
      const processedStandings = api.trackRev.constructorStandings.useQuery({
        year,
      });

      if (!processedStandings.data) throw new Error("Error while fetching");

      setConstructorStandings({
        ...constructorStandings,
        [year]: processedStandings.data,
      });
    } catch (err) {
      handleError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDriverStandings = async (year: string) => {
    setError(null);
    setLoading(true);
    try {
      // todo: continue from here
      // const processedStandings = await api.post.
    } catch (err) {
      handleError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchConstructorStandings(yearC);
    };

    fetchData();
  }, [yearC]);

  return (
    <ErgastContext.Provider
      value={{
        constructorStandings: {
          fetchData: fetchConstructorStandings,
          ConstructorStandings: constructorStandings,
        },
        driverStandings: {
          fetchData: fetchDriverStandings,
          DriverStandings: driverStandings,
        },
        error,
        loading,
        toggleLoading,
        handleError,
      }}
    >
      {children}
    </ErgastContext.Provider>
  );
};

export default ErgastProvider;
