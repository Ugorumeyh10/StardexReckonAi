"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CheckCircle2, XCircle, AlertTriangle, FileText, Download } from "lucide-react"
import { formatDateTime } from "@/lib/utils"
import { ProtectedRoute } from "@/components/auth/protected-route"

const complianceChecks = [
  {
    id: "1",
    requirement: "Data Encryption at Rest",
    status: "compliant",
    lastChecked: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    requirement: "Audit Log Retention (7 years)",
    status: "compliant",
    lastChecked: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    requirement: "GDPR Right to Deletion",
    status: "compliant",
    lastChecked: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    requirement: "NDPR Data Protection",
    status: "warning",
    lastChecked: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
]

const regulatoryReports = [
  {
    id: "1",
    type: "CBN Monthly Report",
    period: "November 2025",
    generatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: "approved",
  },
  {
    id: "2",
    type: "Audit Trail Report",
    period: "Q4 2025",
    generatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    status: "pending",
  },
]

export default function CompliancePage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Compliance & Regulatory</h1>
              <p className="text-muted-foreground">
                Compliance monitoring and regulatory reporting
              </p>
            </div>

            <Tabs defaultValue="status" className="space-y-4">
              <TabsList>
                <TabsTrigger value="status">Compliance Status</TabsTrigger>
                <TabsTrigger value="reports">Regulatory Reports</TabsTrigger>
                <TabsTrigger value="audit">Audit Trail</TabsTrigger>
              </TabsList>

              <TabsContent value="status" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Compliance Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">95%</div>
                      <p className="text-sm text-muted-foreground mt-1">
                        19 of 20 requirements met
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Last Audit</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold">
                        {new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        30 days ago
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Next Audit Due</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold">
                        {new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        In 60 days
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Requirement</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Checked</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {complianceChecks.map((check) => (
                          <TableRow key={check.id}>
                            <TableCell className="font-medium">
                              {check.requirement}
                            </TableCell>
                            <TableCell>
                              {check.status === "compliant" ? (
                                <Badge variant="success" className="gap-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Compliant
                                </Badge>
                              ) : (
                                <Badge variant="warning" className="gap-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  Warning
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>{formatDateTime(check.lastChecked)}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Regulatory Reports</CardTitle>
                      <Button>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Report
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Report Type</TableHead>
                          <TableHead>Period</TableHead>
                          <TableHead>Generated</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {regulatoryReports.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell className="font-medium">{report.type}</TableCell>
                            <TableCell>{report.period}</TableCell>
                            <TableCell>{formatDateTime(report.generatedAt)}</TableCell>
                            <TableCell>
                              <Badge
                                variant={report.status === "approved" ? "success" : "warning"}
                              >
                                {report.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="audit" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Audit Trail</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Audit Log Retention</p>
                          <p className="text-sm text-muted-foreground">
                            All audit logs retained for 7 years as per compliance requirements
                          </p>
                        </div>
                        <Button variant="outline">Export Audit Log</Button>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">Recent Audit Events</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>User login: admin@reckai.com</span>
                            <span className="text-muted-foreground">
                              {new Date().toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Reconciliation job created: POS Settlement</span>
                            <span className="text-muted-foreground">
                              {new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Exception resolved: #123</span>
                            <span className="text-muted-foreground">
                              {new Date(Date.now() - 5 * 60 * 60 * 1000).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

