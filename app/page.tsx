import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Upload, ImageIcon, Wand2, Eye, Languages } from "lucide-react"

export default function HomePage() {
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
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              PhotoGenerator
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              FAQ
            </a>
            <div className="flex items-center gap-1 text-gray-600">
              <Languages className="w-4 h-4" />
              <span>Language</span>
            </div>
          </nav>

          <Button className="bg-orange-400 hover:bg-orange-500 text-white">Start Free</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6 text-balance">AI Work Editprotips</h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 text-balance">
          AI Work Editprotips is your intelligent editing assistant that provides advanced tools, simplified workflows,
          and innovative solutions to enhance your productivity. Experience the future of AI photo editing with AI Work
          Editprotips advanced model that delivers consistent character editing and superior scene preservation. Whether
          you need AI Work Editprotips free access or professional AI Work Editprotips capabilities, our platform offers
          the best solutions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-orange-400 hover:bg-orange-500 text-white">
            Start Editing →
          </Button>
          <Button size="lg" variant="outline">
            View Examples
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span>One-shot editing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span>Multi-mode support</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span>Natural interaction</span>
          </div>
        </div>
      </section>

      {/* Try The AI Editor Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Try The AI Editor</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-balance">
            Experience the power of AI Work Editprotips natural language photo editing. Transform any photo with simple
            text commands using AI Work Editprotips advanced technology. Upload your images and use natural language to
            create stunning visuals. Get started with AI Work Editprotips free tier or upgrade to access advanced
            Experience features and Photoshop integrations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Prompt Engine */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold">Prompt Engine</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Transform your vision into AI-powered editing.</p>

            <div className="space-y-3 mb-4">
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  Photo Edit
                </Badge>
                <Badge variant="outline">Text to Photo</Badge>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center mb-4">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Drop an photo here or click to upload</p>
              <p className="text-xs text-gray-400">Max file size: 10MB JPG, PNG, WebP</p>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Main Prompt</h4>
              <p className="text-sm text-gray-600">
                A futuristic cityscape at sunset with neon lighting, cyberpunk style architecture...
              </p>
            </div>

            <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white">Generate photo</Button>
          </Card>

          {/* Output Gallery */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold">Output Gallery</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">View AI-generated photos and download instantly.</p>

            <div className="border rounded-lg p-8 text-center mb-4 bg-gray-50">
              <Eye className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Ready for instant generation</h4>
              <p className="text-sm text-gray-500">Just click photos and upload your prompts.</p>
            </div>

            <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white">Start Editing</Button>
          </Card>
        </div>
      </section>

      {/* AI Work Editprotips Prompt Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">AI Work Editprotips Prompt</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-balance">
            See how our platform transforms your photos with simple text prompts. Experience the power of our advanced
            technology.
          </p>
        </div>

        {/* Example 1 */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Original photo</h3>
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
                  <span className="text-sm font-medium">AI Prompt</span>
                </div>
                <p className="text-sm text-gray-700">
                  "Turn this photo into a beach vacation scene with the sea, the beach, and a boy surfing in the sea"
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="font-semibold">AI Generated</h3>
                <Badge className="bg-blue-100 text-blue-700">AI Photo</Badge>
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
              <Badge variant="outline">Portrait</Badge>
              <Button size="sm" className="bg-orange-400 hover:bg-orange-500 text-white">
                Try This Style →
              </Button>
            </div>
          </div>
        </div>

        {/* Example 2 */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Original photo</h3>
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
                  <span className="text-sm font-medium text-blue-600">Text Prompt</span>
                </div>
                <p className="text-sm text-gray-700">"Generate an AI 8-year-old boy riding a scooter in the park"</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="font-semibold">AI Generated</h3>
                <Badge className="bg-blue-100 text-blue-700">AI Photo</Badge>
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="/young-boy-riding-scooter-in-park-colorful.jpg"
                  alt="AI generated photo of boy on scooter"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">From Text to Reality</p>
            </div>
          </div>

          <div className="text-center mt-6">
            <div className="flex justify-center gap-2">
              <Badge variant="outline">Landscape</Badge>
              <Button size="sm" className="bg-orange-400 hover:bg-orange-500 text-white">
                Generate photo →
              </Button>
            </div>
          </div>
        </div>

        {/* Example 3 */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Original photo</h3>
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
                  <span className="text-sm font-medium text-blue-600">AI Prompt</span>
                </div>
                <p className="text-sm text-gray-700">"Fix scratches and damage, and colorize old photos"</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="font-semibold">AI Generated</h3>
                <Badge className="bg-blue-100 text-blue-700">AI Photo</Badge>
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
              <Badge variant="outline">Restore</Badge>
              <Button size="sm" className="bg-orange-400 hover:bg-orange-500 text-white">
                Fix & Colorize →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose AI Work Editprotips?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-balance">
            AI Work Editprotips is the most advanced AI photo editor on the market, offering unparalleled ease of use
            and professional-grade results. With a more Editprotips, you get access to cutting-edge AI Work Editprotips
            technology that delivers consistent character editing and AI Work Editprotips high-quality results. Start AI
            Work Editprotips free plan or explore premium features with our advanced subscription and AI Work
            Editprotips premium plans.
          </p>
        </div>
      </section>
    </div>
  )
}
