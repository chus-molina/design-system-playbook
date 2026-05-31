export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

export default async function PlaybookLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, blocked')
    .eq('id', user.id)
    .single()

  const isAdmin = profile?.role === 'admin'

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isAdmin={isAdmin} user={user} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header isAdmin={isAdmin} />
        <main className="flex-1 p-8 w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
