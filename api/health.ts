export const config = {
  runtime: 'edge',
}

export default function handler(request: Request) {
  console.log('=== API ACCESS ===')
  console.log('method:', request.method)
  console.log('url:', request.url)
  console.log('user-agent:', request.headers.get('user-agent'))
  console.log('x-forwarded-for:', request.headers.get('x-forwarded-for'))

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}
