import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { rentToOwnListings } from './schema'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function seed() {
  console.log('Seeding rent-to-own listings...')

  await db.insert(rentToOwnListings).values([
    {
      landlordClerkId: 'seed_landlord_1',
      title: '3 bed terraced house — Leeds',
      description: 'Rent-to-own over 5 years. 20% of rent credited toward purchase. Great for first-time buyers building a deposit.',
      address: '42 Kirkstall Road',
      city: 'Leeds',
      country: 'UK',
      monthlyRent: 1100,
      rentCreditPercent: 20,
      optionPrice: 185000,
      termMonths: 60,
      bedrooms: 3,
    },
    {
      landlordClerkId: 'seed_landlord_2',
      title: '2 bed condo — Austin',
      description: 'Lease-to-own opportunity. 15% rent credit, 3-year term. Modern build close to downtown.',
      address: '900 E 5th Street',
      city: 'Austin',
      country: 'US',
      monthlyRent: 1600,
      rentCreditPercent: 15,
      optionPrice: 320000,
      termMonths: 36,
      bedrooms: 2,
    },
    {
      landlordClerkId: 'seed_landlord_3',
      title: '2 bed townhouse — Hamilton',
      description: 'Rent-to-own with 25% credit toward purchase. 4-year term. Ideal for families.',
      address: '15 King William Street',
      city: 'Hamilton',
      country: 'Canada',
      monthlyRent: 1400,
      rentCreditPercent: 25,
      optionPrice: 410000,
      termMonths: 48,
      bedrooms: 2,
    },
  ])

  console.log('Done! 3 rent-to-own listings added.')
}

seed()