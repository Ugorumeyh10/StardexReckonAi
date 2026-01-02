"use client"

import { Exception } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency, formatDateTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CheckCircle2, MessageSquare, User, Sparkles } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ExceptionDetailProps {
  exception: Exception
}

const severityColors = {
  low: "secondary",
  medium: "warning",
  high: "destructive",
  critical: "destructive",
} as const

export function ExceptionDetail({ exception }: ExceptionDetailProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold">Exception Details</h2>
          <div className="flex items-center gap-2">
            <Badge variant={severityColors[exception.severity as keyof typeof severityColors]}>
              {exception.severity}
            </Badge>
            <Badge variant="outline">{exception.status}</Badge>
          </div>
        </div>
        <p className="text-muted-foreground">{exception.description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Transaction Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-medium">
                {exception.amount ? formatCurrency(exception.amount) : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span>{exception.type.replace(/_/g, " ")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created:</span>
              <span>{formatDateTime(exception.createdAt)}</span>
            </div>
            {exception.assignedTo && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Assigned To:</span>
                <span>{exception.assignedTo}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              AI Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {exception.aiConfidence && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Confidence:</span>
                  <span className="font-medium">
                    {(exception.aiConfidence * 100).toFixed(0)}%
                  </span>
                </div>
                <Progress value={exception.aiConfidence * 100} />
              </div>
            )}
            {exception.aiExplanation && (
              <div>
                <Label className="text-xs text-muted-foreground">
                  Explanation
                </Label>
                <p className="text-sm mt-1">{exception.aiExplanation}</p>
              </div>
            )}
            {exception.suggestedAction && (
              <div>
                <Label className="text-xs text-muted-foreground">
                  Suggested Action
                </Label>
                <p className="text-sm mt-1 font-medium">
                  {exception.suggestedAction}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Comments & Resolution
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {exception.comments && exception.comments.length > 0 ? (
            <div className="space-y-3">
              {exception.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-l-2 border-primary pl-4 py-2"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">
                      {comment.userName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDateTime(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No comments yet. Add a comment to track resolution progress.
            </p>
          )}
          <div className="space-y-2">
            <Label>Add Comment</Label>
            <Textarea placeholder="Enter your comment..." rows={3} />
            <div className="flex items-center gap-2">
              <Button size="sm">Add Comment</Button>
              <Button size="sm" variant="outline">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Mark as Resolved
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

