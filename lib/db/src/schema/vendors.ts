import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const vendorApplicationsTable = pgTable("vendor_applications", {
  id: serial("id").primaryKey(),
  businessName: text("business_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  website: text("website"),
  instagram: text("instagram"),
  category: text("category").notNull(),
  regions: text("regions").notNull(),
  yearsActive: text("years_active"),
  bio: text("bio").notNull(),
  portfolioUrl: text("portfolio_url"),
  hearAboutUs: text("hear_about_us"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertVendorApplicationSchema = createInsertSchema(
  vendorApplicationsTable,
).omit({
  id: true,
  createdAt: true,
});

export type InsertVendorApplication = z.infer<
  typeof insertVendorApplicationSchema
>;
export type VendorApplication =
  typeof vendorApplicationsTable.$inferSelect;
