"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Activity, Database, Cpu, HardDrive } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/protected-route"

const performanceData = [
  { time: "00:00", cpu: 45, memory: 60, requests: 120 },
  { time: "04:00", cpu: 35, memory: 55, requests: 80 },
  { time: "08:00", cpu: 65, memory: 75, requests: 250 },
  { time: "12:00", cpu: 75, memory: 80, requests: 320 },
  { time: "16:00", cpu: 70, memory: 78, requests: 280 },
  { time: "20:00", cpu: 50, memory: 65, requests: 150 },
]

const slowQueries = [
  { query: "SELECT * FROM reconciliation_jobs...", duration: "2.3s", calls: 45 },
  { query: "SELECT * FROM exceptions WHERE...", duration: "1.8s", calls: 120 },
]

export default function PerformancePage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Performance Monitoring</h1>
              <p className="text-muted-foreground">
                Monitor system performance and optimization metrics
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">65%</div>
                  <p className="text-xs text-muted-foreground">+5% from last hour</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-muted-foreground">+3% from last hour</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Database Load</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42%</div>
                  <p className="text-xs text-muted-foreground">-2% from last hour</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">API Requests/min</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">320</div>
                  <p className="text-xs text-muted-foreground">+45 from last hour</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="database">Database</TabsTrigger>
                <TabsTrigger value="api">API Performance</TabsTrigger>
                <TabsTrigger value="optimization">Optimization</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>System Performance (24h)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="cpu"
                          stroke="#ef4444"
                          name="CPU %"
                          yAxisId="left"
                        />
                        <Line
                          type="monotone"
                          dataKey="memory"
                          stroke="#3b82f6"
                          name="Memory %"
                          yAxisId="left"
                        />
                        <Line
                          type="monotone"
                          dataKey="requests"
                          stroke="#22c55e"
                          name="Requests/min"
                          yAxisId="right"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="database" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Slow Queries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {slowQueries.map((query, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="warning">{query.duration}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {query.calls} calls
                            </span>
                          </div>
                          <code className="text-sm bg-muted p-2 rounded block">
                            {query.query}
                          </code>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="api" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>API Response Times</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={[
                          { endpoint: "/api/reconciliations", avgTime: 120, p95: 250 },
                          { endpoint: "/api/exceptions", avgTime: 85, p95: 180 },
                          { endpoint: "/api/files", avgTime: 200, p95: 450 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="endpoint" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="avgTime" fill="#3b82f6" name="Avg (ms)" />
                        <Bar dataKey="p95" fill="#ef4444" name="P95 (ms)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="optimization" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Optimization Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Add Database Index</h3>
                          <Badge variant="warning">High Impact</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Add index on reconciliation_jobs.organization_id to improve query
                          performance by ~40%
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Enable Query Caching</h3>
                          <Badge variant="default">Medium Impact</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Enable Redis caching for frequently accessed reconciliation data
                        </p>
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

