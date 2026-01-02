"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { formatDateTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

const jobs = [
  {
    id: "1",
    name: "POS Settlement - Dec 2025",
    status: "completed" as const,
    progress: 100,
    matched: 12500,
    exceptions: 45,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    name: "ATM Reconciliation - Dec 2025",
    status: "processing" as const,
    progress: 67,
    matched: 8900,
    exceptions: 12,
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "3",
    name: "Card Network - Nov 2025",
    status: "completed" as const,
    progress: 100,
    matched: 23400,
    exceptions: 89,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
]

const statusColors = {
  pending: "secondary",
  processing: "default",
  completed: "success",
  failed: "destructive",
} as const

export function RecentJobs() {
  return (
    <Card className="animate-scaleIn hover:shadow-lg transition-all">
      <CardHeader>
        <CardTitle>Recent Reconciliation Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Matched</TableHead>
              <TableHead>Exceptions</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.name}</TableCell>
                <TableCell>
                  <Badge variant={statusColors[job.status as keyof typeof statusColors]}>
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 w-24">
                    <Progress value={job.progress} className="flex-1" />
                    <span className="text-xs text-muted-foreground">
                      {job.progress}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>{job.matched.toLocaleString()}</TableCell>
                <TableCell>{job.exceptions}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

