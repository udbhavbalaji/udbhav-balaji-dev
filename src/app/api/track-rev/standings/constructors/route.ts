import sendIt from "@/server/clients/track-rev/api-client";
import {
  ConstructorStandingsItem,
  RawConstructorStanding,
  StandingsTable,
} from "@/types/track-rev";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (
  request: NextRequest,
): Promise<
  NextResponse<
    { [year: string]: ConstructorStandingsItem[] } | { error: string }
  >
> => {
  try {
    // const year = request.nextUrl.searchParams.get("year");
    const { year } = await request.json();

    if (!year) throw new Error("Year is required");

    const response = sendIt(
      `http://api.jolpi.ca/ergast/f1/${year}/constructorstandings/`,
    );

    if (!("StandingsTable" in response))
      throw new Error("Invalid response format");

    const standingsTable = response.StandingsTable as StandingsTable;

    if (!("ConstructorStandings" in standingsTable))
      throw new Error("Invalid response format");

    const rawStandings =
      standingsTable.ConstructorStandings as RawConstructorStanding[];

    const processedStandings = rawStandings.map((standing) => {
      const item: ConstructorStandingsItem = {
        constructorId: standing.Constructor.constructorId,
        constructorName: standing.Constructor.constructorName,
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
};
