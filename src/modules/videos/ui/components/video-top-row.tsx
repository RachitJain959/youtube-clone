import { VideoGetOneOutput } from "../../types";
import { VideoMenu } from "./video-menu";
import { VideoOwner } from "./video-owner";
import { VideoReactions } from "./video-reactions";

interface VideoTopRowProps {
	video: VideoGetOneOutput;
}

export const VideoTopRow = ({ video }: VideoTopRowProps) => {
	return (
		<div className="flex flex-col gap-4 mt-4">
			<h1 className="text-xl font-semibold">{video.title}</h1>
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
				<VideoOwner user={video.user} videoId={video.id} />
				<div className="flex overflow-x-auto pb-2 mb-2 sm:justify-end sm:overflow-visible sm:pb-0 sm:mb-0 gap-2">
					<VideoReactions />
					<VideoMenu />
				</div>
			</div>
		</div>
	);
};
