"use client"

import { Card, CardContent } from "@/components/ui/card"
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
import { Button } from "@/components/ui/button"
import { Download, Eye, FileText } from "lucide-react"

const reports = [
  {
    id: "1",
    type: "daily",
    format: "pdf",
    generatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    size: "2.4 MB",
    jobId: "1",
  },
  {
    id: "2",
    type: "aging",
    format: "excel",
    generatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    size: "1.8 MB",
    jobId: "1",
  },
  {
    id: "3",
    type: "audit",
    format: "pdf",
    generatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    size: "5.2 MB",
    jobId: "2",
  },
]

const typeLabels = {
  daily: "Daily Reconciliation",
  aging: "Aging Exception",
  channel_trend: "Channel Trend",
  sla: "SLA Tracking",
  audit: "Audit Report",
} as const

export function ReportList() {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Type</TableHead>
              <TableHead>Format</TableHead>
              <TableHead>Generated</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">
                  {typeLabels[report.type as keyof typeof typeLabels]}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="uppercase">
                    {report.format}
                  </Badge>
                </TableCell>
                <TableCell>{formatDateTime(report.generatedAt)}</TableCell>
                <TableCell>{report.size}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

