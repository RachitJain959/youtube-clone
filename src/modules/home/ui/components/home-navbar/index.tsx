import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export const HomeNavbar = () => {
	return (
		<nav className="fixed top-0 left-0 right-0 h-16 flex bg-white items-center px-2 pr-5 z-50">
			<div className="flex items-center gap-4 w-full">
				<div className="flex items-center flex-shrink-00">
					<SidebarTrigger />
					<Link href="/">
						<div className="flex items-center gap-1 p-4">
							<Image
								src="/logo.svg"
								width={32}
								height={32}
								alt="logo"
							/>
							<p className="text-xl tracking-tight font-semibold">
								YouTube
							</p>
						</div>
					</Link>
				</div>
			</div>
		</nav>
	);
};
