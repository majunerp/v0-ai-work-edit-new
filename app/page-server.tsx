import { createClient } from '@/lib/supabase/server'
import HomePageClient from './HomePageClient'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return <HomePageClient user={user} />
}
