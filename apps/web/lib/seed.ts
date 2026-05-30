import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { listings } from './schema'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function seed() {
  console.log('Seeding listings...')

  await db.insert(listings).values([
    {
      title: '2 bed council flat — Hackney',
      description: 'Available through Hackney council housing register. Priority given to families.',
      address: '14 Morning Lane',
      city: 'London',
      country: 'UK',
      monthlyRent: 850,
      bedrooms: 2,
      isAffordable: true,
      scheme: 'Council housing',
    },
    {
      title: '1 bed shared ownership — Manchester',
      description: 'Buy 25% share, rent the rest. Available through Homes England.',
      address: '7 Ancoats Street',
      city: 'Manchester',
      country: 'UK',
      monthlyRent: 620,
      bedrooms: 1,
      isAffordable: true,
      scheme: 'Shared ownership',
    },
    {
      title: 'Section 8 apartment — Chicago',
      description: 'Housing choice voucher accepted. 2 bed near transit.',
      address: '822 W Madison St',
      city: 'Chicago',
      country: 'US',
      monthlyRent: 950,
      bedrooms: 2,
      isAffordable: true,
      scheme: 'Section 8',
    },
    {
      title: 'Rent-geared-to-income — Toronto',
      description: 'RGI unit available through Toronto Community Housing.',
      address: '320 Spadina Ave',
      city: 'Toronto',
      country: 'Canada',
      monthlyRent: 780,
      bedrooms: 1,
      isAffordable: true,
      scheme: 'RGI',
    },
  ])

  console.log('Done! 4 listings added.')
}

seed()