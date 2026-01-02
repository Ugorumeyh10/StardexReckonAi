"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDateTime } from "@/lib/utils"
import { History, RotateCcw, Eye } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/protected-route"

const historyItems = [
  {
    id: "1",
    resourceType: "reconciliation",
    resourceId: "job-123",
    resourceName: "POS Settlement Dec 2025",
    action: "updated",
    changedBy: "John Doe",
    changedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    changes: ["status: processing → completed", "match_rate: 95% → 97.5%"],
    version: 3,
  },
  {
    id: "2",
    resourceType: "rule",
    resourceId: "rule-456",
    resourceName: "Amount Match Rule",
    action: "created",
    changedBy: "Jane Smith",
    changedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    changes: ["New rule created"],
    version: 1,
  },
]

export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Version History</h1>
              <p className="text-muted-foreground">
                Track changes and rollback to previous versions
              </p>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Resource</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Changed By</TableHead>
                      <TableHead>Changes</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {historyItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.resourceName}</div>
                            <div className="text-sm text-muted-foreground">
                              {item.resourceType}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {item.action}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.changedBy}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {item.changes.map((change, idx) => (
                              <div key={idx} className="text-sm text-muted-foreground">
                                {change}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">v{item.version}</Badge>
                        </TableCell>
                        <TableCell>{formatDateTime(item.changedAt)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

