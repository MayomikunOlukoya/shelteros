export const dynamic = 'force-dynamic'

import { auth } from '@clerk/nextjs/server'
import { getStripe } from '@/lib/stripe'
import { getDb } from '@/lib/db'
import { rentToOwnListings } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) {
    return Response.json({ error: 'Not signed in' }, { status: 401 })
  }

  const { listingId } = await request.json()
  if (!listingId) {
    return Response.json({ error: 'Missing listing' }, { status: 400 })
  }

  const db = getDb()
  const [listing] = await db
    .select()
    .from(rentToOwnListings)
    .where(eq(rentToOwnListings.id, listingId))

  if (!listing) {
    return Response.json({ error: 'Listing not found' }, { status: 404 })
  }

  const stripe = getStripe()
  const origin = request.headers.get('origin') || 'http://localhost:3000'

  const currency = listing.country === 'US' ? 'usd' : listing.country === 'Canada' ? 'cad' : 'gbp'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: `Monthly rent — ${listing.title}`,
            description: `Rent payment for ${listing.address}, ${listing.city}`,
          },
          unit_amount: listing.monthlyRent * 100,
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/dashboard/rent-to-own?paid=true`,
    cancel_url: `${origin}/dashboard/rent-to-own?canceled=true`,
    metadata: {
      listingId: listing.id,
      tenantClerkId: userId,
    },
  })

  return Response.json({ url: session.url })
}