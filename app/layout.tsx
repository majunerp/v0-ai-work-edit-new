import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LanguageProvider } from "@/contexts/LanguageContext"
import "./globals.css"

export const metadata: Metadata = {
  title: "AI Work Editprotips - Advanced AI Photo Generator and Editor",
  description:
    "AI Work Editprotips is your intelligent editing assistant that provides advanced tools, simplified workflows, and innovative solutions to enhance your productivity",
  generator: "v0.app",
  alternates: {
    canonical: "https://www.aiworkeditprotips.net/",
  },
  openGraph: {
    title: "AI Work Editprotips - Advanced AI Photo Generator and Editor",
    description: "AI Work Editprotips is your intelligent editing assistant offering advanced tools, simplified workflows, and innovative solutions to boost productivity.",
    url: "https://www.aiworkeditprotips.net/",
    type: "website",
    images: [
      {
        url: "https://www.aiworkeditprotips.net/og-image.jpg",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AI Work Editprotips",
              "url": "https://www.aiworkeditprotips.net/",
              "logo": "https://www.aiworkeditprotips.net/logo.png",
              "sameAs": [
                "https://www.facebook.com/yourpage",
                "https://twitter.com/yourpage",
                "https://www.linkedin.com/company/yourpage"
              ]
            })
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <LanguageProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  )
}
