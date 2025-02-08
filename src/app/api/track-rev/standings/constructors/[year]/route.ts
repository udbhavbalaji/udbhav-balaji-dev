import sendIt from "@/server/clients/track-rev/api-client";
import {
  ConstructorStandingsItem,
  RawConstructorStanding,
  StandingsList,
  StandingsTable,
} from "@/types/track-rev";
import { NextRequest, NextResponse } from "next/server";

// const ConstructorStandingsRouteHandler = async (request: NextRequest) => {
//   const year = request.nextUrl.searchParams.get("year");

//   if (!year) throw new Error("Year is required");

//   const response = sendIt(
//     `http://api.jolpi.ca/ergast/f1/${year}/constructorstandings/`,
//   );

//   if (!("StandingsTable" in response)) return;

//   const standingsTable = response.StandingsTable as StandingsTable;

//   if (!("ConstructorStandings" in standingsTable)) return;

//   const rawStandings =
//     standingsTable.ConstructorStandings as RawConstructorStanding[];

//   const processedStandings = rawStandings.map((standing) => {
//     const item: ConstructorStandingsItem = {
//       constructorId: standing.Constructor.constructorId,
//       constructorName: standing.Constructor.constructorName,
//       position: parseInt(standing.position),
//       points: parseInt(standing.points),
//       wins: parseInt(standing.wins),
//     };

//     return item;
//   });

//   // return processedStandings;
//   return NextResponse.json({ [year]: processedStandings }, { status: 200 });
// };

export const GET = async (
  request: NextRequest,
  { params }: { params: { year: string } },
): Promise<
  NextResponse<
    { [year: string]: ConstructorStandingsItem[] } | { error: string }
  >
> => {
  try {
    const year = params.year;
    // const year = request.nextUrl.searchParams.get("year");
    console.log(request.nextUrl);
    // const { year } = await request.json();

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
};
