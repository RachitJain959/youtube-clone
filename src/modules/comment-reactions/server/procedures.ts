import { db } from "@/db";
import { commentReactions } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, eq } from "drizzle-orm";
import z from "zod";

export const commentReactionsRouter = createTRPCRouter({
	like: protectedProcedure
		.input(z.object({ commentId: z.string().uuid() }))
		.mutation(async ({ ctx, input }) => {
			const { id: userId } = ctx.user;
			const { commentId } = input;

			const [existingCommentReactionLike] = await db
				.select()
				.from(commentReactions)
				.where(
					and(
						eq(commentReactions.commentId, commentId),
						eq(commentReactions.userId, userId),
						eq(commentReactions.type, "like"),
					),
				);

			if (existingCommentReactionLike) {
				const [deletedViewerReaction] = await db
					.delete(commentReactions)
					.where(
						and(
							eq(commentReactions.commentId, commentId),
							eq(commentReactions.userId, userId),
						),
					)
					.returning();

				return deletedViewerReaction;
			}

			const [createdCommentReaction] = await db
				.insert(commentReactions)
				.values({ userId, commentId, type: "like" })
				// check notes
				.onConflictDoUpdate({
					target: [
						commentReactions.commentId,
						commentReactions.userId,
					],
					set: {
						type: "like",
					},
				})
				.returning();

			return createdCommentReaction;
		}),
	dislike: protectedProcedure
		.input(z.object({ commentId: z.string().uuid() }))
		.mutation(async ({ ctx, input }) => {
			const { id: userId } = ctx.user;
			const { commentId } = input;

			const [existingCommentReactiondislike] = await db
				.select()
				.from(commentReactions)
				.where(
					and(
						eq(commentReactions.commentId, commentId),
						eq(commentReactions.userId, userId),
						eq(commentReactions.type, "dislike"),
					),
				);

			if (existingCommentReactiondislike) {
				const [deletedViewerReaction] = await db
					.delete(commentReactions)
					.where(
						and(
							eq(commentReactions.commentId, commentId),
							eq(commentReactions.userId, userId),
						),
					)
					.returning();

				return deletedViewerReaction;
			}

			const [createdCommentReaction] = await db
				.insert(commentReactions)
				.values({ userId, commentId, type: "dislike" })
				// check notes
				.onConflictDoUpdate({
					target: [
						commentReactions.commentId,
						commentReactions.userId,
					],
					set: {
						type: "dislike",
					},
				})
				.returning();

			return createdCommentReaction;
		}),
});
