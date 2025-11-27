import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/user-avatar";
import { useUser } from "@clerk/nextjs";

interface CommentFormProps {
	videoId: string;
	onSubmit?: () => void;
}

export const CommentForm = ({ videoId, onSubmit }: CommentFormProps) => {
	const { user } = useUser();

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
