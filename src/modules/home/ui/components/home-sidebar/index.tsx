import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { MainItem } from "./main-item";
import { PersonalItem } from "./personal-item";
import { Separator } from "@/components/ui/separator";
import { SignedIn } from "@clerk/nextjs";
import { SubscriptionsItem } from "./subscriptions-item";

export const HomeSidebar = () => {
	return (
		<Sidebar className="pt-16 z-40 border-none" collapsible="icon">
			<SidebarContent className="bg-background">
				<MainItem />
				<Separator />
				<PersonalItem />
				<SignedIn>
					<>
						<Separator />
						<SubscriptionsItem />
					</>
				</SignedIn>
			</SidebarContent>
		</Sidebar>
	);
};
