"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, FileCheck, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

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

export function AnimatedStats() {
  const [countedValues, setCountedValues] = useState({
    reconciliations: 0,
    exceptions: 0,
    matchRate: 0,
    resolutionTime: 0,
  })

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    const timers = [
      setInterval(() => {
        setCountedValues((prev) => ({
          ...prev,
          reconciliations: Math.min(prev.reconciliations + 1247 / steps, 1247),
        }))
      }, interval),
      setInterval(() => {
        setCountedValues((prev) => ({
          ...prev,
          exceptions: Math.min(prev.exceptions + 342 / steps, 342),
        }))
      }, interval),
      setInterval(() => {
        setCountedValues((prev) => ({
          ...prev,
          matchRate: Math.min(prev.matchRate + 97.2 / steps, 97.2),
        }))
      }, interval),
      setInterval(() => {
        setCountedValues((prev) => ({
          ...prev,
          resolutionTime: Math.min(prev.resolutionTime + 4.2 / steps, 4.2),
        }))
      }, interval),
    ]

    return () => timers.forEach(clearInterval)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const isPositive = stat.trend === "up"
        const displayValue =
          index === 0
            ? Math.floor(countedValues.reconciliations).toLocaleString()
            : index === 1
            ? Math.floor(countedValues.exceptions).toLocaleString()
            : index === 2
            ? countedValues.matchRate.toFixed(1) + "%"
            : countedValues.resolutionTime.toFixed(1) + " hrs"

        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="hover:shadow-lg transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <motion.div
                  className="text-2xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {displayValue}
                </motion.div>
                <p
                  className={`text-xs flex items-center gap-1 mt-1 ${
                    isPositive ? "text-black" : "text-black"
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
          </motion.div>
        )
      })}
    </div>
  )
}

