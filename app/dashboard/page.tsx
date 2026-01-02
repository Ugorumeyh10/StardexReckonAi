"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { DashboardStats } from "@/components/dashboard/stats"
import { AnimatedStats } from "@/components/dashboard/animated-stats"
import { RecentJobs } from "@/components/dashboard/recent-jobs"
import { ExceptionOverview } from "@/components/dashboard/exception-overview"
import { SLAChart } from "@/components/dashboard/sla-chart"
import { BannerCarousel } from "@/components/dashboard/banner-carousel"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="mb-6 animate-fadeIn">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Overview of reconciliation activities and exceptions
              </p>
            </div>
            <BannerCarousel />
            <AnimatedStats />
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="animate-slideIn" style={{ animationDelay: "0.2s" }}>
                <RecentJobs />
              </div>
              <div className="animate-slideInRight" style={{ animationDelay: "0.3s" }}>
                <ExceptionOverview />
              </div>
            </div>
            <div className="mt-6 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
              <SLAChart />
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

