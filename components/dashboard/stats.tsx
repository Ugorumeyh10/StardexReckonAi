"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, FileCheck, AlertTriangle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

const stats = [
  {
    title: "Total Reconciliations",
    value: "1,247",
    change: "+12.5%",
    trend: "up",
    icon: FileCheck,
  },
  {
    title: "Active Exceptions",
    value: "342",
    change: "-8.2%",
    trend: "down",
    icon: AlertTriangle,
  },
  {
    title: "Match Rate",
    value: "97.2%",
    change: "+2.1%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Avg Resolution Time",
    value: "4.2 hrs",
    change: "-15.3%",
    trend: "down",
    icon: TrendingDown,
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const isPositive = stat.trend === "up"
        return (
          <Card key={stat.title} className="animate-scaleIn hover:shadow-lg transition-all" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs flex items-center gap-1 mt-1 ${
                  isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

