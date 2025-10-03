import { db } from "@/db";
import { videos } from "@/db/schema";
import { serve } from "@upstash/workflow/nextjs";
import { and, eq } from "drizzle-orm";

interface InputType {
	userId: string;
	videoId: string;
}

export const { POST } = serve(
	async (context) => {
		const input = context.requestPayload as InputType;
		console.log("Workflow input:", input); // add this
		const { videoId, userId } = input;

		const video = await context.run("get-video", async () => {
			const [existingVideo] = await db
				.select()
				.from(videos)
				.where(and(eq(videos.id, videoId), eq(videos.userId, userId)));

			if (!existingVideo) {
				throw new Error("Not found");
			}

			return existingVideo;
		});
		await context.run("update-video", async () => {
			await db
				.update(videos)
				.set({ title: "Updated from background jobs" })
				.where(
					and(
						eq(videos.id, video.id),
						eq(videos.userId, video.userId),
					),
				);
		});
	},
	{
		env: {
			QSTASH_TOKEN: process.env.QSTASH_TOKEN!,
			QSTASH_CURRENT_SIGNING_KEY: process.env.QSTASH_CURRENT_SIGNING_KEY!,
			QSTASH_NEXT_SIGNING_KEY: process.env.QSTASH_NEXT_SIGNING_KEY!,
		},
	},
);
