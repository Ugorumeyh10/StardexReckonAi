"use client"

import { useState } from "react"
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
import { formatDateTime, formatCurrency } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AlertTriangle, Plus, Settings } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/protected-route"

const escalatedExceptions = [
  {
    id: "1",
    type: "amount_mismatch",
    severity: "critical",
    amount: 1250000,
    description: "Large amount mismatch requiring immediate attention",
    age: 48,
    escalatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    escalatedBy: "System",
    escalationLevel: 2,
  },
  {
    id: "2",
    type: "missing_entry",
    severity: "high",
    amount: 450000,
    description: "Missing reversal entry for failed transaction",
    age: 72,
    escalatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    escalatedBy: "System",
    escalationLevel: 3,
  },
]

const escalationRules = [
  {
    id: "1",
    name: "Critical Exception Auto-Escalate",
    condition: "severity = critical AND age > 24 hours",
    action: "Escalate to Level 2",
    isActive: true,
  },
  {
    id: "2",
    name: "High Value Exception",
    condition: "amount > 1000000 AND status = open",
    action: "Escalate to Level 1",
    isActive: true,
  },
]

export default function EscalationPage() {
  const [isRuleDialogOpen, setIsRuleDialogOpen] = useState(false)

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Exception Escalation</h1>
                <p className="text-muted-foreground">
                  Manage escalated exceptions and escalation rules
                </p>
              </div>
              <Dialog open={isRuleDialogOpen} onOpenChange={setIsRuleDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Escalation Rule
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Escalation Rule</DialogTitle>
                    <DialogDescription>
                      Automatically escalate exceptions based on conditions
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Rule Name</Label>
                      <Input placeholder="Critical Exception Auto-Escalate" />
                    </div>
                    <div className="space-y-2">
                      <Label>Condition</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="age">Age &gt; X hours</SelectItem>
                          <SelectItem value="severity">Severity = Critical</SelectItem>
                          <SelectItem value="amount">Amount &gt; X</SelectItem>
                          <SelectItem value="custom">Custom Condition</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Escalation Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Level 1 - Supervisor</SelectItem>
                          <SelectItem value="2">Level 2 - Manager</SelectItem>
                          <SelectItem value="3">Level 3 - Director</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">Create Rule</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      Escalated Exceptions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Severity</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Age</TableHead>
                          <TableHead>Level</TableHead>
                          <TableHead>Escalated</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {escalatedExceptions.map((exception) => (
                          <TableRow key={exception.id}>
                            <TableCell>{exception.type.replace(/_/g, " ")}</TableCell>
                            <TableCell>
                              <Badge variant="destructive">{exception.severity}</Badge>
                            </TableCell>
                            <TableCell>{formatCurrency(exception.amount)}</TableCell>
                            <TableCell>{exception.age} hours</TableCell>
                            <TableCell>
                              <Badge variant="warning">Level {exception.escalationLevel}</Badge>
                            </TableCell>
                            <TableCell>{formatDateTime(exception.escalatedAt)}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                Review
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Escalation Rules
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {escalationRules.map((rule) => (
                      <div key={rule.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{rule.name}</h3>
                          <Badge variant={rule.isActive ? "success" : "secondary"}>
                            {rule.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {rule.condition}
                        </p>
                        <p className="text-sm font-medium">{rule.action}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

