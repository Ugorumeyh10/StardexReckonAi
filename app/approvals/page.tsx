"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { ApprovalList } from "@/components/approvals/approval-list"
import { ApprovalFilters } from "@/components/approvals/approval-filters"
import { ApprovalStats } from "@/components/approvals/approval-stats"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuthStore } from "@/lib/store"

export default function ApprovalsPage() {
  const { user } = useAuthStore()
  const isSupervisor = user?.role === 'admin' || user?.role === 'analyst'

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Approvals</h1>
              <p className="text-muted-foreground">
                {isSupervisor 
                  ? "Review and approve pending requests"
                  : "Track your approval requests"}
              </p>
            </div>
            <ApprovalStats />
            <div className="mt-6">
              <ApprovalFilters />
            </div>
            <div className="mt-6">
              <ApprovalList />
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

