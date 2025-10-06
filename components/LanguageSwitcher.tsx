"use client"

import { useState } from "react"
import { Languages } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Languages className="w-4 h-4" />
        <span>{t('nav.language')}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-20">
            <button
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 ${
                language === 'en' ? 'bg-orange-50 text-orange-700' : ''
              }`}
              onClick={() => {
                setLanguage('en')
                setIsOpen(false)
              }}
            >
              {language === 'en' && <span>✓</span>}
              <span>English</span>
            </button>
            <button
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 ${
                language === 'hi' ? 'bg-orange-50 text-orange-700' : ''
              }`}
              onClick={() => {
                setLanguage('hi')
                setIsOpen(false)
              }}
            >
              {language === 'hi' && <span>✓</span>}
              <span>Hindi</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
