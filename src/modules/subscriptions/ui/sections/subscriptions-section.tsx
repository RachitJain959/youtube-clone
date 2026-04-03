"use client";

import { InfiniteScroll } from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constants";
import { VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card";
import { VideoRowCardSkeleton } from "@/modules/videos/ui/components/video-row-card";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";

export const SubscriptionsSection = () => {
	return (
		<Suspense fallback={<SubscriptionsSectionSkeleton />}>
			<ErrorBoundary fallback={<p>Error</p>}>
				<SubscriptionsSectionSuspense />
			</ErrorBoundary>
		</Suspense>
	);
};

const SubscriptionsSectionSkeleton = () => {
	return (
		<div>
			<div className="flex flex-col gap-4 gap-y-10 md:hidden">
				{Array.from({ length: 18 }).map((_, index) => (
					<VideoGridCardSkeleton key={index} />
				))}
			</div>
			<div className="hidden flex-col gap-4 md:flex">
				{Array.from({ length: 18 }).map((_, index) => (
					<VideoRowCardSkeleton key={index} size="compact" />
				))}
			</div>
		</div>
	);
};

const SubscriptionsSectionSuspense = () => {
	const utils = trpc.useUtils();
	const [subscriptions, query] =
		trpc.subscriptions.getMany.useSuspenseInfiniteQuery(
			{
				limit: DEFAULT_LIMIT,
			},
			{
				getNextPageParam: (lastPage) => lastPage.nextCursor,
			},
		);

	const unsubscribe = trpc.subscriptions.remove.useMutation({
		onSuccess: (data) => {
			toast.success("Unsubscribed");
			utils.subscriptions.getMany.invalidate();
			utils.videos.getManySubscriptions.invalidate();
			utils.users.getOne.invalidate({ id: data.creatorId });
		},
		onError: () => {
			toast.error("Something went wrong");
		},
	});

	console.log(subscriptions);

	return (
		<div>
			<div className="flex flex-col gap-4">
				{subscriptions.pages
					.flatMap((page) => page.items)
					.map((subscription) => (
						<Link
							key={subscription.creatorId}
							href={`/users/${subscription.user.id}`}
						>
							<SubscriptionItem
								name={subscription.user.name}
								imageUrl={subscription.user.imageUrl}
								subscriberCount={
									subscription.user.subscriptionsCount
								}
								onUnsubscribe={() => {
									unsubscribe.mutate({
										userId: subscription.creatorId,
									});
								}}
								disabled={unsubscribe.isPending}
							/>
						</Link>
					))}
			</div>

			<InfiniteScroll
				hasNextPage={query.hasNextPage}
				fetchNextPage={query.fetchNextPage}
				isFetchingNextPage={query.isFetchingNextPage}
			/>
		</div>
	);
};
