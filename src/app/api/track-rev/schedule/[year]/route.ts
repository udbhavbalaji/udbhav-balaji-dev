// External Imports
import { type NextRequest, NextResponse } from "next/server";

// Internal Imports
import sendIt from "@/server/clients/track-rev/api-client";
import type {
  RaceTable,
  RawRaceEntry,
  SeasonScheduleItem,
} from "@/types/track-rev";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ year: string }> },
) {
  try {
    const year = (await params).year;

    if (!year) throw new Error("Both year and round are required");
    // if (!round || !year) throw new Error("Both year and round are required");

    const response = await sendIt(
      `http://api.jolpi.ca/ergast/f1/${year}/races/`,
    );

    if (!("RaceTable" in response)) throw new Error("Invalid response format");

    const raceTable = response.RaceTable as RaceTable;

    if (!("Races" in raceTable)) {
      throw new Error("Invalid response format");
    }

    const schedule = raceTable.Races as RawRaceEntry[];
    const processedSchedule = schedule.map((race) => {
      const item: SeasonScheduleItem = {
        season: race.season,
        round: parseInt(race.round),
        url: race.url,
        raceName: race.raceName,
        circuitName: race.Circuit.circuitName,
        Sessions: {
          FirstPractice: race.FirstPractice,
          SecondPractice: race.SecondPractice,
          ThirdPractice: race.ThirdPractice,
          Qualifying: race.Qualifying,
          SprintQualifying: race.SprintQualifying,
          SprintRace: race.Sprint,
          Race: {
            date: race.date,
            time: race.time,
          },
        },
      };

      return item;
    });

    return NextResponse.json({ [year]: processedSchedule }, { status: 200 });
  } catch (err) {
    console.log("error", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
