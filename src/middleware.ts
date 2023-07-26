import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { generateToken, getUserFromToken } from './services/auth/token'
import { generateExpirationDate } from './utils/generate'

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get('token')?.value
  if (!token) {
    const newToken = await generateToken()
    const expirationDate = generateExpirationDate()
    const response = NextResponse.redirect(request.url)

    response.cookies.set({
      name: 'token',
      value: newToken,
      path: '/',
      httpOnly: true,
      expires: expirationDate,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    })

    return response
  }

  const isTokenNotVerified = !getUserFromToken(token)
  if (isTokenNotVerified) {
    return NextResponse.json({ message: 'Invalid token.' }, { status: 401 })
  }
}

export const config = {
  matcher: ['/api/:function*']
}
