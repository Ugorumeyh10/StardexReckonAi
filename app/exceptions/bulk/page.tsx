"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, XCircle, User, MessageSquare } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/protected-route"

const exceptions = [
  { id: "1", type: "amount_mismatch", severity: "high", amount: 125000, status: "open" },
  { id: "2", type: "missing_entry", severity: "critical", amount: 450000, status: "open" },
  { id: "3", type: "timing_difference", severity: "medium", amount: 75000, status: "open" },
  { id: "4", type: "amount_mismatch", severity: "high", amount: 200000, status: "open" },
  { id: "5", type: "duplicate", severity: "low", amount: 50000, status: "open" },
]

export default function BulkExceptionResolutionPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [bulkAction, setBulkAction] = useState<string>("")
  const [comments, setComments] = useState("")

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selected)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelected(newSelected)
  }

  const selectAll = () => {
    if (selected.size === exceptions.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(exceptions.map((e) => e.id)))
    }
  }

  const handleBulkAction = () => {
    if (selected.size === 0 || !bulkAction) return

    alert(
      `Performing ${bulkAction} on ${selected.size} exception(s)...\n\nComments: ${comments || "None"}`
    )
    // TODO: Implement actual bulk action
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Bulk Exception Resolution</h1>
              <p className="text-muted-foreground">
                Select multiple exceptions and perform batch operations
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Exceptions</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {selected.size} selected
                        </span>
                        <Button variant="outline" size="sm" onClick={selectAll}>
                          {selected.size === exceptions.length ? "Deselect All" : "Select All"}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <Checkbox
                              checked={selected.size === exceptions.length}
                              onCheckedChange={selectAll}
                            />
                          </TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Severity</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {exceptions.map((exception) => (
                          <TableRow key={exception.id}>
                            <TableCell>
                              <Checkbox
                                checked={selected.has(exception.id)}
                                onCheckedChange={() => toggleSelect(exception.id)}
                              />
                            </TableCell>
                            <TableCell>{exception.type.replace(/_/g, " ")}</TableCell>
                            <TableCell>
                              <Badge variant="destructive">{exception.severity}</Badge>
                            </TableCell>
                            <TableCell>{formatCurrency(exception.amount)}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{exception.status}</Badge>
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
                    <CardTitle>Bulk Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Action</Label>
                      <Select value={bulkAction} onValueChange={setBulkAction}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="resolve">Mark as Resolved</SelectItem>
                          <SelectItem value="assign">Assign to User</SelectItem>
                          <SelectItem value="escalate">Escalate</SelectItem>
                          <SelectItem value="ignore">Ignore</SelectItem>
                          <SelectItem value="export">Export Selected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {bulkAction === "assign" && (
                      <div className="space-y-2">
                        <Label>Assign To</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select user" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user1">John Doe</SelectItem>
                            <SelectItem value="user2">Jane Smith</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Comments (Optional)</Label>
                      <Textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Add comments for this bulk action..."
                        rows={3}
                      />
                    </div>

                    <Button
                      className="w-full"
                      onClick={handleBulkAction}
                      disabled={selected.size === 0 || !bulkAction}
                    >
                      Apply to {selected.size} Exception{selected.size !== 1 ? "s" : ""}
                    </Button>

                    {selected.size > 0 && (
                      <div className="pt-4 border-t">
                        <p className="text-sm text-muted-foreground">
                          Total Amount:{" "}
                          {formatCurrency(
                            exceptions
                              .filter((e) => selected.has(e.id))
                              .reduce((sum, e) => sum + e.amount, 0)
                          )}
                        </p>
                      </div>
                    )}
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

