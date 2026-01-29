import Link from "next/link";
import { PlaylistGetManyOutput } from "../../types";

interface PlaylistGridCardProps {
	data: PlaylistGetManyOutput["items"][number];
}

export const PlaylistGridCard = ({ data }: PlaylistGridCardProps) => {
	return (
		<Link href={`/playlists/${data.id}`}>
			<div>{data.name} </div>
		</Link>
	);
};
