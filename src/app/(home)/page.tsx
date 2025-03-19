"use client";
import { trpc } from "@/trpc/client";

export default function Home() {
	const { data } = trpc.hello.useQuery({ text: "Ronny" });

	return <div>Client say: {data?.greeting}</div>;
}
