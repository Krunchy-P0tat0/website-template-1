import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const inquiriesTable = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  service: text("service").notNull(),
  eventDate: text("event_date").notNull(),
  destinationEvent: text("destination_event").notNull(),
  occasion: text("occasion").notNull(),
  office: text("office").notNull(),
  destinationServices: text("destination_services").notNull(),
  guests: integer("guests").notNull(),
  location: text("location").notNull(),
  venue: text("venue"),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  additional: text("additional"),
  hearAboutUs: text("hear_about_us"),
  status: text("status").default("new").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertInquirySchema = createInsertSchema(inquiriesTable).omit({
  id: true,
  createdAt: true,
});

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiriesTable.$inferSelect;
