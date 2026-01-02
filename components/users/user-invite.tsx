"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserPlus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuthStore } from "@/lib/store"

export function UserInvite() {
  const { user } = useAuthStore()
  const isSupervisor = user?.role === 'admin'
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState<string>("")
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite New User</DialogTitle>
          <DialogDescription>
            Send an invitation to add a new user to the system
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="user@example.com" />
          </div>
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="analyst">Analyst</SelectItem>
                <SelectItem value="auditor">Auditor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            {isSupervisor ? (
              <Button className="flex-1" onClick={() => {
                // Direct invite for supervisors
                alert("User invitation sent! (This is a demo)")
              }}>
                <UserPlus className="mr-2 h-4 w-4" />
                Send Invitation
              </Button>
            ) : (
              <Button className="flex-1" onClick={() => {
                // Request approval for non-supervisors
                alert("Approval request submitted for user onboarding! (This is a demo)")
              }}>
                <UserPlus className="mr-2 h-4 w-4" />
                Request Approval
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

