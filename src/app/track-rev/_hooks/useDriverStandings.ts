// External Imports
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Internal Imports
import type {
  DriverStandingsContextType,
  DriverStandingsItem,
} from "@/types/track-rev";

const fetchData = async (year: string) => {
  const response = await axios.get<Record<string, DriverStandingsItem[]>>(
    `/api/track-rev/standings/drivers/${year}`,
  );
  return response.data;
};

const useDriverStandings = (year: string) => {
  return useQuery<DriverStandingsContextType["DriverStandings"]>({
    queryKey: ["driverStandings", year],
    queryFn: async () => fetchData(year),
    enabled: !!year,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
  });
};

export default useDriverStandings;
