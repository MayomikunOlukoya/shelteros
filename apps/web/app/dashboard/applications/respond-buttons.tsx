'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function RespondButtons({ applicationId }: { applicationId: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')

  async function respond(decision: 'accepted' | 'rejected') {
    setStatus('loading')
    try {
      const res = await fetch('/api/applications/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId, decision }),
      })
      if (!res.ok) throw new Error()
      window.location.reload()
    } catch {
      setStatus('idle')
    }
  }

  return (
    <div className="flex gap-3">
      <Button onClick={() => respond('accepted')} disabled={status === 'loading'}>
        Accept
      </Button>
      <Button variant="outline" onClick={() => respond('rejected')} disabled={status === 'loading'}>
        Reject
      </Button>
    </div>
  )
}