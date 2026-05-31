export const dynamic = 'force-dynamic'
import Anthropic from '@anthropic-ai/sdk'
import { db } from '@/lib/db'
import { listings } from '@/lib/schema'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: Request) {
  const { situation } = await request.json()

  const allListings = await db.select().from(listings)

  const listingsSummary = allListings
    .map(l => `- ${l.title} (${l.scheme}, ${l.city} ${l.country}, £${l.monthlyRent}/mo, ${l.bedrooms} bed)`)
    .join('\n')

  const stream = await anthropic.messages.stream({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a UK/US/Canada housing advisor helping people find affordable housing they qualify for.

Here is the user's situation:
${situation}

Here are the available listings in our database:
${listingsSummary}

Based on their situation, tell them:
1. Which listings they most likely qualify for and why
2. What steps they should take first
3. Any documents they should start gathering

Be warm, clear, and practical. Use plain English — no jargon. Keep it under 300 words.`,
      },
    ],
  })

  const response = await stream.finalMessage()
  const text = response.content[0].type === 'text' ? response.content[0].text : ''

  return Response.json({ result: text })
}