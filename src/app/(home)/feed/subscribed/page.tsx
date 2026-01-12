import { DEFAULT_LIMIT } from "@/constants";
import { TrendingView } from "@/modules/home/ui/views/trending-view";
import { HydrateClient, trpc } from "@/trpc/server";

// keeping track of all prefetching-or else we will have build errors
export const dynamic = "force-dynamic";

const Page = async () => {
	void trpc.videos.getManySubscribed.prefetchInfinite({
		limit: DEFAULT_LIMIT,
	});

	return (
		<div>
			<HydrateClient>
				<TrendingView />
			</HydrateClient>
		</div>
	);
};

export default Page;
