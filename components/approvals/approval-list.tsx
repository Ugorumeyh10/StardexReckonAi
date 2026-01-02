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
import { formatDateTime, formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Eye, CheckCircle2, XCircle, UserPlus, Settings, FileText, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ApprovalDetail } from "./approval-detail"
import { useAuthStore } from "@/lib/store"
import { Approval } from "@/types/approvals"

const approvals = [
  {
    id: "1",
    type: "rule_configuration",
    status: "pending",
    title: "New Fuzzy Matching Rule",
    description: "Request to add fuzzy matching for transaction IDs with 85% similarity threshold",
    requestedBy: {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@bank.com",
    },
    requestedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    metadata: {
      ruleName: "Fuzzy Transaction ID Match",
      ruleType: "fuzzy",
      tolerance: 0.85,
      fields: ["transaction_id", "rrn"],
    },
  },
  {
    id: "2",
    type: "ledger_posting",
    status: "pending",
    title: "GL Posting - POS Settlement Dec 2025",
    description: "Post reconciliation results to General Ledger account 4001-001",
    requestedBy: {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@bank.com",
    },
    requestedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    metadata: {
      jobId: "1",
      jobName: "POS Settlement - December 2025",
      totalAmount: 12500000,
      transactionCount: 12500,
      accountCode: "4001-001",
      postingDate: "2025-12-30",
    },
  },
  {
    id: "3",
    type: "user_onboarding",
    status: "pending",
    title: "New User: Mike Johnson",
    description: "Request to onboard new analyst user with standard permissions",
    requestedBy: {
      id: "1",
      name: "John Doe",
      email: "john.doe@bank.com",
    },
    requestedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    metadata: {
      userId: "4",
      email: "mike.johnson@bank.com",
      name: "Mike Johnson",
      role: "analyst",
      requestedPermissions: ["view_reconciliations", "manage_exceptions", "generate_reports"],
    },
  },
  {
    id: "4",
    type: "rule_configuration",
    status: "approved",
    title: "Amount Tolerance Update",
    description: "Update amount tolerance from 0.01% to 0.05%",
    requestedBy: {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@bank.com",
    },
    requestedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    reviewedBy: {
      id: "1",
      name: "Admin User",
      email: "admin@reckai.com",
    },
    reviewedAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
    metadata: {
      ruleName: "Amount Tolerance",
      ruleType: "range",
      tolerance: 0.05,
      fields: ["amount"],
    },
  },
]

const typeIcons = {
  rule_configuration: Settings,
  ledger_posting: FileText,
  user_onboarding: UserPlus,
  exception_resolution: AlertTriangle,
  report_generation: FileText,
  system_setting: Settings,
}

const typeLabels = {
  rule_configuration: "Rule Config",
  ledger_posting: "Ledger Posting",
  user_onboarding: "User Onboarding",
  exception_resolution: "Exception",
  report_generation: "Report",
  system_setting: "System Setting",
}

const statusColors = {
  pending: "warning",
  approved: "success",
  declined: "destructive",
  cancelled: "secondary",
} as const

export function ApprovalList() {
  const { user } = useAuthStore()
  const isSupervisor = user?.role === 'admin' || user?.role === 'analyst'

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested</TableHead>
              {isSupervisor && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {approvals.map((approval) => {
              const Icon = typeIcons[approval.type as keyof typeof typeIcons]
              return (
                <TableRow key={approval.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{typeLabels[approval.type as keyof typeof typeLabels]}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium max-w-xs truncate">
                    {approval.title}
                  </TableCell>
                  <TableCell>{approval.requestedBy.name}</TableCell>
                  <TableCell>
                    <Badge variant={statusColors[approval.status as keyof typeof statusColors]}>
                      {approval.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDateTime(approval.requestedAt)}</TableCell>
                  {isSupervisor && (
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <ApprovalDetail approval={approval as unknown as Approval} />
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  )}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

