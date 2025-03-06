// External Imports
import { type NextRequest, NextResponse } from "next/server";

// Internal Imports
import sendIt from "@/server/clients/track-rev/api-client";
import type {
  ConstructorStandingsItem,
  RawConstructorStanding,
  StandingsList,
  StandingsTable,
} from "@/types/track-rev";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ year: string }> },
): Promise<
  NextResponse<Record<string, ConstructorStandingsItem[]> | { error: string }>
> {
  try {
    const year = (await params).year;

    if (!year) throw new Error("Year is required");

    const response = await sendIt(
      `http://api.jolpi.ca/ergast/f1/${year}/constructorstandings/`,
    );

    console.log("response", response);

    if (!("StandingsTable" in response))
      throw new Error("Invalid response format");

    const standingsTable = response.StandingsTable as StandingsTable;

    if (!("StandingsLists" in standingsTable)) {
      throw new Error("Invalid response format");
    }

    const standings = (standingsTable.StandingsLists as StandingsList[])[0];

    if (!standings) throw new Error("Invalid response format");

    if (!("ConstructorStandings" in standings))
      throw new Error("Invalid response format");

    const rawStandings =
      standings.ConstructorStandings as RawConstructorStanding[];

    const processedStandings = rawStandings.map((standing) => {
      const item: ConstructorStandingsItem = {
        constructorId: standing.Constructor.constructorId,
        constructorName: standing.Constructor.name,
        position: parseInt(standing.position),
        points: parseInt(standing.points),
        wins: parseInt(standing.wins),
      };

      return item;
    });

    // return processedStandings;
    return NextResponse.json({ [year]: processedStandings }, { status: 200 });
  } catch (err) {
    console.log("error", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
