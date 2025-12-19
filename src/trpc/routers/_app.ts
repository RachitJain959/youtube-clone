import { videosRouter } from "@/modules/videos/server/procedures";
import { studioRouter } from "@/modules/studio/server/procedures";
import { categoriesRouter } from "@/modules/categories/server/procedures";

import { createTRPCRouter } from "../init";
import { videoViewsRouter } from "@/modules/video-views/server/procedures";
import { videoReactionsRouter } from "@/modules/video-reactions/server/procedures";
import { subscriptionsRouter } from "@/modules/subscriptions/server/procedures";
import { commentsRouter } from "@/modules/comments/server/procedures";
import { commentReactionsRouter } from "@/modules/comment-reactions/server/procedures";
import { suggestionsRouter } from "@/modules/suggestions/server/procedures";

export const appRouter = createTRPCRouter({
	categories: categoriesRouter,
	videos: videosRouter,
	studio: studioRouter,
	comments: commentsRouter,
	videoViews: videoViewsRouter,
	suggestions: suggestionsRouter,
	subscriptions: subscriptionsRouter,
	videoReactions: videoReactionsRouter,
	commentReactions: commentReactionsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
