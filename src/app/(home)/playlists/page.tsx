import { HydrateClient } from "@/trpc/server";
import { PlaylistsView } from "@/modules/playlists/ui/views/playlists-view";

const Page = () => {
	return (
		<HydrateClient>
			<PlaylistsView />
		</HydrateClient>
	);
};

export default Page;
