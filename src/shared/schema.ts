import { pgTable, text, serial, integer, boolean, timestamp, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const searches = pgTable("searches", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  businessIdea: text("business_idea").notNull(),
  platforms: text("platforms").array().notNull(),
  searchType: text("search_type").notNull(),
  intentLevel: text("intent_level").notNull(),
  timeRange: text("time_range").notNull(),
  maxResults: integer("max_results").notNull(),
  resultsCount: integer("results_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const signals = pgTable("signals", {
  id: serial("id").primaryKey(),
  searchId: integer("search_id").references(() => searches.id),
  userId: integer("user_id").notNull().references(() => users.id),
  platform: text("platform").notNull(),
  title: text("title").notNull(),
  snippet: text("snippet").notNull(),
  url: text("url").notNull(),
  source: text("source").notNull(),
  relevanceScore: real("relevance_score").notNull(),
  urgencyLevel: text("urgency_level").notNull(),
  signalType: text("signal_type").notNull(),
  engagement: jsonb("engagement"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isSaved: boolean("is_saved").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

export const insertSearchSchema = createInsertSchema(searches).omit({
  id: true,
  resultsCount: true,
  createdAt: true,
});

export const insertSignalSchema = createInsertSchema(signals).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSearch = z.infer<typeof insertSearchSchema>;
export type Search = typeof searches.$inferSelect;
export type InsertSignal = z.infer<typeof insertSignalSchema>;
export type Signal = typeof signals.$inferSelect;
