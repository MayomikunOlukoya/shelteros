import { currentUser } from '@clerk/nextjs/server'

export default async function DashboardPage() {
  const user = await currentUser()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        Welcome back{user?.firstName ? `, ${user.firstName}` : ''}
      </h1>
      <p className="text-gray-500 mb-8">What would you like to do today?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <div className="text-2xl mb-3">🔍</div>
          <h2 className="font-semibold text-gray-900 mb-1">Find housing</h2>
          <p className="text-sm text-gray-500">Search affordable homes and social housing schemes you qualify for.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <div className="text-2xl mb-3">🏠</div>
          <h2 className="font-semibold text-gray-900 mb-1">Rent to own</h2>
          <p className="text-sm text-gray-500">Find landlords offering rent-to-own agreements and build equity.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <div className="text-2xl mb-3">🏗️</div>
          <h2 className="font-semibold text-gray-900 mb-1">ADU permits</h2>
          <p className="text-sm text-gray-500">Check what you can build on your property and apply for permits.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <div className="text-2xl mb-3">🛡️</div>
          <h2 className="font-semibold text-gray-900 mb-1">Prevention</h2>
          <p className="text-sm text-gray-500">Get support before a housing crisis happens.</p>
        </div>
      </div>
    </div>
  )
}