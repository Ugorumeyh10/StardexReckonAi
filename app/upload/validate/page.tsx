"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, AlertTriangle, FileText } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/protected-route"

const validationResults = {
  overall: 85,
  checks: [
    { name: "File Format", status: "pass", message: "Valid Excel format" },
    { name: "File Size", status: "pass", message: "2.4 MB (within limits)" },
    { name: "Column Headers", status: "pass", message: "All required columns present" },
    { name: "Data Completeness", status: "warning", message: "5% of rows have missing values" },
    { name: "Data Types", status: "pass", message: "All data types valid" },
    { name: "Duplicate Detection", status: "warning", message: "12 duplicate transactions found" },
    { name: "Date Range", status: "pass", message: "Dates within expected range" },
    { name: "Amount Validation", status: "error", message: "3 rows with invalid amounts" },
  ],
}

export default function DataValidationPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Data Validation & Quality</h1>
              <p className="text-muted-foreground">
                Validate data quality before processing
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Validation Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Overall Quality Score</span>
                        <span className="font-medium">{validationResults.overall}%</span>
                      </div>
                      <Progress value={validationResults.overall} />
                    </div>

                    <div className="space-y-2">
                      {validationResults.checks.map((check, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {check.status === "pass" && (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            )}
                            {check.status === "warning" && (
                              <AlertTriangle className="h-5 w-5 text-yellow-600" />
                            )}
                            {check.status === "error" && (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                            <div>
                              <div className="font-medium">{check.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {check.message}
                              </div>
                            </div>
                          </div>
                          <Badge
                            variant={
                              check.status === "pass"
                                ? "success"
                                : check.status === "warning"
                                ? "warning"
                                : "destructive"
                            }
                          >
                            {check.status}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button>Fix Issues</Button>
                      <Button variant="outline">Proceed Anyway</Button>
                      <Button variant="outline">Download Report</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Quality Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Completeness</div>
                      <div className="text-2xl font-bold">95%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Accuracy</div>
                      <div className="text-2xl font-bold">92%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Consistency</div>
                      <div className="text-2xl font-bold">88%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Validity</div>
                      <div className="text-2xl font-bold">90%</div>
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

