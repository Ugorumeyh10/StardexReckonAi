"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/protected-route"

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I upload my first reconciliation file?",
        a: "Navigate to the Upload Files page, select your file type (bank, settlement, etc.), and drag & drop your file. The system will automatically detect the format and guide you through mapping.",
      },
      {
        q: "What file formats are supported?",
        a: "StardexReckonAi supports Excel (.xlsx, .xls), CSV, TXT, and XML formats. Files can be up to 100MB in size.",
      },
      {
        q: "How long does reconciliation take?",
        a: "Processing time depends on file size. Typically, 1 million rows process in under 5 minutes. You can track progress in real-time on the dashboard.",
      },
    ],
  },
  {
    category: "Exceptions",
    questions: [
      {
        q: "What types of exceptions can occur?",
        a: "Common exceptions include amount mismatches, date differences, missing entries, duplicates, and timing differences. Each exception is automatically classified by our AI.",
      },
      {
        q: "How do I resolve exceptions?",
        a: "Review exceptions in the Exceptions page. The AI provides explanations and suggested actions. You can resolve individually or use bulk actions for multiple exceptions.",
      },
      {
        q: "Can I assign exceptions to team members?",
        a: "Yes, you can assign exceptions to team members. Use the assignment feature or bulk assignment for multiple exceptions.",
      },
    ],
  },
  {
    category: "Matching Rules",
    questions: [
      {
        q: "How do I create custom matching rules?",
        a: "Go to Rules Builder page. Use the visual rule builder to create rules with conditions like exact match, fuzzy match, or range matching. Test your rules before saving.",
      },
      {
        q: "What is fuzzy matching?",
        a: "Fuzzy matching allows partial matches when exact matches aren't found. You can set a similarity threshold (e.g., 85%) for transaction IDs or other fields.",
      },
      {
        q: "Can I use multiple rules?",
        a: "Yes, you can create multiple rules with different priorities. Rules are evaluated in priority order until a match is found.",
      },
    ],
  },
  {
    category: "Reports & Analytics",
    questions: [
      {
        q: "What reports are available?",
        a: "You can generate daily reconciliation reports, aging exception reports, channel trend reports, SLA tracking reports, and audit reports in PDF, Excel, or CSV formats.",
      },
      {
        q: "Can I create custom reports?",
        a: "Yes, use the Custom Report Builder to create reports with your selected fields. Save templates for future use.",
      },
      {
        q: "How do I access analytics?",
        a: "Visit the Analytics page for trend analysis, channel performance, exception insights, and performance metrics with interactive charts.",
      },
    ],
  },
  {
    category: "Security & Compliance",
    questions: [
      {
        q: "Is my data secure?",
        a: "Yes, StardexReckonAi uses bank-grade security with AES-256 encryption, MFA support, and comprehensive audit logging. All data is encrypted at rest and in transit.",
      },
      {
        q: "Does it comply with regulations?",
        a: "Yes, the platform is designed for GDPR and NDPR compliance with data retention policies, right to deletion, and comprehensive audit trails.",
      },
      {
        q: "Who can access my data?",
        a: "Access is controlled through role-based permissions. Only authorized users in your organization can access data, with complete audit logging of all activities.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFAQs = faqs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0)

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center space-y-4 animate-fadeIn">
                <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
                <p className="text-muted-foreground">
                  Find answers to common questions about StardexReckonAi
                </p>
              </div>

              <div className="relative animate-slideIn" style={{ animationDelay: "0.1s" }}>
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search FAQs..."
                  className="pl-10"
                />
              </div>

              <div className="space-y-6">
                {filteredFAQs.map((category, categoryIndex) => (
                  <Card
                    key={categoryIndex}
                    className="animate-scaleIn"
                    style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                  >
                    <CardContent className="p-0">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value={`category-${categoryIndex}`} className="border-b">
                          <AccordionTrigger className="px-6 py-4 font-semibold text-lg">
                            {category.category}
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <div className="space-y-4">
                              {category.questions.map((faq, faqIndex) => (
                                <Accordion
                                  key={faqIndex}
                                  type="single"
                                  collapsible
                                  className="w-full"
                                >
                                  <AccordionItem value={`faq-${categoryIndex}-${faqIndex}`}>
                                    <AccordionTrigger className="text-left font-medium">
                                      {faq.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                      {faq.a}
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <Card className="text-center py-12 animate-fadeIn">
                  <CardContent>
                    <p className="text-muted-foreground">
                      No FAQs found matching &quot;{searchQuery}&quot;. Try a different search term.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

