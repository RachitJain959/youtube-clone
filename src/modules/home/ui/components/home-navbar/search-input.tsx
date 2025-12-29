import { APP_URL } from "@/constants";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

/* TODO: Add search functionality */
export const SearchInput = () => {
	const router = useRouter();
	const [value, setValue] = useState("");

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const url = new URL(
			"/search",
			APP_URL ? `https://${APP_URL}` : "https://localhost:3000",
		);
		const newQuery = value.trim();

		url.searchParams.set("query", encodeURIComponent(newQuery));

		if (newQuery === "") {
			url.searchParams.delete("query");
		}

		setValue(newQuery);
		router.push(url.toString());
	};

	return (
		<form className="flex w-full w-max-[600px]">
			<div className="relative w-full">
				<input
					type="text"
					placeholder="Search"
					className="w-full pl-4 py-2 pr-12 rounded-l-full border focus:outline-none focus:border-blue-500"
				/>

				{/* TODO: Add/Remove search button */}
			</div>
			<button
				type="submit"
				className="px-5 py-2.5 bg-gray-100 rounded-r-full border border-l-0 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
			>
				<SearchIcon className="size-5" />
			</button>
		</form>
	);
};
