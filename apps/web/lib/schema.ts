import { pgTable, text, timestamp, uuid, integer, boolean } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkId: text('clerk_id').notNull().unique(),
  email: text('email').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  country: text('country'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const listings = pgTable('listings', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  address: text('address').notNull(),
  city: text('city').notNull(),
  country: text('country').notNull(),
  monthlyRent: integer('monthly_rent'),
  bedrooms: integer('bedrooms'),
  isAffordable: boolean('is_affordable').default(true),
  scheme: text('scheme'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})