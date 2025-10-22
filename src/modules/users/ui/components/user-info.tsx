import { cva, VariantProps } from "class-variance-authority";

const userInfoVariants = cva("flex items-center gap-1", {
	variants: {
		size: {
			default: "[&_p]:text-sm [&_svg]:size-4",
			lg: "[&_p]:text-base [&_svg]:size-5 [&_p]:font-medium [&_p]:text-black",
			sm: "[&_p]:text-xs [&_svg]:size-3.5",
		},
	},
	defaultVariants: {
		size: "default",
	},
});

interface userInforProps extends VariantProps<typeof userInfoVariants> {
	name: string;
	classname?: string;
}
