import { SidebarProvider } from "@/components/ui/sidebar";
import { StudioNavbar } from "../components/studio-navbar";
import { HomeSidebar } from "../components/home-sidebar";

interface StudioLayoutProps {
	children: React.ReactNode;
}

export const StudioLayout = ({ children }: StudioLayoutProps) => {
	return (
		<SidebarProvider>
			<div className="w-full">
				<StudioNavbar />
				<div className="min-h-screen flex pt-[4rem]">
					<HomeSidebar />
					<main className="flex-1 overflow-y-auto">{children}</main>
				</div>
			</div>
		</SidebarProvider>
	);
};
