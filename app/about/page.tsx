"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, BarChart3, Users, Target, Award } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/protected-route"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process millions of transactions in minutes",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Enterprise-level security and compliance",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Deep insights and predictive analytics",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Seamless collaboration and workflow",
  },
  {
    icon: Target,
    title: "99.9% Accuracy",
    description: "AI-powered matching with high precision",
  },
  {
    icon: Award,
    title: "Industry Leader",
    description: "Trusted by leading financial institutions",
  },
]

const stats = [
  { label: "Transactions Processed", value: "10M+", delay: "0s" },
  { label: "Match Rate", value: "97.5%", delay: "0.1s" },
  { label: "Time Saved", value: "80%", delay: "0.2s" },
  { label: "Client Satisfaction", value: "98%", delay: "0.3s" },
]

export default function AboutPage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Hero Section */}
              <div className="text-center space-y-4 animate-fadeIn">
                <h1 className="text-4xl font-bold">About StardexReckonAi</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Revolutionizing financial reconciliation with AI-powered automation
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    className="text-center animate-scaleIn"
                    style={{ animationDelay: stat.delay }}
                  >
                    <CardContent className="pt-6">
                      <div className="text-3xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Mission */}
              <Card className="animate-slideIn">
                <CardHeader>
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    StardexReckonAi is designed to transform how banks and financial institutions
                    handle reconciliation. We combine cutting-edge AI technology with intuitive
                    design to deliver a solution that reduces manual effort by 80% while improving
                    accuracy and compliance.
                  </p>
                  <p className="text-muted-foreground">
                    Our platform automates the entire reconciliation lifecycle, from file ingestion
                    to exception resolution, providing real-time insights and predictive analytics
                    that help financial teams make better decisions faster.
                  </p>
                </CardContent>
              </Card>

              {/* Features Grid */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-center">Key Features</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {features.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <Card
                        key={index}
                        className="animate-scaleIn hover:shadow-lg transition-shadow"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <CardContent className="pt-6 text-center">
                          <Icon className="h-12 w-12 mx-auto mb-4 animate-float" />
                          <h3 className="font-semibold mb-2">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Company Info */}
              <Card className="animate-slideInRight">
                <CardHeader>
                  <CardTitle>Stardex Innovation Limited</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    StardexReckonAi is developed by Stardex Innovation Limited, a leading
                    technology company specializing in financial technology solutions.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Contact</h4>
                      <p className="text-sm text-muted-foreground">
                        Email: info@stardexinnovation.com
                        <br />
                        Phone: +234 XXX XXX XXXX
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Location</h4>
                      <p className="text-sm text-muted-foreground">
                        Lagos, Nigeria
                        <br />
                        Serving clients globally
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

