'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function ApplyButton({ listingId }: { listingId: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'applied' | 'error'>('idle')

  async function apply() {
    setStatus('loading')
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId }),
      })
      if (!res.ok) throw new Error()
      setStatus('applied')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'applied') {
    return (
      <div className="mt-4 text-sm font-medium text-teal-700 bg-teal-50 rounded-lg py-2 text-center">
        ✓ Application sent
      </div>
    )
  }

  return (
    <Button
      className="mt-4 w-full"
      onClick={apply}
      disabled={status === 'loading'}
    >
      {status === 'loading' ? 'Sending...' : status === 'error' ? 'Try again' : 'Apply'}
    </Button>
  )
}