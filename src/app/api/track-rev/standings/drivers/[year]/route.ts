import sendIt from "@/server/clients/track-rev/api-client";
import {
  Constructor,
  ConstructorStandingsItem,
  DriverStandingsItem,
  RawConstructorStanding,
  RawDriverStanding,
  StandingsList,
  StandingsTable,
} from "@/types/track-rev";
import { NextRequest, NextResponse } from "next/server";

// export const GET = async (
//   request: NextRequest,
//   { params }: { params: { year: string } },
// ): Promise<
//   NextResponse<{ [year: string]: DriverStandingsItem[] } | { error: string }>
// > => {
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ year: string }> },
) {
  try {
    const year = (await params).year;

    if (!year) throw new Error("Year is required");

    const response = await sendIt(
      `http://api.jolpi.ca/ergast/f1/${year}/driverStandings/`,
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

    if (!("DriverStandings" in standings))
      throw new Error("Invalid response format");

    const rawStandings = standings.DriverStandings as RawDriverStanding[];

    const processedStandings = rawStandings.map((standing) => {
      const item: DriverStandingsItem = {
        driverNumber: parseInt(standing.Driver.permanentNumber),
        driverName: `${standing.Driver.givenName} ${standing.Driver.familyName}`,
        position: parseInt(standing.position),
        points: parseInt(standing.points),
        wins: parseInt(standing.wins),
        constructorName:
          (standing.Constructors[0] as Constructor)?.name ?? "Unknown Team lol",
        constructorId:
          (standing.Constructors[0] as Constructor)?.constructorId ??
          "Unknown Team lol",
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
