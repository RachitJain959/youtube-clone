import { DEFAULT_LIMIT } from "@/constants";
import { SubscriptionsView } from "@/modules/home/ui/views/subscriptions-view";
import { HydrateClient, trpc } from "@/trpc/server";

// keeping track of all prefetching-or else we will have build errors
export const dynamic = "force-dynamic";

const Page = async () => {
	void trpc.videos.getManySubscriptions.prefetchInfinite({
		limit: DEFAULT_LIMIT,
	});

	return (
		<div>
			<HydrateClient>
				<SubscriptionsView />
			</HydrateClient>
		</div>
	);
};

export default Page;
