"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { GripVertical, Plus, Trash2, Save } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/protected-route"

const availableFields = [
  { id: "date", label: "Date", type: "date" },
  { id: "amount", label: "Amount", type: "number" },
  { id: "transaction_id", label: "Transaction ID", type: "string" },
  { id: "status", label: "Status", type: "string" },
  { id: "match_rate", label: "Match Rate", type: "number" },
]

export default function ReportBuilderPage() {
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [reportName, setReportName] = useState("")

  const addField = (fieldId: string) => {
    if (!selectedFields.includes(fieldId)) {
      setSelectedFields([...selectedFields, fieldId])
    }
  }

  const removeField = (fieldId: string) => {
    setSelectedFields(selectedFields.filter((id) => id !== fieldId))
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Custom Report Builder</h1>
                <p className="text-muted-foreground">
                  Build custom reports with drag-and-drop fields
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save Template
                </Button>
                <Button>Generate Report</Button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="space-y-2">
                      <Label>Report Name</Label>
                      <Input
                        value={reportName}
                        onChange={(e) => setReportName(e.target.value)}
                        placeholder="Custom Reconciliation Report"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Selected Fields</Label>
                      <div className="mt-2 space-y-2 min-h-[200px] p-4 border-2 border-dashed rounded-lg">
                        {selectedFields.length === 0 ? (
                          <p className="text-center text-muted-foreground">
                            Drag fields here or click to add
                          </p>
                        ) : (
                          selectedFields.map((fieldId) => {
                            const field = availableFields.find((f) => f.id === fieldId)
                            return (
                              <div
                                key={fieldId}
                                className="flex items-center justify-between p-3 bg-muted rounded-lg"
                              >
                                <div className="flex items-center gap-2">
                                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">{field?.label}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {field?.type}
                                  </Badge>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeField(fieldId)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            )
                          })
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Available Fields</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {availableFields.map((field) => (
                        <div
                          key={field.id}
                          className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted"
                          onClick={() => addField(field.id)}
                        >
                          <div>
                            <div className="font-medium">{field.label}</div>
                            <div className="text-xs text-muted-foreground">{field.type}</div>
                          </div>
                          <Plus className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
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

