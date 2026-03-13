import { UserAvatar } from "@/components/user-avatar";
import { UserGetOneOutput } from "../../types";
import { useAuth, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SubscriptionButton } from "@/modules/subscriptions/ui/components/subscription-button";
import { useSubscriptions } from "@/modules/subscriptions/hooks/use-subscriptions";
import { cn } from "@/lib/utils";

interface UserPageInfoProps {
	user: UserGetOneOutput;
}

export const UserPageInfo = ({ user }: UserPageInfoProps) => {
	const { userId, isLoaded } = useAuth();
	const clerk = useClerk();

	const { onClick, isPending } = useSubscriptions({
		userId: user.id,
		isSubscribed: user.viewerSubscribed,
	});

	return (
		<div className="py-6">
			{/* Mobile layout */}
			<div className="flex flex-col md:hidden">
				<div className="flex items-center gap-3">
					<UserAvatar
						size="lg"
						name={user.name}
						imageUrl={user.imageUrl}
						className="h-[60px] w-[60px]"
						onClick={() => {
							if (user.clerkId === userId) {
								clerk.openUserProfile();
							}
						}}
					/>
					<div className="flex-1 min-w-0">
						<h1 className="text-xl font-bold">{user.name}</h1>
						<div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
							<span>{user.subscriberCount} subscribers </span>
							<span>&bull;</span>
							<span>{user.videoCount} videos </span>
						</div>
					</div>
				</div>
				{userId === user.clerkId ? (
					<Button
						variant="secondary"
						asChild
						className="w-full mt-3 rounded-full"
					>
						<Link href="/studio">Go to studio</Link>
					</Button>
				) : (
					<SubscriptionButton
						onClick={onClick}
						disabled={isPending || !isLoaded}
						isSubscribed={user.viewerSubscribed}
						classname="w-full mt-3"
					/>
				)}
			</div>
			{/* Desktop layout */}
			<div className="hidden items-start gap-4 md:flex">
				<UserAvatar
					size="xl"
					name={user.name}
					imageUrl={user.imageUrl}
					className={cn(
						userId === user.clerkId &&
							"cursor-pointer hover:opacity-80 transition-opacity duration-300",
					)}
					onClick={() => {
						if (user.clerkId === userId) {
							clerk.openUserProfile();
						}
					}}
				/>
				<div className="flex-1 min-w-0">
					<h1 className="text-4xl font-bold">{user.name}</h1>
					<div className="flex items-center gap-1 text-sm text-muted-foreground mt-3">
						<span>{user.subscriberCount} subscribers </span>
						<span>&bull;</span>
						<span>{user.videoCount} videos </span>
					</div>
					{userId === user.clerkId ? (
						<Button
							variant="secondary"
							asChild
							className="mt-3 rounded-full"
						>
							<Link href="/studio">Go to studio</Link>
						</Button>
					) : (
						<SubscriptionButton
							onClick={onClick}
							disabled={isPending || !isLoaded}
							isSubscribed={user.viewerSubscribed}
							classname="mt-3"
						/>
					)}
				</div>
			</div>
		</div>
	);
};
