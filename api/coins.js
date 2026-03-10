export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ message: 'Method Not Allowed' })
  }

  const apiKey = process.env.COINRANKING_API_KEY

  if (!apiKey) {
    return response.status(500).json({ message: 'Missing COINRANKING_API_KEY' })
  }

  const targetUrl = new URL('https://api.coinranking.com/v2/coins')

  for (const [key, value] of Object.entries(request.query)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        targetUrl.searchParams.append(key, item)
      }
      continue
    }

    if (value !== undefined) {
      targetUrl.searchParams.set(key, value)
    }
  }

  try {
    const upstreamResponse = await fetch(targetUrl, {
      headers: {
        'x-access-token': apiKey,
      },
    })

    const data = await upstreamResponse.json()

    return response.status(upstreamResponse.status).json(data)
  } catch {
    return response.status(502).json({ message: 'Upstream request failed' })
  }
}
