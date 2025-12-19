"use client";

import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";

interface SuggestionsSectionPorps {
	videoId: string;
}

export const SuggestionsSection = ({ videoId }: SuggestionsSectionPorps) => {
	const [suggestions] = trpc.suggestions.getMany.useSuspenseInfiniteQuery(
		{
			videoId,
			limit: DEFAULT_LIMIT,
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		},
	);
	return <div>{JSON.stringify(suggestions)}</div>;
};
