import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const allowedEmails = sqliteTable("allowed_emails", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const dubbingHistory = sqliteTable("dubbing_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(),
  userEmail: text("user_email").notNull(),
  originalFileName: text("original_file_name").notNull(),
  targetLanguage: text("target_language").notNull(),
  transcription: text("transcription"),
  translation: text("translation"),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});
