"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/protected-route"

const currencies = [
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", rate: 1.0, isBase: true },
  { code: "USD", name: "US Dollar", symbol: "$", rate: 0.0012, isBase: false },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.0009, isBase: false },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.0011, isBase: false },
]

export default function CurrenciesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Multi-Currency Management</h1>
                <p className="text-muted-foreground">
                  Manage currencies and exchange rates for reconciliation
                </p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Currency
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Currency</DialogTitle>
                    <DialogDescription>
                      Add a new currency and set exchange rate
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Currency Code</Label>
                      <Input placeholder="USD" maxLength={3} />
                    </div>
                    <div className="space-y-2">
                      <Label>Currency Name</Label>
                      <Input placeholder="US Dollar" />
                    </div>
                    <div className="space-y-2">
                      <Label>Symbol</Label>
                      <Input placeholder="$" maxLength={3} />
                    </div>
                    <div className="space-y-2">
                      <Label>Exchange Rate (to NGN)</Label>
                      <Input type="number" placeholder="0.0012" step="0.0001" />
                    </div>
                    <Button className="w-full">Add Currency</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Exchange Rate</TableHead>
                      <TableHead>Base Currency</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currencies.map((currency) => (
                      <TableRow key={currency.code}>
                        <TableCell className="font-medium">{currency.code}</TableCell>
                        <TableCell>{currency.name}</TableCell>
                        <TableCell>{currency.symbol}</TableCell>
                        <TableCell>
                          {currency.rate.toFixed(4)} {currency.isBase ? "" : "NGN"}
                        </TableCell>
                        <TableCell>
                          {currency.isBase ? (
                            <Badge variant="success">Base</Badge>
                          ) : (
                            <Badge variant="outline">Secondary</Badge>
                          )}
                        </TableCell>
                        <TableCell>{new Date().toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {!currency.isBase && (
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Exchange Rate Update</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-update exchange rates</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically fetch latest rates from exchange rate API
                      </p>
                    </div>
                    <Button variant="outline">Update Now</Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Last updated: {new Date().toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

