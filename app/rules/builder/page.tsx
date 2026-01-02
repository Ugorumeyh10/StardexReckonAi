"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, Save, Play } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function RulesBuilderPage() {
  const [rules, setRules] = useState([
    {
      id: "1",
      field: "amount",
      operator: "equals",
      value: "",
      then: "match",
    },
  ])

  const addRule = () => {
    setRules([
      ...rules,
      {
        id: Date.now().toString(),
        field: "",
        operator: "equals",
        value: "",
        then: "match",
      },
    ])
  }

  const removeRule = (id: string) => {
    setRules(rules.filter((r) => r.id !== id))
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Rules Engine Builder</h1>
                <p className="text-muted-foreground">
                  Visual rule builder for reconciliation matching rules
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Play className="mr-2 h-4 w-4" />
                  Test Rules
                </Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Rules
                </Button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Matching Rules</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {rules.map((rule, index) => (
                      <div key={rule.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Rule {index + 1}</span>
                          {rules.length > 1 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeRule(rule.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <Select value={rule.field} onValueChange={() => {}}>
                            <SelectTrigger>
                              <SelectValue placeholder="Field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="amount">Amount</SelectItem>
                              <SelectItem value="date">Date</SelectItem>
                              <SelectItem value="transaction_id">Transaction ID</SelectItem>
                              <SelectItem value="rrn">RRN</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select value={rule.operator} onValueChange={() => {}}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="equals">Equals</SelectItem>
                              <SelectItem value="fuzzy">Fuzzy Match</SelectItem>
                              <SelectItem value="range">Within Range</SelectItem>
                              <SelectItem value="regex">Regex</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            value={rule.value}
                            onChange={() => {}}
                            placeholder="Value"
                          />
                          <Select value={rule.then} onValueChange={() => {}}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="match">Match</SelectItem>
                              <SelectItem value="exception">Create Exception</SelectItem>
                              <SelectItem value="skip">Skip</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" onClick={addRule} className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Rule
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Rule Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Rule Name</Label>
                      <Input placeholder="Amount Match Rule" />
                    </div>
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Input type="number" defaultValue="0" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Active</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable this rule
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>Tolerance (%)</Label>
                      <Input type="number" step="0.01" placeholder="0.01" />
                    </div>
                    <div className="space-y-2">
                      <Label>Date Tolerance (days)</Label>
                      <Input type="number" defaultValue="1" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

