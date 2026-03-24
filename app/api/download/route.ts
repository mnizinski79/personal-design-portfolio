import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  const filename = request.nextUrl.searchParams.get('filename') ?? 'download'

  if (!url) {
    return new NextResponse('Missing url parameter', { status: 400 })
  }

  // Only allow Sanity CDN URLs
  if (!url.startsWith('https://cdn.sanity.io/')) {
    return new NextResponse('Invalid URL', { status: 403 })
  }

  const response = await fetch(url)
  if (!response.ok) {
    return new NextResponse('Failed to fetch file', { status: 502 })
  }

  const contentType = response.headers.get('content-type') ?? 'application/octet-stream'
  const body = await response.arrayBuffer()

  return new NextResponse(body, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
