import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { FileUpload } from "@/components/upload/file-upload"
import { RecentUploads } from "@/components/upload/recent-uploads"

export default function UploadPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Upload Files</h1>
            <p className="text-muted-foreground">
              Upload reconciliation files for processing
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <FileUpload />
            <RecentUploads />
          </div>
        </main>
      </div>
    </div>
  )
}

