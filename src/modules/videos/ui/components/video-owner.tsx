import Link from "next/link";
import { VideoGetOneOutput } from "../../types";
import { UserAvatar } from "@/components/user-avatar";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { SubscriptionButton } from "@/modules/subscriptions/ui/components/subscription-button";

interface VideoOwnerProps {
	user: VideoGetOneOutput["user"];
	videoId: string;
}

export const VideoOwner = ({ user, videoId }: VideoOwnerProps) => {
	const { userId: clerkUserId } = useAuth();

	return (
		<div className="flex items-center justify-between sm:items-start sm:justify-start min-w-0 gap-3">
			<Link href={`/users/${user.id}`}>
				<div className="flex items-center min-w-0 gap-3">
					<UserAvatar
						size="lg"
						imageUrl={user.imageUrl}
						name={user.name}
					/>
					{/* <UserInfo/> */}
					<span className="text-sm text-muted-foreground line-clamp-1">
						{/* TODO: properly fill subscribers count */}
						{0} subscribers
					</span>
				</div>
			</Link>
			{clerkUserId === user.clerkId ? (
				<Button className="rounded-full" variant="secondary" asChild>
					<Link href={`/studio/videos/${videoId}`}>Edit video</Link>
				</Button>
			) : (
				<SubscriptionButton
					onClick={() => {}}
					disabled={false}
					isSubscribed={false}
					classname="flex-none"
				/>
			)}
		</div>
	);
};
