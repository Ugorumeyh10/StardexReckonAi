"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel } from "@/components/ui/carousel"
import { Play, Upload, FileCheck, AlertTriangle, BarChart3, Settings } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/protected-route"

const tutorials = [
  {
    title: "Getting Started",
    description: "Learn the basics of StardexReckonAi",
    icon: Play,
    steps: [
      "Upload your first reconciliation file",
      "Map columns to standard fields",
      "Run reconciliation and review results",
      "Resolve exceptions and generate reports",
    ],
  },
  {
    title: "File Upload",
    description: "How to upload and process files",
    icon: Upload,
    steps: [
      "Navigate to Upload Files page",
      "Select file type (bank, settlement, etc.)",
      "Drag & drop or click to select file",
      "Wait for validation and mapping",
    ],
  },
  {
    title: "Reconciliation",
    description: "Understanding reconciliation process",
    icon: FileCheck,
    steps: [
      "Create a new reconciliation job",
      "Select files and matching rules",
      "Monitor real-time progress",
      "Review matched and exception transactions",
    ],
  },
  {
    title: "Exception Management",
    description: "Handling exceptions effectively",
    icon: AlertTriangle,
    steps: [
      "View exceptions by type and severity",
      "Use AI explanations for context",
      "Resolve individually or in bulk",
      "Track resolution history",
    ],
  },
  {
    title: "Analytics & Reports",
    description: "Using analytics and generating reports",
    icon: BarChart3,
    steps: [
      "Explore analytics dashboard",
      "Create custom reports",
      "Schedule automated reports",
      "Export in multiple formats",
    ],
  },
  {
    title: "Settings & Configuration",
    description: "Configuring your workspace",
    icon: Settings,
    steps: [
      "Set up matching rules",
      "Configure user permissions",
      "Manage currencies and templates",
      "Set up integrations",
    ],
  },
]

export default function HelpPage() {
  const [selectedTutorial, setSelectedTutorial] = useState(0)

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="text-center space-y-4 animate-fadeIn">
                <h1 className="text-4xl font-bold">How to Use StardexReckonAi</h1>
                <p className="text-xl text-muted-foreground">
                  Interactive guides to help you get the most out of the platform
                </p>
              </div>

              {/* Tutorial Carousel */}
              <div className="animate-slideIn" style={{ animationDelay: "0.2s" }}>
                <Carousel autoPlay={false} interval={5000}>
                  {tutorials.map((tutorial, index) => {
                    const Icon = tutorial.icon
                    return (
                      <Card key={index} className="border-2">
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-black text-white animate-scaleIn">
                              <Icon className="h-6 w-6" />
                            </div>
                            <div>
                              <CardTitle className="text-2xl">{tutorial.title}</CardTitle>
                              <p className="text-muted-foreground mt-1">
                                {tutorial.description}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {tutorial.steps.map((step, stepIndex) => (
                              <div
                                key={stepIndex}
                                className="flex items-start gap-3 p-3 border rounded-lg animate-slideIn"
                                style={{
                                  animationDelay: `${(stepIndex + 1) * 0.1}s`,
                                }}
                              >
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                                  {stepIndex + 1}
                                </div>
                                <p className="flex-1 pt-0.5">{step}</p>
                              </div>
                            ))}
                          </div>
                          <Button className="w-full mt-6">Start Tutorial</Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </Carousel>
              </div>

              {/* Quick Links */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="animate-scaleIn hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-2">📚</div>
                    <h3 className="font-semibold mb-2">Documentation</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Comprehensive guides and API documentation
                    </p>
                    <Button variant="outline">View Docs</Button>
                  </CardContent>
                </Card>
                <Card className="animate-scaleIn hover:shadow-lg transition-shadow cursor-pointer" style={{ animationDelay: "0.1s" }}>
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-2">🎥</div>
                    <h3 className="font-semibold mb-2">Video Tutorials</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Watch step-by-step video guides
                    </p>
                    <Button variant="outline">Watch Videos</Button>
                  </CardContent>
                </Card>
                <Card className="animate-scaleIn hover:shadow-lg transition-shadow cursor-pointer" style={{ animationDelay: "0.2s" }}>
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-2">💬</div>
                    <h3 className="font-semibold mb-2">Support</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get help from our support team
                    </p>
                    <Button variant="outline">Contact Support</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

