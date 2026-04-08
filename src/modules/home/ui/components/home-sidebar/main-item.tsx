"use client";
import Link from "next/link";
import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react";
import { useAuth, useClerk } from "@clerk/nextjs";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const items = [
	{
		title: "Home",
		url: "/",
		icon: HomeIcon,
	},
	{
		title: "Subscriptions",
		url: "/feed/subscriptions",
		icon: PlaySquareIcon,
		auth: true, //This pg will only be rendered to authorized users.
	},
	{
		title: "Trending",
		url: "/feed/trending",
		icon: FlameIcon,
	},
];

export const MainItem = () => {
	const pathName = usePathname();
	const clerk = useClerk();
	const { isSignedIn } = useAuth();

	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								tooltip={item.title}
								asChild
								isActive={pathName === item.url}
								onClick={(e) => {
									if (!isSignedIn && item.auth) {
										e.preventDefault();
										return clerk.openSignIn();
									}
								}}
							>
								<Link
									prefetch
									href={item.url}
									className="flex items-center gap-4"
								>
									<item.icon />
									<span className="text-sm">
										{item.title}
									</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};
