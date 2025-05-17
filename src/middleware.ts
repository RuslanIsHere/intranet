import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const {data: { session },} = await supabase.auth.getSession()

    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')

    // Если пользователь неавторизован и не на /auth — редирект
    if (!session && !isAuthPage) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/auth'
        return NextResponse.redirect(redirectUrl)
    }

    return res
}

export const config = {
    matcher: ['/((?!_next|static|favicon.ico).*)'], // исключаем только тех. ресурсы
}
