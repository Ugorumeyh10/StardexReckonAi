"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const slaData = [
  { month: "Aug", resolved: 120, pending: 45, escalated: 8 },
  { month: "Sep", resolved: 145, pending: 38, escalated: 5 },
  { month: "Oct", resolved: 162, pending: 32, escalated: 4 },
  { month: "Nov", resolved: 178, pending: 28, escalated: 3 },
  { month: "Dec", resolved: 195, pending: 22, escalated: 2 },
]

export function SLAChart() {
  return (
    <Card className="animate-fadeIn hover:shadow-lg transition-all">
      <CardHeader>
        <CardTitle>SLA Performance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={slaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="resolved" fill="#22c55e" name="Resolved" />
            <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
            <Bar dataKey="escalated" fill="#ef4444" name="Escalated" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

