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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";

interface CommentFormProps {
	videoId: string;
	parentId: string;
	onSuccess?: () => void;
	onCancel?: () => void;
	variant?: "comment" | "reply";
}

export const CommentForm = ({
	videoId,
	onSuccess,
	parentId,
	onCancel,
	variant = "comment",
}: CommentFormProps) => {
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

	const handleCancel = () => {
		form.reset();
		onCancel?.();
	};

	return (
		<Form {...form}>
			<form
				className="flex gap-4 group"
				onSubmit={form.handleSubmit(handleSubmit)}
			>
				<UserAvatar
					size="lg"
					imageUrl={user?.imageUrl || "/user-placeholder.svg"}
					name={user?.username || "User"}
				/>
				<div className="flex-1">
					<FormField
						name="value"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										{...field}
										className="resize-none bg-transparent overflow-hidden min-h-0"
										placeholder={
											variant === "reply"
												? "Reply to this comment..."
												: "Add a comment..."
										}
										disabled={create.isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex mt-2 gap-2 justify-end">
						{onCancel && (
							<Button
								variant="ghost"
								type="button"
								onClick={handleCancel}
							>
								Cancel
							</Button>
						)}
						<Button
							type="submit"
							size="sm"
							disabled={create.isPending}
						>
							{variant === "reply" ? "Reply" : "Comment"}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};
