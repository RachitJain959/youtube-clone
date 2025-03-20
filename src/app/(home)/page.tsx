import { trpc } from "@/trpc/server";

export default async function Home() {
	// const { data } = trpc.hello.useQuery({ text: "Ronny" }); client-side rendering

	const data = await trpc.hello({ text: "Ronny" });
	return <div>Client say: {data?.greeting}</div>;
}
