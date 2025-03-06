import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import sendIt from "@/server/clients/track-rev/api-client";
import type {
  ConstructorStandingsItem,
  RawConstructorStanding,
  StandingsTable,
} from "@/types/track-rev";

export const trackRevRouter = createTRPCRouter({
  constructorStandings: publicProcedure
    .input(
      z.object({
        year: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const year = input.year;

      const response = await sendIt(
        `http://api.jolpi.ca/ergast/f1/${year}/constructorstandings/`,
      );

      if (!("StandingsTable" in response)) return;

      const standingsTable = response.StandingsTable as StandingsTable;

      if (!("ConstructorStandings" in standingsTable)) return;

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

      return processedStandings;
    }),
});

// export const postRouter = createTRPCRouter({
//   hello: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       };
//     }),

//   create: publicProcedure
//     .input(z.object({ name: z.string().min(1) }))
//     .mutation(async ({ ctx, input }) => {
//       return ctx.db.post.create({
//         data: {
//           name: input.name,
//         },
//       });
//     }),

//   getLatest: publicProcedure.query(async ({ ctx }) => {
//     const post = await ctx.db.post.findFirst({
//       orderBy: { createdAt: "desc" },
//     });

//     return post ?? null;
//   }),
// });
