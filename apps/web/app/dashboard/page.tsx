export const dynamic = 'force-dynamic'
import { currentUser } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { listings } from '@/lib/schema'
import Link from 'next/link'

export default async function DashboardPage() {
  const user = await currentUser()
  const allListings = await db.select().from(listings)

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        Welcome back{user?.firstName ? `, ${user.firstName}` : ''}
      </h1>
      <p className="text-gray-500 mb-8">Available affordable housing near you</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
        {allListings.map((listing) => (
          <Link href="/dashboard/eligibility" key={listing.id}>
            <div className="bg-white border border-gray-100 rounded-xl p-6 hover:border-teal-200 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium bg-teal-50 text-teal-700 px-2 py-1 rounded-full">
                  {listing.scheme}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  £{listing.monthlyRent}/mo
                </span>
              </div>
              <h2 className="font-semibold text-gray-900 mb-1">{listing.title}</h2>
              <p className="text-sm text-gray-500 mb-3">{listing.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>📍 {listing.city}, {listing.country}</span>
                <span>🛏 {listing.bedrooms} bed</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}