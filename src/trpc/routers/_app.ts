import { videosRouter } from "@/modules/videos/procedures";
import { studioRouter } from "@/modules/studio/server/procedures";
import { categoriesRouter } from "@/modules/categories/server/procedures";

import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
	categories: categoriesRouter,
	videos: videosRouter,
	studio: studioRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
