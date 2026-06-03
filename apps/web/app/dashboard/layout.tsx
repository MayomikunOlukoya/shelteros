import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/dashboard">
            <span className="text-lg font-semibold tracking-tight">ShelterOS</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/dashboard" className="hover:text-gray-900">Find housing</Link>
            <Link href="/dashboard/rent-to-own" className="hover:text-gray-900">Rent to own</Link>
            <Link href="/dashboard/adu" className="hover:text-gray-900">ADU permits</Link>
            <Link href="/dashboard/prevention" className="hover:text-gray-900">Prevention</Link>
            <Link href="/dashboard/applications" className="hover:text-gray-900">Applications</Link>
          </div>
        </div>
        <UserButton />
      </nav>
      <main className="px-8 py-8">
        {children}
      </main>
    </div>
  )
}