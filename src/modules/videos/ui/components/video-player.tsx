"use client";

import MuxPlayer from "@mux/mux-player-react";
import { THUMBNAIL_FALLBACK } from "../../constants";

interface VideoPlayerProps {
	playbackId: string | null | undefined;
	thumbnailUrl: string | null | undefined;
	autoplay?: boolean;
	onPlay?: () => void;
}

export const VideoPlayer = ({
	playbackId,
	thumbnailUrl,
	autoplay,
	onPlay,
}: VideoPlayerProps) => {
	if (!playbackId) return null;
	return (
		<MuxPlayer
			playbackId={playbackId}
			playerInitTime={0}
			thumbnailTime={0}
			poster={thumbnailUrl || THUMBNAIL_FALLBACK}
			autoPlay={autoplay}
			className="h-full w-full object-contain"
			accentColor="#FF2056"
			onPlay={onPlay}
		/>
	);
};
