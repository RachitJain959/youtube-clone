import { SidebarHeader } from "@/components/ui/sidebar";
import { UserAvatar } from "@/components/user-avatar";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const StudioSidearHeader = () => {
	const { user } = useUser();

	if (!user) return null;

	return (
		<SidebarHeader className="flex items-center justify-center pb-4">
			<Link href="/users/current">
				<UserAvatar
					imageUrl={user.imageUrl}
					name={user.fullName ?? "User"}
					className="size-[112px] hover:opacity-80 transition-opacity"
				/>
			</Link>
			<div className="flex flex-col mt-2 items-center">
				<p className="text-sm font-medium">Your Profile</p>
				<p className="text-xs text-muted-foreground">{user.fullName}</p>
			</div>
		</SidebarHeader>
	);
};

export default StudioSidearHeader;
