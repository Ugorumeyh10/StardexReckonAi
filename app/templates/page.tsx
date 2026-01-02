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
import { formatDateTime } from "@/lib/utils"
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
import { Textarea } from "@/components/ui/textarea"
import { Plus, Copy, Edit, Trash2, Star } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/protected-route"

const templates = [
  {
    id: "1",
    name: "POS Settlement Standard",
    description: "Standard template for POS settlement reconciliation",
    channel: "POS",
    fileTypes: ["bank", "settlement"],
    rules: ["exact_amount", "fuzzy_transaction_id"],
    isDefault: true,
    usageCount: 45,
    createdBy: "John Doe",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    name: "ATM Reconciliation",
    description: "Template for ATM transaction reconciliation",
    channel: "ATM",
    fileTypes: ["bank", "switch"],
    rules: ["exact_amount", "date_range"],
    isDefault: false,
    usageCount: 23,
    createdBy: "Jane Smith",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
]

export default function TemplatesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Reconciliation Templates</h1>
                <p className="text-muted-foreground">
                  Save and reuse reconciliation configurations
                </p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Template
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create Reconciliation Template</DialogTitle>
                    <DialogDescription>
                      Save your current reconciliation configuration as a reusable template
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Template Name</Label>
                      <Input placeholder="POS Settlement Standard" />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        placeholder="Describe when and how to use this template..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Channel</Label>
                      <Input placeholder="POS, ATM, Card, etc." />
                    </div>
                    <Button className="w-full">Create Template</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Channel</TableHead>
                      <TableHead>File Types</TableHead>
                      <TableHead>Rules</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {templates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {template.isDefault && (
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            )}
                            <div>
                              <div className="font-medium">{template.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {template.description}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{template.channel}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {template.fileTypes.map((type) => (
                              <Badge key={type} variant="secondary" className="text-xs">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            {template.rules.map((rule) => (
                              <Badge key={rule} variant="outline" className="text-xs">
                                {rule.replace(/_/g, " ")}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{template.usageCount} times</TableCell>
                        <TableCell>{formatDateTime(template.createdAt)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

