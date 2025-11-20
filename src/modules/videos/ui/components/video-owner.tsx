import Link from "next/link";
import { VideoGetOneOutput } from "../../types";
import { UserAvatar } from "@/components/user-avatar";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { SubscriptionButton } from "@/modules/subscriptions/ui/components/subscription-button";
import { UserInfo } from "@/modules/users/ui/components/user-info";
import { useSubscriptions } from "@/modules/subscriptions/hooks/use-subscriptions";

interface VideoOwnerProps {
	user: VideoGetOneOutput["user"];
	videoId: string;
}

export const VideoOwner = ({ user, videoId }: VideoOwnerProps) => {
	const { userId: clerkUserId, isLoaded } = useAuth();
	const { onClick, isPending } = useSubscriptions({
		userId: user.id,
		isSubscribed: user.viewerSubscribed,
		fromVideoId: videoId,
	});

	return (
		<div className="flex items-center justify-between sm:items-start sm:justify-start min-w-0 gap-3">
			<Link href={`/users/${user.id}`}>
				<div className="flex items-center min-w-0 gap-3">
					<UserAvatar
						size="lg"
						imageUrl={user.imageUrl}
						name={user.name}
					/>
					<div className="flex flex-col gap-1 min-w-0">
						<UserInfo size="lg" name={user.name} />
						<span className="text-sm text-muted-foreground line-clamp-1">
							{/* TODO: properly fill subscribers count */}
							{user.subscriberCount} subscribers
						</span>
					</div>
				</div>
			</Link>
			{clerkUserId === user.clerkId ? (
				<Button className="rounded-full" variant="secondary" asChild>
					<Link href={`/studio/videos/${videoId}`}>Edit video</Link>
				</Button>
			) : (
				<SubscriptionButton
					onClick={onClick}
					disabled={isPending || !isLoaded}
					isSubscribed={user.viewerSubscribed}
					classname="flex-none"
				/>
			)}
		</div>
	);
};
