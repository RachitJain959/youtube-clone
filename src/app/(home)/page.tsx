import { HydrateClient, trpc } from "@/trpc/server";

// keeping track of all prefetching-or else we will have build errors
export const dynamic = "force-dynamic";

const Page = () => {
	// const { data } = trpc.hello.useQuery({ text: "Ronny" }); client-side rendering

	// we are not using trpc on the server side to get the result in a const to use it
	// we are using it to populate the data cache on the server side & then allowing the client comp to use the loaded data
	void trpc.categories.getMany.prefetch();
	return (
		<div>
			<HydrateClient>
				<></>
			</HydrateClient>
		</div>
	);
};

export default Page;
