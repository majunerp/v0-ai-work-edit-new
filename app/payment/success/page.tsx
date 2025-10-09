"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Loader2 } from "lucide-react"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate verification delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <Card className="p-12 text-center max-w-md">
          <Loader2 className="w-16 h-16 text-orange-400 mx-auto mb-4 animate-spin" />
          <h2 className="text-2xl font-bold mb-2">Processing Payment...</h2>
          <p className="text-gray-600">Please wait while we confirm your subscription</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <Card className="p-12 text-center max-w-md">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>

        <p className="text-gray-600 mb-8">
          Thank you for subscribing to AI Work Editprotips Pro! Your account has been upgraded and you can now enjoy unlimited AI-powered photo editing.
        </p>

        <div className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-orange-800">
              <strong>What's next?</strong>
              <br />
              Start creating amazing AI-edited photos right away with your Pro features!
            </p>
          </div>

          {sessionId && (
            <p className="text-xs text-gray-500">
              Session ID: {sessionId}
            </p>
          )}

          <Button
            className="w-full bg-orange-400 hover:bg-orange-500 text-white"
            onClick={() => router.push("/")}
          >
            Start Creating
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/account")}
          >
            View My Account
          </Button>
        </div>
      </Card>
    </div>
  )
}
