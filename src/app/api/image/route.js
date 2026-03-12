import { NextResponse } from 'next/server'

const IMAGE_ORIGIN = (process.env.NEXT_PUBLIC_IMAGE_ORIGIN || '').replace(/\/$/, '')

const joinUrl = (base, path) => `${base}${path.startsWith('/') ? path : `/${path}`}`

const normalizePath = (rawPath) => {
  if (typeof rawPath !== 'string') return null
  let decodedPath
  try {
    decodedPath = decodeURIComponent(rawPath).trim()
  } catch {
    return null
  }
  if (!decodedPath || decodedPath.includes('://')) return null
  return decodedPath.startsWith('/') ? decodedPath : `/${decodedPath}`
}

const unique = (items) => [...new Set(items)]

const buildCandidates = (origin, path) => {
  const cleanedPath = path.replace(/^\/+/, '')

  return unique([
    joinUrl(origin, `/${cleanedPath}`),
    joinUrl(origin, `/image/${cleanedPath}`),
    joinUrl(origin, `/images/${cleanedPath}`),
  ])
}

export async function GET(request) {
  if (!IMAGE_ORIGIN) {
    return NextResponse.json(
      { error: 'Missing NEXT_PUBLIC_IMAGE_ORIGIN environment variable.' },
      { status: 500 }
    )
  }

  const searchParams = request.nextUrl.searchParams
  const normalizedPath = normalizePath(searchParams.get('path'))
  if (!normalizedPath) {
    return NextResponse.json({ error: 'Invalid image path.' }, { status: 400 })
  }

  const candidates = buildCandidates(IMAGE_ORIGIN, normalizedPath)

  for (const candidateUrl of candidates) {
    try {
      const upstreamResponse = await fetch(candidateUrl, {
        cache: 'force-cache',
      })

      if (!upstreamResponse.ok) continue

      const data = await upstreamResponse.arrayBuffer()
      const contentType =
        upstreamResponse.headers.get('content-type') || 'application/octet-stream'

      return new NextResponse(data, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
      })
    } catch {
      // Ignore failed candidate and continue fallback chain.
    }
  }

  return NextResponse.json(
    { error: 'Image not found in origin paths.', path: normalizedPath },
    { status: 404 }
  )
}
