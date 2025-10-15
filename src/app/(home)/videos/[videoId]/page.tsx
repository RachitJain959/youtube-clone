import { HydrateClient, trpc } from "@/trpc/server";

interface PageParams {
	params: Promise<{ videoId: string }>;
}

const Page = async ({ params }: PageParams) => {
	const { videoId } = await params;

	void trpc.videos.getOne.prefetch({ id: videoId });

	return (
		<HydrateClient>
			<></>
		</HydrateClient>
	);
};

export default Page;
