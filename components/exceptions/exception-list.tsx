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
import { formatCurrency, formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Eye, MessageSquare, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ExceptionDetail } from "./exception-detail"
import { Exception } from "@/types"

const exceptions = [
  {
    id: "1",
    type: "amount_mismatch",
    severity: "high",
    status: "open",
    amount: 125000,
    description: "POS transaction amount mismatch between bank ledger and settlement file",
    aiExplanation: "The transaction amount in the bank ledger (₦125,000) does not match the settlement file (₦125,500). This is likely due to a processing fee discrepancy.",
    aiConfidence: 0.87,
    suggestedAction: "Verify processing fees and confirm correct amount with merchant",
    assignedTo: null,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    jobId: "1",
    comments: [],
  },
  {
    id: "2",
    type: "missing_entry",
    severity: "critical",
    status: "in_progress",
    amount: 450000,
    description: "Missing reversal entry for failed transaction",
    aiExplanation: "Transaction was marked as failed in the switch log but no reversal entry exists in the bank ledger. This requires immediate attention.",
    aiConfidence: 0.95,
    suggestedAction: "Check switch logs for reversal confirmation and create manual reversal entry if needed",
    assignedTo: "John Doe",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    jobId: "1",
    comments: [],
  },
  {
    id: "3",
    type: "timing_difference",
    severity: "medium",
    status: "open",
    amount: 75000,
    description: "Settlement date timing difference",
    aiExplanation: "Transaction appears in settlement file dated Dec 22 but bank ledger shows Dec 23. This is a common timing difference and may resolve automatically.",
    aiConfidence: 0.72,
    suggestedAction: "Monitor for next settlement cycle before manual intervention",
    assignedTo: null,
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
    jobId: "2",
    comments: [],
  },
]

const severityColors = {
  low: "secondary",
  medium: "warning",
  high: "destructive",
  critical: "destructive",
} as const

const statusColors = {
  open: "secondary",
  in_progress: "default",
  resolved: "success",
  escalated: "destructive",
} as const

export function ExceptionList() {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>AI Confidence</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exceptions.map((exception) => (
              <TableRow key={exception.id}>
                <TableCell className="font-mono text-xs">
                  {exception.id}
                </TableCell>
                <TableCell>
                  {exception.type.replace(/_/g, " ")}
                </TableCell>
                <TableCell>
                  <Badge variant={severityColors[exception.severity as keyof typeof severityColors]}>
                    {exception.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={statusColors[exception.status as keyof typeof statusColors]}>
                    {exception.status.replace(/_/g, " ")}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(exception.amount)}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {exception.description}
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {(exception.aiConfidence! * 100).toFixed(0)}%
                  </span>
                </TableCell>
                <TableCell>
                  {exception.assignedTo ? (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{exception.assignedTo}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">Unassigned</span>
                  )}
                </TableCell>
                <TableCell>{formatDate(exception.createdAt)}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                      <ExceptionDetail exception={{...exception, createdAt: exception.createdAt.toISOString()} as Exception} />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

