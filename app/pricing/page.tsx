"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

const pricingPlans = [
  {
    name: "Free",
    price: {
      monthly: 0,
      yearly: 0
    },
    description: "Perfect for trying out our AI photo editing",
    features: [
      "2 free generations",
      "Essential templates",
      "Email support",
      "512x512 downloads",
      "Watermark on images"
    ],
    cta: "Get Started",
    popular: false,
    priceId: null
  },
  {
    name: "Pro",
    price: {
      monthly: 7.99,
      yearly: 79.99
    },
    description: "Unlimited AI-powered photo editing",
    features: [
      "Unlimited generations",
      "Full template library",
      "High-resolution downloads (1024x1024)",
      "Watermark-free results",
      "Priority email support",
      "Early access to new templates",
      "Monthly template additions"
    ],
    cta: "Start 7-Day Trial",
    popular: true,
    priceId: {
      monthly: "price_monthly_pro",
      yearly: "price_yearly_pro"
    }
  }
]

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubscribe = async (plan: typeof pricingPlans[0]) => {
    if (plan.price.monthly === 0) {
      router.push("/")
      return
    }

    setLoading(plan.name)

    try {
      // Check if user is logged in
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // Redirect to login or show login modal
        alert("Please sign in to subscribe")
        setLoading(null)
        return
      }

      // Create checkout session
      const response = await fetch("/api/creem/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          priceId: billingPeriod === "monthly" ? plan.priceId?.monthly : plan.priceId?.yearly,
          userId: user.id,
          email: user.email
        })
      })

      const data = await response.json()

      if (data.checkoutUrl) {
        // Redirect to Creem checkout
        window.location.href = data.checkoutUrl
      } else {
        throw new Error("Failed to create checkout session")
      }
    } catch (error) {
      console.error("Subscription error:", error)
      alert("Failed to start subscription. Please try again.")
    } finally {
      setLoading(null)
    }
  }

  const yearlyDiscount = () => {
    const monthlyTotal = pricingPlans[1].price.monthly * 12
    const yearlyPrice = pricingPlans[1].price.yearly
    const discount = ((monthlyTotal - yearlyPrice) / monthlyTotal * 100).toFixed(0)
    return discount
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <span className="font-bold text-xl">AI Work Editprotips</span>
          </div>
          <Button variant="ghost" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Start free and upgrade whenever you want. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                billingPeriod === "monthly"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                billingPeriod === "yearly"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Yearly
              <span className="ml-2 text-xs text-orange-600 font-bold">
                Save {yearlyDiscount()}%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative p-8 ${
                plan.popular
                  ? "border-2 border-orange-400 shadow-xl"
                  : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-400 text-white">
                  Most Popular
                </Badge>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-5xl font-bold">
                    ${billingPeriod === "monthly" ? plan.price.monthly : (plan.price.yearly / 12).toFixed(2)}
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
                {billingPeriod === "yearly" && plan.price.yearly > 0 && (
                  <p className="text-sm text-gray-500">
                    Billed ${plan.price.yearly}/year
                  </p>
                )}
              </div>

              <Button
                className={`w-full mb-6 ${
                  plan.popular
                    ? "bg-orange-400 hover:bg-orange-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
                onClick={() => handleSubscribe(plan)}
                disabled={loading === plan.name}
              >
                {loading === plan.name ? "Processing..." : plan.cta}
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12 space-y-2">
          <p className="text-sm text-gray-600">
            🔒 Secure payment guaranteed
          </p>
          <p className="text-sm text-gray-600">
            ✨ 7-day risk-free trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  )
}
