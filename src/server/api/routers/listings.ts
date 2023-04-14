/* eslint-disable @typescript-eslint/no-floating-promises */
import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const listing = await ctx.prisma.listing.create({
        data: {
          ...input,
          userId: ctx.userId,
        },
      });
      return listing;
    }),
});
