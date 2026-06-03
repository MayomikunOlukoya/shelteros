export const dynamic = 'force-dynamic'

import { getDb } from '@/lib/db'
import { rentToOwnListings } from '@/lib/schema'
import { ApplyButton } from './apply-button'
import { PayButton } from './pay-button'

function formatMoney(amount: number, country: string) {
  const symbol = country === 'US' ? '$' : country === 'Canada' ? 'C$' : '£'
  return `${symbol}${amount.toLocaleString()}`
}

export default async function RentToOwnPage() {
  const listings = await getDb().select().from(rentToOwnListings)

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Rent to own</h1>
      <p className="text-gray-500 mb-8">
        Build toward owning your home. A portion of every month's rent counts toward the purchase.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
        {listings.map((listing) => {
          const monthlyCredit = Math.round(
            listing.monthlyRent * (listing.rentCreditPercent / 100)
          )
          const totalCredit = monthlyCredit * listing.termMonths

          return (
            <div key={listing.id} className="bg-white border border-gray-100 rounded-xl p-6">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full">
                  {listing.rentCreditPercent}% rent credit
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {formatMoney(listing.monthlyRent, listing.country)}/mo
                </span>
              </div>

              <h2 className="font-semibold text-gray-900 mb-1">{listing.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{listing.description}</p>

              <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Purchase price</span>
                  <span className="text-gray-900 font-medium">{formatMoney(listing.optionPrice, listing.country)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Term</span>
                  <span className="text-gray-900 font-medium">{listing.termMonths} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Credited toward purchase</span>
                  <span className="text-teal-700 font-medium">{formatMoney(totalCredit, listing.country)}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-400 mt-4">
                <span>📍 {listing.city}, {listing.country}</span>
                <span>🛏 {listing.bedrooms} bed</span>
              </div>
              <ApplyButton listingId={listing.id} />
              <PayButton listingId={listing.id} />
            </div>
          )
        })}
      </div>
    </div>
  )
}