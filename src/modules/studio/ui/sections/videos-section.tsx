"use client";
import { trpc } from "@/trpc/client";

import { DEFAULT_LIMIT } from "@/constants";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { InfiniteScroll } from "@/components/infinite-scroll";

export const VideosSection = () => {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<ErrorBoundary fallback={<p>Error</p>}>
				<VideosSectionSuspense />
			</ErrorBoundary>
		</Suspense>
	);
};

const VideosSectionSuspense = () => {
	const [data, query] = trpc.studio.getMany.useSuspenseInfiniteQuery(
		{
			limit: DEFAULT_LIMIT,
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		},
	);
	return (
		<div>
			{JSON.stringify(data)}
			<InfiniteScroll
				isManual
				hasNextPage={query.hasNextPage}
				fetchNextPage={query.fetchNextPage}
				isFetchingNextPage={query.isFetchingNextPage}
			/>
		</div>
	);
};
