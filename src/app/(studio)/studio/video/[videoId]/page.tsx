import { HydrateClient, trpc } from "@/trpc/server";

// fetching calls needs it to be dynmic
export const dynamic = "force-dynamic";

interface PageProps {
	params: Promise<{ videoId: string }>;
}

const Page = async ({ params }: PageProps) => {
	const { videoId } = await params;

	void trpc.studio.getOne({ id: videoId });
	return <HydrateClient>Video Id</HydrateClient>;
};

export default Page;
