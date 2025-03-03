import { DriverStandingsContextType } from "@/types/track-rev";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async (year: string) => {
  const response = await axios.get(`/api/track-rev/standings/drivers/${year}`);
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
