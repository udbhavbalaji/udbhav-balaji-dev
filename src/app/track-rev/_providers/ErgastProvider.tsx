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

const fetchConstructorStandings = async (year: string) => {
  try {
    // todo: continue from here
    const processedStandings = api.trackRev.constructorStandings.useQuery({
      year,
    });

    if (!processedStandings.data) throw new Error("Error while fetching");

    return processedStandings.data;
  } catch (err) {
    // throw new Error("Error while fetching");
    throw err;
  }
};

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

  // const fetchConstructorStandings = async (year: string) => {
  //   setError(null);
  //   setLoading(true);
  //   try {
  //     // todo: continue from here
  //     const processedStandings = api.trackRev.constructorStandings.useQuery({
  //       year,
  //     });

  //     if (!processedStandings.data) throw new Error("Error while fetching");

  //     setConstructorStandings({
  //       ...constructorStandings,
  //       [year]: processedStandings.data,
  //     });
  //   } catch (err) {
  //     handleError(err as Error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
      setLoading(true);
      setError(null);
      try {
        const cStandings = await fetchConstructorStandings(yearC);
        // setConstructorStandings({ ...cStandings, [yearC]: cStandings });
        setConstructorStandings({
          ...constructorStandings,
          [yearC]: cStandings,
        });
      } catch (err) {
        handleError(err as Error);
      } finally {
        setLoading(false);
      }
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
