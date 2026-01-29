import Link from "next/link";
import { PlaylistGetManyOutput } from "../../types";
import { THUMBNAIL_FALLBACK } from "@/modules/videos/constants";
import { PlaylistThumbnail } from "./playlist-thumbnail";

interface PlaylistGridCardProps {
	data: PlaylistGetManyOutput["items"][number];
}

export const PlaylistGridCard = ({ data }: PlaylistGridCardProps) => {
	return (
		<Link href={`/playlists/${data.id}`}>
			<div className="flex flex-col gap-2 w-full group">
				<PlaylistThumbnail
					title={data.name}
					videoCount={data.videoCount}
					imageUrl={THUMBNAIL_FALLBACK}
				/>
			</div>
		</Link>
	);
};
