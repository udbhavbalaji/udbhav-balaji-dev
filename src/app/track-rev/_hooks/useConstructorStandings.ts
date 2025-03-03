import { ConstructorStandingsContextType } from "@/types/track-rev";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async (year: string) => {
  const response = await axios.get(
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
