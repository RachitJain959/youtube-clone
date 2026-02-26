import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { APP_URL } from "@/constants";
import { PlaylistAddModal } from "@/modules/playlists/components/playlist-add-modal";
import {
	ListPlusIcon,
	MoreVerticalIcon,
	Share2Icon,
	Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface VideoMenuProps {
	videoId: string;
	variant?: "ghost" | "secondary";
	onRemove?: () => void;
}

export const VideoMenu = ({
	videoId,
	variant = "ghost",
	onRemove,
}: VideoMenuProps) => {
	const [isOpenPlaylistAddModal, setIsOpenPlaylistAddModal] = useState(false);
	const onShare = () => {
		// TODO: change url if deploying in production/outside vercel
		const fullUrl = `${APP_URL}/videos/${videoId}`;
		navigator.clipboard.writeText(fullUrl);
		toast.success("Link copied to clipboard");
	};

	return (
		<>
			<PlaylistAddModal
				videoId={videoId}
				open={isOpenPlaylistAddModal}
				onOpenChange={setIsOpenPlaylistAddModal}
			/>
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant={variant}
							size="icon"
							className="rounded-full"
						>
							<MoreVerticalIcon />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="end"
						onClick={(e) => e.stopPropagation()}
					>
						<DropdownMenuItem onClick={onShare}>
							<Share2Icon className="mr-2 size-4" />
							Share
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setIsOpenPlaylistAddModal(true)}
						>
							<ListPlusIcon className="mr-2 size-4" />
							Add to playlist
						</DropdownMenuItem>
						{onRemove && (
							<DropdownMenuItem onClick={onRemove}>
								<Trash2Icon className="mr-2 size-4" />
								Remove
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</>
	);
};
