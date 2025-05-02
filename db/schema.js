import {
  pgTable,
  serial,
  text,
  varchar,
  date,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

// users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password_hash: text("password_hash").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// calendar table
export const calendar = pgTable("calendar", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  start_date: date("start_date").notNull(),
  hour: varchar("hour", { length: 50 }).notNull(),
  location: text("location"),
  description: text("description"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// suggestions table
export const suggestions = pgTable("suggestions", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  start_date: date("start_date").notNull(),
  hour: varchar("hour", { length: 50 }).notNull(),
  location: text("location"),
  description: text("description"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// documents table
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id),
  file_name: varchar("file_name", { length: 255 }).notNull(),
  file_url: text("file_url").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
