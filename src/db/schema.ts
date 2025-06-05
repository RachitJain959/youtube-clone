import { relations } from "drizzle-orm";
import {
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable(
	"users",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		clerkId: text("clerk_id").unique().notNull(),
		name: text("name").notNull(),
		imageUrl: text("image_url").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [uniqueIndex("clerk_id_idx").on(t.clerkId)], // creating index on clerk_id to query faster
);

export const userRelations = relations(users, ({ many }) => ({
	videos: many(videos),
}));

export const categories = pgTable(
	"categories",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		name: text("name").notNull().unique(),
		description: text("description"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [uniqueIndex("name_idx").on(t.name)], // creating index on clerk_id to query faster
);

export const categoryRelations = relations(users, ({ many }) => ({
	videos: many(videos),
}));

export const videos = pgTable("videos", {
	id: uuid("id").primaryKey().defaultRandom(),
	title: text("title").notNull(),
	description: text("description"),
	userId: uuid("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	categoryId: uuid("category_id").references(() => categories.id, {
		onDelete: "set null",
	}),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// this type of relation is not required as the above foreign key works similarly. But important to learn for different type of relational queries like PlanetSpace where foreign key does not exist
export const vdeoRelations = relations(videos, ({ one }) => ({
	users: one(users, {
		fields: [videos.userId],
		references: [users.id],
	}),
	category: one(categories, {
		fields: [videos.categoryId],
		references: [categories.id],
	}),
}));
