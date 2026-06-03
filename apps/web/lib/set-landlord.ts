import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { rentToOwnListings } from './schema'
import { eq } from 'drizzle-orm'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function run() {
  await db
    .update(rentToOwnListings)
    .set({ landlordClerkId: 'user_3EV433sz3CfgPE61idkFiMxdA9i' })
    .where(eq(rentToOwnListings.landlordClerkId, 'seed_landlord_1'))

  console.log('Done! You are now the landlord of the Leeds listing.')
}

run()