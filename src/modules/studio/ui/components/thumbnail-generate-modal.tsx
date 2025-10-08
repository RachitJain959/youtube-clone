import { ResponsiveModal } from "@/components/responsive-modal";
import { Form } from "@/components/ui/form";
import { UploadDropzone } from "@/lib/uploadthing";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

interface ThumbnailGenerateModalProps {
	videoId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
	prompt: z.string().min(10),
});

export const ThumbnailGenerateModal = ({
	videoId,
	open,
	onOpenChange,
}: ThumbnailGenerateModalProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
		},
	});

	const utils = trpc.useUtils();

	const onUploadComplete = () => {
		utils.studio.getOne.invalidate();
		utils.studio.getMany.invalidate();
		onOpenChange(false);
	};

	return (
		<ResponsiveModal
			title="Upload a modal"
			open={open}
			onOpenChange={onOpenChange}
		>
			<Form></Form>
		</ResponsiveModal>
	);
};
