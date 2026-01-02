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
import { formatDateTime } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Plus, Calendar, Clock, Play, Pause, Trash2 } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/protected-route"

const schedules = [
  {
    id: "1",
    name: "Daily POS Reconciliation",
    frequency: "daily",
    time: "09:00",
    timezone: "Africa/Lagos",
    isActive: true,
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
    nextRun: new Date(Date.now() + 22 * 60 * 60 * 1000),
    templateId: "template-1",
  },
  {
    id: "2",
    name: "Weekly ATM Reconciliation",
    frequency: "weekly",
    day: "Monday",
    time: "08:00",
    timezone: "Africa/Lagos",
    isActive: true,
    lastRun: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    nextRun: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    templateId: "template-2",
  },
]

export default function SchedulesPage() {
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
                <h1 className="text-3xl font-bold tracking-tight">Scheduled Reconciliations</h1>
                <p className="text-muted-foreground">
                  Automate reconciliation jobs with scheduled processing
                </p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Schedule
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create Scheduled Reconciliation</DialogTitle>
                    <DialogDescription>
                      Set up automated reconciliation jobs that run on a schedule
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Schedule Name</Label>
                      <Input placeholder="Daily POS Reconciliation" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Frequency</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="custom">Custom (Cron)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <Input type="time" defaultValue="09:00" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Template</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select reconciliation template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="template-1">POS Settlement Template</SelectItem>
                          <SelectItem value="template-2">ATM Reconciliation Template</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select defaultValue="Africa/Lagos">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Africa/Lagos">Africa/Lagos (WAT)</SelectItem>
                          <SelectItem value="UTC">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Active</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable this schedule to run automatically
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Button className="w-full">Create Schedule</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead>Last Run</TableHead>
                      <TableHead>Next Run</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedules.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell className="font-medium">{schedule.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {schedule.frequency}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {schedule.time} {schedule.timezone}
                          </div>
                        </TableCell>
                        <TableCell>{formatDateTime(schedule.lastRun)}</TableCell>
                        <TableCell>{formatDateTime(schedule.nextRun)}</TableCell>
                        <TableCell>
                          <Badge variant={schedule.isActive ? "success" : "secondary"}>
                            {schedule.isActive ? "Active" : "Paused"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              {schedule.isActive ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
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

