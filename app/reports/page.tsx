import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { ReportList } from "@/components/reports/report-list"
import { ReportGenerator } from "@/components/reports/report-generator"

export default function ReportsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
              <p className="text-muted-foreground">
                Generate and download reconciliation reports
              </p>
            </div>
            <ReportGenerator />
          </div>
          <ReportList />
        </main>
      </div>
    </div>
  )
}

