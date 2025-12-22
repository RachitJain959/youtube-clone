import { cva, VariantProps } from "class-variance-authority";
import { VideoGetManyOutput } from "../../types";

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

interface videoRowCardProps extends VariantProps<typeof videoRowCardVariants> {
	data: VideoGetManyOutput["items"][number];
	onRemove: () => void;
}

export const videoRowCardSkeleton = () => {
	return <div>Skeleton</div>;
};

export const videoRowCard = ({ data, onRemove, size }: videoRowCardProps) => {
	return <div></div>;
};
