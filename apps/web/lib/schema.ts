import { pgTable, text, timestamp, uuid, integer, boolean, numeric } from 'drizzle-orm/pg-core'

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

export const rentToOwnListings = pgTable('rent_to_own_listings', {
  id: uuid('id').defaultRandom().primaryKey(),
  landlordClerkId: text('landlord_clerk_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  address: text('address').notNull(),
  city: text('city').notNull(),
  country: text('country').notNull(),
  monthlyRent: integer('monthly_rent').notNull(),
  rentCreditPercent: integer('rent_credit_percent').notNull(),
  optionPrice: integer('option_price').notNull(),
  termMonths: integer('term_months').notNull(),
  bedrooms: integer('bedrooms'),
  status: text('status').notNull().default('available'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const applications = pgTable('applications', {
  id: uuid('id').defaultRandom().primaryKey(),
  listingId: uuid('listing_id').notNull(),
  tenantClerkId: text('tenant_clerk_id').notNull(),
  status: text('status').notNull().default('pending'),
  message: text('message'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  stripeSessionId: text('stripe_session_id').notNull().unique(),
  listingId: uuid('listing_id').notNull(),
  tenantClerkId: text('tenant_clerk_id').notNull(),
  amount: integer('amount').notNull(),
  currency: text('currency').notNull(),
  status: text('status').notNull().default('succeeded'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})