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
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ProtectedRoute } from "@/components/auth/protected-route"

const trendData = [
  { month: "Aug", matchRate: 94.2, exceptions: 120, resolved: 95 },
  { month: "Sep", matchRate: 95.1, exceptions: 105, resolved: 98 },
  { month: "Oct", matchRate: 96.3, exceptions: 92, resolved: 102 },
  { month: "Nov", matchRate: 97.0, exceptions: 78, resolved: 115 },
  { month: "Dec", matchRate: 97.5, exceptions: 65, resolved: 125 },
]

const channelData = [
  { channel: "POS", transactions: 125000, exceptions: 45, matchRate: 97.2 },
  { channel: "ATM", transactions: 89000, exceptions: 23, matchRate: 98.1 },
  { channel: "Card", transactions: 234000, exceptions: 89, matchRate: 96.8 },
  { channel: "NIP", transactions: 156000, exceptions: 34, matchRate: 97.9 },
]

const exceptionTypes = [
  { name: "Amount Mismatch", value: 45, color: "#ef4444" },
  { name: "Timing Difference", value: 23, color: "#f59e0b" },
  { name: "Missing Entry", value: 12, color: "#3b82f6" },
  { name: "Duplicate", value: 8, color: "#8b5cf6" },
]

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Analytics & Insights</h1>
              <p className="text-muted-foreground">
                Advanced analytics and insights for reconciliation performance
              </p>
            </div>

            <Tabs defaultValue="trends" className="space-y-4">
              <TabsList>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="channels">Channels</TabsTrigger>
                <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>

              <TabsContent value="trends" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Match Rate Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={trendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="matchRate"
                            stroke="#3b82f6"
                            name="Match Rate %"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Exception Resolution Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={trendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="exceptions"
                            stroke="#ef4444"
                            name="Exceptions"
                          />
                          <Line
                            type="monotone"
                            dataKey="resolved"
                            stroke="#22c55e"
                            name="Resolved"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="channels" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Channel Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={channelData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="channel" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="transactions" fill="#3b82f6" name="Transactions" />
                        <Bar dataKey="exceptions" fill="#ef4444" name="Exceptions" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="exceptions" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Exception Types Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={exceptionTypes}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                              `${name} ${(percent * 100).toFixed(0)}%`
                            }
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {exceptionTypes.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Exception Severity Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={[
                            { severity: "Critical", count: 12 },
                            { severity: "High", count: 34 },
                            { severity: "Medium", count: 28 },
                            { severity: "Low", count: 15 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="severity" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#ef4444" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Processing Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart
                        data={[
                          { date: "Week 1", avgTime: 4.2, throughput: 1200 },
                          { date: "Week 2", avgTime: 3.8, throughput: 1350 },
                          { date: "Week 3", avgTime: 3.5, throughput: 1420 },
                          { date: "Week 4", avgTime: 3.2, throughput: 1580 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="avgTime"
                          stroke="#3b82f6"
                          name="Avg Processing Time (min)"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="throughput"
                          stroke="#22c55e"
                          name="Throughput (rows/min)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
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

