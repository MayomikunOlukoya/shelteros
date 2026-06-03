export const dynamic = 'force-dynamic'

import { auth } from '@clerk/nextjs/server'
import { getDb } from '@/lib/db'
import { applications, rentToOwnListings } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) {
    return Response.json({ error: 'Not signed in' }, { status: 401 })
  }

  const { applicationId, decision } = await request.json()

  if (!applicationId || !['accepted', 'rejected'].includes(decision)) {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }

  const db = getDb()

  // Find the application and its listing
  const [application] = await db
    .select()
    .from(applications)
    .where(eq(applications.id, applicationId))

  if (!application) {
    return Response.json({ error: 'Application not found' }, { status: 404 })
  }

  // Verify the logged-in user owns the listing this application is for
  const [listing] = await db
    .select()
    .from(rentToOwnListings)
    .where(eq(rentToOwnListings.id, application.listingId))

  if (!listing || listing.landlordClerkId !== userId) {
    return Response.json({ error: 'Not authorized' }, { status: 403 })
  }

  await db
    .update(applications)
    .set({ status: decision })
    .where(eq(applications.id, applicationId))

  return Response.json({ success: true })
}