"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Upload, ImageIcon, Wand2, Eye, Download } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { GoogleSignInButton } from "@/components/GoogleSignInButton"
import { UserMenu } from "@/components/UserMenu"
import { createClient } from "@/lib/supabase/client"
import { User } from '@supabase/supabase-js'

export default function HomePage() {
  const { t } = useLanguage()
  const [user, setUser] = useState<User | null>(null)
  const [mode, setMode] = useState<"photo-edit" | "text-to-photo">("photo-edit")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [generatedResult, setGeneratedResult] = useState<string | null>(null)
  const [resultType, setResultType] = useState<"image" | "text" | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const supabase = createClient()

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (mode === "photo-edit" && !uploadedImage) {
      alert(t('editor.alertUploadImage'))
      return
    }

    if (!prompt) {
      alert(t('editor.alertEnterPrompt'))
      return
    }

    setIsGenerating(true)
    setGeneratedResult(null)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: uploadedImage,
          prompt: prompt,
          mode: mode,
        }),
      })

      const data = await response.json()
      console.log('Response data:', data)

      if (data.success) {
        setGeneratedResult(data.result)
        setResultType(data.type || 'text')
      } else {
        alert("Failed to generate: " + data.error)
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to generate image")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!generatedResult || resultType !== 'image') return

    const link = document.createElement('a')
    link.href = generatedResult
    link.download = `ai-generated-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6 text-balance">{t('hero.title')}</h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 text-balance">
          {t('hero.description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-orange-400 hover:bg-orange-500 text-white"
            onClick={() => document.getElementById('ai-editor')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('hero.startEditing')}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('hero.viewExamples')}
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span>{t('hero.feature1')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span>{t('hero.feature2')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span>{t('hero.feature3')}</span>
          </div>
        </div>
      </section>

      {/* Try The AI Editor Section */}
      <section id="ai-editor" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('editor.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-balance">
            {t('editor.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Prompt Engine */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold">{t('editor.promptEngine')}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">{t('editor.promptEngineDesc')}</p>

            <div className="space-y-3 mb-4">
              <div className="flex gap-2">
                <Badge
                  variant={mode === "photo-edit" ? "secondary" : "outline"}
                  className={mode === "photo-edit" ? "bg-orange-100 text-orange-700 cursor-pointer" : "cursor-pointer"}
                  onClick={() => setMode("photo-edit")}
                >
                  {t('editor.photoEdit')}
                </Badge>
                <Badge
                  variant={mode === "text-to-photo" ? "secondary" : "outline"}
                  className={mode === "text-to-photo" ? "bg-orange-100 text-orange-700 cursor-pointer" : "cursor-pointer"}
                  onClick={() => setMode("text-to-photo")}
                >
                  {t('editor.textToPhoto')}
                </Badge>
              </div>
            </div>

            {mode === "photo-edit" && (
              <>
                <div
                  className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center mb-4 cursor-pointer hover:border-orange-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploadedImage ? (
                    <img src={uploadedImage} alt="Uploaded" className="max-h-48 mx-auto rounded" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">{t('editor.uploadText')}</p>
                      <p className="text-xs text-gray-400">{t('editor.fileSize')}</p>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </>
            )}

            <div className="mb-4">
              <h4 className="font-medium mb-2">{t('editor.mainPrompt')}</h4>
              <textarea
                className="w-full border rounded-lg p-3 text-sm min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder={t('editor.promptPlaceholder')}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <Button
              className="w-full bg-orange-400 hover:bg-orange-500 text-white"
              onClick={handleGenerate}
              disabled={isGenerating || (mode === "photo-edit" && !uploadedImage) || !prompt}
            >
              {isGenerating ? t('editor.generating') : t('editor.generateNow')}
            </Button>
          </Card>

          {/* Output Gallery */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold">{t('editor.outputGallery')}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">{t('editor.outputGalleryDesc')}</p>

            <div className="border rounded-lg p-8 text-center mb-4 bg-gray-50 min-h-[300px] flex items-center justify-center overflow-auto">
              {isGenerating ? (
                <div>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
                  <p className="text-sm text-gray-600">{t('editor.generatingImage')}</p>
                </div>
              ) : generatedResult ? (
                <div className="w-full space-y-4">
                  {resultType === 'image' ? (
                    <>
                      <img src={generatedResult} alt="Generated" className="max-w-full h-auto rounded-lg shadow-lg mx-auto" />
                      <Button
                        onClick={handleDownload}
                        className="bg-orange-400 hover:bg-orange-500 text-white"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {t('editor.downloadImage')}
                      </Button>
                    </>
                  ) : (
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-left whitespace-pre-wrap">{generatedResult}</p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div>
                    <Eye className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <h4 className="font-medium mb-1">{t('editor.readyForGeneration')}</h4>
                    <p className="text-sm text-gray-500">{t('editor.uploadPrompts')}</p>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* AI Work Editprotips Prompt Section */}
      <section id="examples" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('examples.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-balance">
            {t('examples.description')}
          </p>
        </div>

        {/* Example 1 */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="text-center">
              <h3 className="font-semibold mb-2">{t('examples.originalPhoto')}</h3>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="/young-boy-skateboarding-in-park.jpg"
                  alt="Original photo of boy skateboarding"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wand2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">{t('examples.aiPrompt')}</span>
                </div>
                <p className="text-sm text-gray-700">
                  {t('examples.prompt1')}
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="font-semibold">{t('examples.aiGenerated')}</h3>
                <Badge className="bg-blue-100 text-blue-700">{t('examples.aiPhoto')}</Badge>
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="/boy-surfing-on-beach-with-ocean-waves.jpg"
                  alt="AI generated photo of boy surfing"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <div className="flex justify-center gap-2 mb-4">
              <Badge variant="outline">{t('examples.portrait')}</Badge>
              <Button size="sm" className="bg-orange-400 hover:bg-orange-500 text-white">
                {t('examples.tryThisStyle')}
              </Button>
            </div>
          </div>
        </div>

        {/* Example 2 */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="text-center">
              <h3 className="font-semibold mb-2">{t('examples.originalPhoto')}</h3>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="/young-boy-skateboarding-in-park-black-and-white.jpg"
                  alt="Original photo of boy skateboarding"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wand2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">{t('examples.textPrompt')}</span>
                </div>
                <p className="text-sm text-gray-700">{t('examples.prompt2')}</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="font-semibold">{t('examples.aiGenerated')}</h3>
                <Badge className="bg-blue-100 text-blue-700">{t('examples.aiPhoto')}</Badge>
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="/young-boy-riding-scooter-in-park-colorful.jpg"
                  alt="AI generated photo of boy on scooter"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">{t('examples.fromTextToReality')}</p>
            </div>
          </div>

          <div className="text-center mt-6">
            <div className="flex justify-center gap-2">
              <Badge variant="outline">{t('examples.landscape')}</Badge>
              <Button size="sm" className="bg-orange-400 hover:bg-orange-500 text-white">
                {t('examples.generatePhoto')}
              </Button>
            </div>
          </div>
        </div>

        {/* Example 3 */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="text-center">
              <h3 className="font-semibold mb-2">{t('examples.originalPhoto')}</h3>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="/black-and-white-vintage-family-photo.jpg"
                  alt="Original vintage family photo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wand2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">{t('examples.aiPrompt')}</span>
                </div>
                <p className="text-sm text-gray-700">{t('examples.prompt3')}</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="font-semibold">{t('examples.aiGenerated')}</h3>
                <Badge className="bg-blue-100 text-blue-700">{t('examples.aiPhoto')}</Badge>
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="/colorized-vintage-family-photo-restored.jpg"
                  alt="AI restored and colorized family photo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <div className="flex justify-center gap-2">
              <Badge variant="outline">{t('examples.restore')}</Badge>
              <Button size="sm" className="bg-orange-400 hover:bg-orange-500 text-white">
                {t('examples.fixColorize')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('whyChoose.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-balance">
            {t('whyChoose.description')}
          </p>
        </div>
      </section>
    </div>
  )
}
