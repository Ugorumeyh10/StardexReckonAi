"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Clock, CheckCircle2, XCircle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

const stats = [
  {
    title: "Open Exceptions",
    value: "342",
    amount: 12500000,
    icon: AlertTriangle,
    color: "text-yellow-600",
  },
  {
    title: "In Progress",
    value: "89",
    amount: 3200000,
    icon: Clock,
    color: "text-blue-600",
  },
  {
    title: "Resolved Today",
    value: "156",
    amount: 8900000,
    icon: CheckCircle2,
    color: "text-green-600",
  },
  {
    title: "Escalated",
    value: "12",
    amount: 4500000,
    icon: XCircle,
    color: "text-red-600",
  },
]

export function ExceptionStats() {
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
              <p className="text-xs text-muted-foreground mt-1">
                {formatCurrency(stat.amount)} total value
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

