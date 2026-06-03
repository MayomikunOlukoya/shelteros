export const dynamic = 'force-dynamic'

import { auth } from '@clerk/nextjs/server'
import { getDb } from '@/lib/db'
import { applications } from '@/lib/schema'

export async function POST(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return Response.json({ error: 'Not signed in' }, { status: 401 })
  }

  const { listingId, message } = await request.json()

  if (!listingId) {
    return Response.json({ error: 'Missing listing' }, { status: 400 })
  }

  await getDb().insert(applications).values({
    listingId,
    tenantClerkId: userId,
    message: message || null,
  })

  return Response.json({ success: true })
}