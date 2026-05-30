'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function EligibilityPage() {
  const [situation, setSituation] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  async function checkEligibility() {
    if (!situation.trim()) return
    setLoading(true)
    setResult('')

    try {
      const response = await fetch('/api/eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situation }),
      })
      const data = await response.json()
      setResult(data.result)
    } catch (error) {
      setResult('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        Find out what you qualify for
      </h1>
      <p className="text-gray-500 mb-8">
        Describe your situation and we'll tell you exactly which housing schemes
        you're eligible for and what to do next.
      </p>

      <div className="bg-white border border-gray-100 rounded-xl p-6 mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Tell us about your situation
        </label>
        <textarea
          className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
          rows={5}
          placeholder="e.g. I'm a single parent in Manchester with two kids, earning £22k a year. I've been on the council waiting list for 8 months. I'm currently renting privately but struggling with the cost..."
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
        />
        <Button
          className="mt-4 w-full"
          onClick={checkEligibility}
          disabled={loading || !situation.trim()}
        >
          {loading ? 'Analysing your situation...' : 'Check my eligibility'}
        </Button>
      </div>

      {result && (
        <div className="bg-teal-50 border border-teal-100 rounded-xl p-6">
          <h2 className="font-semibold text-teal-900 mb-3">
            Your housing options
          </h2>
          <div className="text-sm text-teal-800 whitespace-pre-wrap leading-relaxed">
            {result}
          </div>
        </div>
      )}
    </div>
  )
}