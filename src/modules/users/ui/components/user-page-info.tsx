import { UserAvatar } from "@/components/user-avatar";
import { UserGetOneOutput } from "../../types";
import { useAuth, useClerk } from "@clerk/nextjs";

interface UserPageInfoProps {
	user: UserGetOneOutput;
}

export const UserPageInfo = ({ user }: UserPageInfoProps) => {
	const { userId } = useAuth();
	const clerk = useClerk();
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
				</div>
			</div>
		</div>
	);
};
