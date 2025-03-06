// External Imports
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Internal Imports
import type {
  ConstructorStandingsContextType,
  ConstructorStandingsItem,
} from "@/types/track-rev";

const fetchData = async (year: string) => {
  const response = await axios.get<Record<string, ConstructorStandingsItem[]>>(
    `/api/track-rev/standings/constructors/${year}`,
  );
  return response.data;
};

const useConstructorStandings = (year: string) => {
  return useQuery<ConstructorStandingsContextType["ConstructorStandings"]>({
    queryKey: ["constructorStandings", year],
    queryFn: async () => fetchData(year),
    enabled: !!year,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
  });
};

export default useConstructorStandings;
