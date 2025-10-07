"use client"

import { Button } from "@/components/ui/button"
import { Wand2 } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { GoogleSignInButton } from "@/components/GoogleSignInButton"
import { UserMenu } from "@/components/UserMenu"
import { User } from '@supabase/supabase-js'

interface HeaderProps {
  user: User | null
}

export function Header({ user }: HeaderProps) {
  const { t } = useLanguage()

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl">AI Work Editprotips</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {t('nav.features')}
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('ai-editor')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {t('nav.photoGenerator')}
          </a>
          <LanguageSwitcher />
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <GoogleSignInButton />
          )}

          <Button
            className="bg-orange-400 hover:bg-orange-500 text-white"
            onClick={() => document.getElementById('ai-editor')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('nav.startFree')}
          </Button>
        </div>
      </div>
    </header>
  )
}
