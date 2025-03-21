import { trpc } from "@/trpc/server";
import { PageClient } from "./client";

export default async function Home() {
	// const { data } = trpc.hello.useQuery({ text: "Ronny" }); client-side rendering

	// we are not using trpc on the server side to get the result in a const to use it
	// we are using it to populate the data cache on the server side & then allowing the client comp to use the loaded data
	void trpc.hello.prefetch({ text: "Ronny" });
	return (
		<div>
			<PageClient />
		</div>
	);
}
