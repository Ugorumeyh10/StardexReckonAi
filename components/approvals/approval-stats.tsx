"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CheckCircle2, XCircle, FileText } from "lucide-react"

const stats = [
  {
    title: "Pending Approvals",
    value: "12",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    title: "Approved Today",
    value: "8",
    icon: CheckCircle2,
    color: "text-green-600",
  },
  {
    title: "Declined Today",
    value: "2",
    icon: XCircle,
    color: "text-red-600",
  },
  {
    title: "Total Requests",
    value: "156",
    icon: FileText,
    color: "text-blue-600",
  },
]

export function ApprovalStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

