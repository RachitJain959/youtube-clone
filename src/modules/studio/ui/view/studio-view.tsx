"use client";

import { trpc } from "@/trpc/client";
import { VideosSetion } from "../sections/video-section";
import { DEFAULT_LIMIT } from "@/constants";

export const StudioView = () => {
	const [data] = trpc.studio.getMany.useSuspenseInfiniteQuery({
		limit: DEFAULT_LIMIT}, {
            getNextPageParam: (lastPage)=>lastPage.nextCursor,
        }
	});
	return <VideosSetion />;
};
