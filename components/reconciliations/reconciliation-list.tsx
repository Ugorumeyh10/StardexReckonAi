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
import { Progress } from "@/components/ui/progress"
import { formatDateTime, formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Eye, Download, Play } from "lucide-react"

const reconciliations = [
  {
    id: "1",
    name: "POS Settlement - December 2025",
    status: "completed",
    progress: 100,
    totalRows: 50000,
    matchedRows: 48750,
    exceptionRows: 1250,
    matchRate: 97.5,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000),
  },
  {
    id: "2",
    name: "ATM Reconciliation - December 2025",
    status: "processing",
    progress: 67,
    totalRows: 35000,
    matchedRows: 23450,
    exceptionRows: 550,
    matchRate: 97.7,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: "3",
    name: "Card Network - November 2025",
    status: "completed",
    progress: 100,
    totalRows: 120000,
    matchedRows: 116400,
    exceptionRows: 3600,
    matchRate: 97.0,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000),
  },
]

const statusColors = {
  pending: "secondary",
  processing: "default",
  completed: "success",
  failed: "destructive",
} as const

export function ReconciliationList() {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Total Rows</TableHead>
              <TableHead>Matched</TableHead>
              <TableHead>Exceptions</TableHead>
              <TableHead>Match Rate</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reconciliations.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.name}</TableCell>
                <TableCell>
                  <Badge variant={statusColors[job.status as keyof typeof statusColors]}>
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 w-32">
                    <Progress value={job.progress} className="flex-1" />
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {job.progress}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>{job.totalRows.toLocaleString()}</TableCell>
                <TableCell>{job.matchedRows.toLocaleString()}</TableCell>
                <TableCell>
                  <span className="text-destructive font-medium">
                    {job.exceptionRows.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{job.matchRate}%</span>
                </TableCell>
                <TableCell>{formatDateTime(job.createdAt)}</TableCell>
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

