import { SidebarHeader } from "@/components/ui/sidebar";
import { UserAvatar } from "@/components/user-avatar";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const StudioSidearHeader = () => {
	const user = useUser();
	return (
		<SidebarHeader className="flex items-center justify-center pb-4">
			<Link href="/users/current">
				<UserAvatar />
			</Link>
		</SidebarHeader>
	);
};

export default StudioSidearHeader;
