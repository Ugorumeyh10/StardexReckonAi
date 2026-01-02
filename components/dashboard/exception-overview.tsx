"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const exceptions = [
  {
    id: "1",
    type: "amount_mismatch",
    severity: "high",
    amount: 125000,
    description: "POS transaction amount mismatch",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: "2",
    type: "missing_entry",
    severity: "critical",
    amount: 450000,
    description: "Missing reversal entry for failed transaction",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: "3",
    type: "timing_difference",
    severity: "medium",
    amount: 75000,
    description: "Settlement date timing difference",
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
  },
]

const severityColors = {
  low: "secondary",
  medium: "warning",
  high: "destructive",
  critical: "destructive",
} as const

export function ExceptionOverview() {
  return (
    <Card className="animate-scaleIn hover:shadow-lg transition-all">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Exceptions</CardTitle>
        <Button variant="ghost" size="sm">
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exceptions.map((exception) => (
              <TableRow key={exception.id}>
                <TableCell className="font-medium">
                  {exception.type.replace("_", " ")}
                </TableCell>
                <TableCell>
                  <Badge variant={severityColors[exception.severity as keyof typeof severityColors]}>
                    {exception.severity}
                  </Badge>
                </TableCell>
                <TableCell>{formatCurrency(exception.amount)}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {exception.description}
                </TableCell>
                <TableCell>{formatDate(exception.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

