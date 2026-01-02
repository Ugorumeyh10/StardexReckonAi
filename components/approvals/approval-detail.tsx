"use client"

import { Approval } from "@/types/approvals"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDateTime, formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, MessageSquare, User, Calendar } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/lib/store"
import { useState } from "react"

interface ApprovalDetailProps {
  approval: Approval
}

const statusColors = {
  pending: "warning",
  approved: "success",
  declined: "destructive",
  cancelled: "secondary",
} as const

export function ApprovalDetail({ approval }: ApprovalDetailProps) {
  const { user } = useAuthStore()
  const isSupervisor = user?.role === 'admin' || user?.role === 'analyst'
  const canApprove = isSupervisor && approval.status === 'pending'
  const [comments, setComments] = useState("")

  const handleApprove = () => {
    // TODO: Implement approval API call
    console.log("Approving:", approval.id, comments)
    alert("Approval submitted! (This is a demo)")
  }

  const handleDecline = () => {
    // TODO: Implement decline API call
    console.log("Declining:", approval.id, comments)
    alert("Declined! (This is a demo)")
  }

  const renderMetadata = () => {
    switch (approval.type) {
      case 'rule_configuration':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Rule Name</Label>
                <p className="text-sm font-medium">{approval.metadata.ruleName}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Rule Type</Label>
                <p className="text-sm font-medium capitalize">{approval.metadata.ruleType}</p>
              </div>
              {approval.metadata.tolerance && (
                <div>
                  <Label className="text-xs text-muted-foreground">Tolerance</Label>
                  <p className="text-sm font-medium">{(approval.metadata.tolerance * 100).toFixed(2)}%</p>
                </div>
              )}
              <div>
                <Label className="text-xs text-muted-foreground">Fields</Label>
                <p className="text-sm font-medium">{approval.metadata.fields.join(", ")}</p>
              </div>
            </div>
          </div>
        )

      case 'ledger_posting':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Job Name</Label>
                <p className="text-sm font-medium">{approval.metadata.jobName}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Account Code</Label>
                <p className="text-sm font-medium">{approval.metadata.accountCode}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Total Amount</Label>
                <p className="text-sm font-medium">{formatCurrency(approval.metadata.totalAmount)}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Transaction Count</Label>
                <p className="text-sm font-medium">{approval.metadata.transactionCount.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Posting Date</Label>
                <p className="text-sm font-medium">{approval.metadata.postingDate}</p>
              </div>
            </div>
          </div>
        )

      case 'user_onboarding':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Name</Label>
                <p className="text-sm font-medium">{approval.metadata.name}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Email</Label>
                <p className="text-sm font-medium">{approval.metadata.email}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Role</Label>
                <Badge variant="outline" className="mt-1">
                  {approval.metadata.role}
                </Badge>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Permissions</Label>
                <div className="mt-1 space-y-1">
                  {approval.metadata.requestedPermissions.map((perm: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="mr-1 text-xs">
                      {perm.replace(/_/g, " ")}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-sm text-muted-foreground">
            <pre className="bg-muted p-3 rounded text-xs overflow-auto">
              {JSON.stringify(approval.metadata, null, 2)}
            </pre>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold">{approval.title}</h2>
          <Badge variant={statusColors[approval.status]}>
            {approval.status}
          </Badge>
        </div>
        <p className="text-muted-foreground">{approval.description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <User className="h-4 w-4" />
              Request Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Requested By:</span>
              <span className="font-medium">{approval.requestedBy.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span>{approval.requestedBy.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Requested At:</span>
              <span>{formatDateTime(approval.requestedAt)}</span>
            </div>
            {approval.reviewedBy && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reviewed By:</span>
                  <span className="font-medium">{approval.reviewedBy.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reviewed At:</span>
                  <span>{formatDateTime(approval.reviewedAt!)}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Approval Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderMetadata()}
          </CardContent>
        </Card>
      </div>

      {approval.comments && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Review Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{approval.comments}</p>
          </CardContent>
        </Card>
      )}

      {canApprove && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Review & Decision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Comments (Optional)</Label>
              <Textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Add any comments about your decision..."
                rows={3}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleApprove}
                className="flex-1"
                variant="default"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button
                onClick={handleDecline}
                className="flex-1"
                variant="destructive"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Decline
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

