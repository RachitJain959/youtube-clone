interface CommentFormProps {
	videoId: string;
	onSubmit?: () => void;
}

export const CommentForm = ({ videoId, onSubmit }: CommentFormProps) => {
	return <form></form>;
};
