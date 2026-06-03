export const runtime = 'nodejs'

import { getStripe } from '@/lib/stripe'
import { getDb } from '@/lib/db'
import { payments } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return Response.json({ error: 'Missing signature' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    return Response.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  const stripe = getStripe()

  let event
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return Response.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any
    const db = getDb()

    // Idempotency: only record this session if we haven't already
    const existing = await db
      .select()
      .from(payments)
      .where(eq(payments.stripeSessionId, session.id))

    if (existing.length === 0) {
      await db.insert(payments).values({
        stripeSessionId: session.id,
        listingId: session.metadata.listingId,
        tenantClerkId: session.metadata.tenantClerkId,
        amount: session.amount_total,
        currency: session.currency,
      })
      console.log('Payment recorded for session', session.id)
    }
  }

  return Response.json({ received: true })
}