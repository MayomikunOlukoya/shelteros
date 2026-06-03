export const dynamic = 'force-dynamic'

import { auth } from '@clerk/nextjs/server'
import { getDb } from '@/lib/db'
import { applications, rentToOwnListings } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { RespondButtons } from './respond-buttons'

export default async function ApplicationsPage() {
  const { userId } = await auth()
  const db = getDb()

  // Get the listings this landlord owns
  const myListings = await db
    .select()
    .from(rentToOwnListings)
    .where(eq(rentToOwnListings.landlordClerkId, userId!))

  // For each listing, get its applications
  const rows = []
  for (const listing of myListings) {
    const apps = await db
      .select()
      .from(applications)
      .where(eq(applications.listingId, listing.id))
    for (const app of apps) {
      rows.push({ listing, app })
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Applications</h1>
      <p className="text-gray-500 mb-8">People who have applied to your rent-to-own listings.</p>

      {rows.length === 0 ? (
        <p className="text-gray-400">No applications yet.</p>
      ) : (
        <div className="space-y-4 max-w-3xl">
          {rows.map(({ listing, app }) => (
            <div key={app.id} className="bg-white border border-gray-100 rounded-xl p-6">
              <div className="flex items-start justify-between mb-2">
                <h2 className="font-semibold text-gray-900">{listing.title}</h2>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  app.status === 'accepted' ? 'bg-teal-50 text-teal-700' :
                  app.status === 'rejected' ? 'bg-red-50 text-red-700' :
                  'bg-amber-50 text-amber-700'
                }`}>
                  {app.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Applicant ID: {app.tenantClerkId.slice(0, 16)}…
              </p>
              {app.status === 'pending' && (
                <RespondButtons applicationId={app.id} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}