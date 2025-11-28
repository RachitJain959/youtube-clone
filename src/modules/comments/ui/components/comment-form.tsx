import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser, useClerk } from "@clerk/nextjs";

import { trpc } from "@/trpc/client";
import { commentInsertSchema } from "@/db/schema";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/user-avatar";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CommentFormProps {
	videoId: string;
	onSuccess?: () => void;
}

export const CommentForm = ({ videoId, onSuccess }: CommentFormProps) => {
	const { user } = useUser();

	const clerk = useClerk();
	const utils = trpc.useUtils();
	const create = trpc.comments.create.useMutation({
		onSuccess: () => {
			utils.comments.getMany.invalidate({ videoId });
			form.reset();
			toast.success("Comment Added");
			onSuccess?.();
		},
		onError: (error) => {
			toast.error("Something went wrong");
			if (error.data?.code === "UNAUTHORIZED") {
				clerk.openSignIn();
			}
		},
	});

	const form = useForm<z.infer<typeof commentInsertSchema>>({
		resolver: zodResolver(commentInsertSchema.omit({ userId: true })),
		defaultValues: {
			videoId,
			value: "",
		},
	});

	const handleSubmit = (values: z.infer<typeof commentInsertSchema>) => {
		create.mutate(values);
	};

	return (
		<form className="flex gap-4 group">
			<UserAvatar
				size="lg"
				imageUrl={user?.imageUrl || "/user-placeholder.svg"}
				name={user?.username || "User"}
			/>
			<div className="flex-1">
				<Textarea
					className="resize-none bg-transparent overflow-hidden min-h-0"
					placeholder="Add a comment..."
				/>
				<div className="flex mt-2 gap-2 justify-end">
					<Button type="submit" size="sm">
						Comment
					</Button>
				</div>
			</div>
		</form>
	);
};
