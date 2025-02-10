import axios from "axios";
import { SeasonScheduleContextType } from "@/types/track-rev";
import { useQuery } from "@tanstack/react-query";

const fetchData = async (year: string) => {
  const response = await axios.get(`/api/track-rev/schedule/${year}`);
  return response.data;
};

const useSeasonSchedule = (year: string) => {
  // todo: need to update the type here when I figurte out what Ergast returns for the season schedule
  return useQuery<SeasonScheduleContextType['SeasonSchedule']>({
    queryKey: ["seasonSchedule", year],
    queryFn: async () => fetchData(year),
    enabled: !!year,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
  });
};

export default useSeasonSchedule;

