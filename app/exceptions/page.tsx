import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { ExceptionList } from "@/components/exceptions/exception-list"
import { ExceptionFilters } from "@/components/exceptions/exception-filters"
import { ExceptionStats } from "@/components/exceptions/exception-stats"

export default function ExceptionsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Exceptions</h1>
            <p className="text-muted-foreground">
              Manage and resolve reconciliation exceptions
            </p>
          </div>
          <ExceptionStats />
          <div className="mt-6">
            <ExceptionFilters />
          </div>
          <div className="mt-6">
            <ExceptionList />
          </div>
        </main>
      </div>
    </div>
  )
}

