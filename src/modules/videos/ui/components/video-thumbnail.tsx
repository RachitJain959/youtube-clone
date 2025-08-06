import Image from "next/image";

export const VideoThumbnail = () => {
	return (
		<div className="relative">
			{/* {Thumnail wrapper} */}
			<div className="relative w-full rounded-xl aspect-video overflow-hidden">
				<Image
					src="/placeholder.svg"
					alt="Thumbnail"
					fill
					className="size-full object-cover"
				/>
			</div>
		</div>
	);
};
