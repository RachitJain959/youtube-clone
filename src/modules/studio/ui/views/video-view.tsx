import { FormSection } from "../sections/form-section";

interface VideoViewProps {
	videoId: string;
}

export const VideoView = ({ videoId }: VideoViewProps) => {
	return (
		// max-w-screen-lg w-full
		<div className="px-4 pt-2.5 max-w-screen-lg">
			<FormSection videoId={videoId} />
		</div>
	);
};
