import { db } from "@/db";
import { categories } from "@/db/schema";

// Precisely using bun here as it can run Typescript scripts with ES6 imports

const categoryNames = [
	"Gaming",
	"Coding",
	"Football",
	"Cricket",
	"Sports",
	"Tanmay Bhat",
	"Comedy",
	"The Office",
	"Music",
	"Mixes",
	"Comedy clubs",
	"Engineering",
	"Google",
	"Live",
	"Real Madrid",
];

async function main() {
	console.log("Seeding categories...");

	try {
		const values = categoryNames.map((name) => ({
			name,
			description: `Videos related to ${name.toLowerCase()}`,
		}));

		await db.insert(categories).values(values);

		console.log("Categories seeded successfully");
	} catch (error) {
		console.error("Error seeding categories", error);
		process.exit(1);
	}
}

main();
