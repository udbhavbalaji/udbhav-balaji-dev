// External Imports
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Internal Imports
import {
  type SeasonScheduleContextType,
  type SeasonScheduleItem,
} from "@/types/track-rev";

const fetchData = async (year: string) => {
  const response = await axios.get<Record<string, SeasonScheduleItem[]>>(
    `/api/track-rev/schedule/${year}`,
  );
  return response.data;
};

const useSeasonSchedule = (year: string) => {
  return useQuery<SeasonScheduleContextType["SeasonSchedule"]>({
    queryKey: ["seasonSchedule", year],
    queryFn: async () => fetchData(year),
    enabled: !!year,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
  });
};

export default useSeasonSchedule;
