import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'


export const createClientSupabase = () => createPagesBrowserClient()

export const createServerSupabase = () =>
    createServerComponentClient({ cookies })

// 🔧 Дополни этим — для middleware
export const createMiddlewareSupabase = (req: NextRequest) => {
    return createMiddlewareClient({ req, res: NextResponse.next() })
}
