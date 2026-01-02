"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Send } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface RequestApprovalButtonProps {
  type: 'rule_configuration' | 'ledger_posting' | 'user_onboarding' | 'system_setting'
  title: string
  description: string
  metadata: Record<string, any>
}

export function RequestApprovalButton({ type, title, description, metadata }: RequestApprovalButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [comments, setComments] = useState("")

  const handleSubmit = () => {
    // TODO: Implement API call to create approval request
    console.log("Requesting approval:", { type, title, description, metadata, comments })
    alert("Approval request submitted! (This is a demo)")
    setIsOpen(false)
    setComments("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Request Approval
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Approval</DialogTitle>
          <DialogDescription>
            Submit this change for supervisor approval
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} disabled />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={description} disabled rows={3} />
          </div>
          <div className="space-y-2">
            <Label>Additional Comments (Optional)</Label>
            <Textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Add any additional context for the reviewer..."
              rows={3}
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Submit for Approval
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

