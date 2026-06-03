'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function PayButton({ listingId }: { listingId: string }) {
  const [loading, setLoading] = useState(false)

  async function pay() {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setLoading(false)
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <Button className="mt-3 w-full" onClick={pay} disabled={loading}>
      {loading ? 'Redirecting to payment...' : 'Pay first month\'s rent'}
    </Button>
  )
}