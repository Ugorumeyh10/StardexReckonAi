import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { EnhancedChatbot } from "@/components/chatbot/enhanced-chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StardexReckonAi - AI Reconciliation System",
  description: "Automated reconciliation system for banking and financial services",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <EnhancedChatbot />
        </Providers>
      </body>
    </html>
  )
}

