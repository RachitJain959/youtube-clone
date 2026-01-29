import { cn } from "@/lib/utils";
import { THUMBNAIL_FALLBACK } from "@/modules/videos/constants";
import { ListVideoIcon, PlayIcon } from "lucide-react";
import Image from "next/image";

interface PlaylistThumbnailProps {
	title: string;
	videoCount: number;
	className?: string;
	imageUrl?: string | null;
}

export const PlaylistThumbnail = ({
	title,
	videoCount,
	className,
	imageUrl,
}: PlaylistThumbnailProps) => {
	return (
		<div className={cn("relative pt-3 group", className)}>
			{/* Stack effect layers */}
			<div className="relative">
				{/* Background Layers */}
				<div className="absolute -top-3 -translate-x-1/2 left-1/2 w-[97%] overflow-hidden rounded-xl bg-black/20 aspect-video" />
				<div className="absolute -top-1.5 -translate-x-1/2 left-1/2 w-[98%] overflow-hidden rounded-xl bg-black/20 aspect-video" />
				{/* Main Image */}
				<div className="relative w-full overflow-hidden rounded-xl aspect-video">
					<Image
						src={imageUrl || THUMBNAIL_FALLBACK}
						alt={title}
						className="w-full h-full object-cover"
						fill
					/>
					{/* Hover overlay */}
					<div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
						<div className="flex items-center gap-x-2">
							<PlayIcon className="size-4 text-white fill-white" />
							<span className="text-white font-medium">
								Play All
							</span>
						</div>
					</div>
				</div>
			</div>
			{/* Video Count Indicator */}
			<div className="absolute right-2 bottom-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium flex items-center gap-x-1">
				<ListVideoIcon className="size-4" />
				{videoCount} videos
			</div>
		</div>
	);
};
