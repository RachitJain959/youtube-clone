"use client";

import { Button } from "@/components/ui/button";
import { APP_URL } from "@/constants";
import { SearchIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* TODO: Add search functionality */
export const SearchInput = () => {
	const router = useRouter();
	const [value, setValue] = useState("");

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const url = new URL("/search", APP_URL);
		const newQuery = value.trim();

		url.searchParams.set("query", encodeURIComponent(newQuery));

		if (newQuery === "") {
			url.searchParams.delete("query");
		}

		setValue(newQuery);
		router.push(url.toString());
	};

	return (
		<form className="flex w-full w-max-[600px]" onSubmit={handleSearch}>
			<div className="relative w-full">
				<input
					value={value}
					onChange={(e) => setValue(e.target.value)}
					type="text"
					placeholder="Search"
					className="w-full pl-4 py-2 pr-12 rounded-l-full border focus:outline-none focus:border-blue-500"
				/>
				{value && (
					<Button
						type="button"
						size="icon"
						variant="ghost"
						className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
					>
						<XIcon className="text-gray-500" />
					</Button>
				)}
			</div>
			<button
				disabled={!value.trim()}
				type="submit"
				className="px-5 py-2.5 bg-gray-100 rounded-r-full border border-l-0 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
			>
				<SearchIcon className="size-5" />
			</button>
		</form>
	);
};
