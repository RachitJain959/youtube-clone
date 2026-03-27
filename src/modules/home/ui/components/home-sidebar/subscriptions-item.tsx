"use client";
import Link from "next/link";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { UserAvatar } from "@/components/user-avatar";

export const SubscriptionsItem = () => {
	const pathName = usePathname();
	const { data } = trpc.subscriptions.getMany.useInfiniteQuery(
		{
			limit: DEFAULT_LIMIT,
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		},
	);

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Subscriptions</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{data?.pages
						.flatMap((page) => page.items)
						.map((subscriptions) => (
							<SidebarMenuItem
								key={`${subscriptions.creatorId}-${subscriptions.viewerId}`}
							>
								<SidebarMenuButton
									tooltip={subscriptions.user.name}
									asChild
									isActive={
										pathName ===
										`/users/${subscriptions.user.id}`
									}
								>
									<Link
										href={`/users/${subscriptions.user.id}`}
										className="flex items-center gap-4"
									>
										<UserAvatar
											name={subscriptions.user.name}
											imageUrl={
												subscriptions.user.imageUrl
											}
											size="xs"
										/>
										<span className="text-sm">
											{subscriptions.user.name}
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
