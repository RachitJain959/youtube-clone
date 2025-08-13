import Image from "next/image";

interface VideoThumbnailProps {
	imageUrl?: string | null;
}

export const VideoThumbnail = ({ imageUrl }: VideoThumbnailProps) => {
	return (
		<div className="relative">
			{/* {Thumnail wrapper} */}
			<div className="relative w-full rounded-xl aspect-video overflow-hidden">
				<Image
					src={imageUrl ?? "/placeholder.svg"}
					alt="Thumbnail"
					fill
					className="size-full object-cover"
				/>
			</div>
		</div>
	);
};
