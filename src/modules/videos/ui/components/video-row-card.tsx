import { cva, VariantProps } from "class-variance-authority";
import { VideoGetManyOutput } from "../../types";
import Link from "next/link";
import { VideoThumbnail } from "./video-thumbnail";

const videoRowCardVariants = cva("group flex min-w-0", {
	variants: {
		size: {
			default: "gap-4",
			comapct: "gap-2",
		},
	},
	defaultVariants: {
		size: "default",
	},
});

const thumbnailVariants = cva("relative flex-none", {
	variants: {
		size: {
			default: "w-[38%]",
			comapct: "w-[168px]",
		},
	},
	defaultVariants: {
		size: "default",
	},
});

interface VideoRowCardProps extends VariantProps<typeof videoRowCardVariants> {
	data: VideoGetManyOutput["items"][number];
	onRemove?: () => void;
}

export const VideoRowCardSkeleton = () => {
	return <div>Skeleton</div>;
};

export const VideoRowCard = ({ data, onRemove, size }: VideoRowCardProps) => {
	return (
		<div className={videoRowCardVariants({ size })}>
			<Link
				href={`/videos/${data.id}`}
				className={thumbnailVariants({ size })}
			>
				<VideoThumbnail
					imageUrl={data.thumbnailUrl}
					previewUrl={data.previewUrl}
					title={data.title}
					duration={data.duration}
				/>
			</Link>
		</div>
	);
};
