import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { ReconciliationList } from "@/components/reconciliations/reconciliation-list"
import { ReconciliationFilters } from "@/components/reconciliations/reconciliation-filters"

export default function ReconciliationsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Reconciliations
              </h1>
              <p className="text-muted-foreground">
                View and manage reconciliation jobs
              </p>
            </div>
            <ReconciliationFilters />
          </div>
          <ReconciliationList />
        </main>
      </div>
    </div>
  )
}

