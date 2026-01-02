"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/components/auth/protected-route"

const predictions = [
  {
    id: "1",
    transactionId: "TXN-12345",
    amount: 125000,
    predictedException: "amount_mismatch",
    confidence: 0.87,
    riskScore: 85,
    reason: "Similar transactions historically had amount mismatches",
    recommendation: "Review before processing",
  },
  {
    id: "2",
    transactionId: "TXN-12346",
    amount: 450000,
    predictedException: "missing_entry",
    confidence: 0.92,
    riskScore: 92,
    reason: "Pattern matches missing reversal entries",
    recommendation: "Verify reversal status",
  },
]

export default function PredictionsPage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Exception Predictions</h1>
              <p className="text-muted-foreground">
                AI-powered predictions to prevent exceptions before they occur
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">High Risk Predictions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">12</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Transactions with &gt;80% risk
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Prevented Exceptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">45</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    This month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Prediction Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last 30 days
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Predicted Exceptions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Predicted Type</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Risk Score</TableHead>
                      <TableHead>Recommendation</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {predictions.map((prediction) => (
                      <TableRow key={prediction.id}>
                        <TableCell className="font-mono text-xs">
                          {prediction.transactionId}
                        </TableCell>
                        <TableCell>{formatCurrency(prediction.amount)}</TableCell>
                        <TableCell>
                          <Badge variant="warning">
                            {prediction.predictedException.replace(/_/g, " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={prediction.confidence * 100} className="w-20" />
                            <span className="text-sm">
                              {(prediction.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {prediction.riskScore > 80 ? (
                              <TrendingUp className="h-4 w-4 text-red-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-green-600" />
                            )}
                            <span className="font-medium">{prediction.riskScore}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {prediction.recommendation}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

