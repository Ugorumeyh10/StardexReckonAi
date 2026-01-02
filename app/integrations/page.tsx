"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Key, Webhook, Database, CheckCircle2, XCircle } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/protected-route"

const integrations = [
  {
    id: "1",
    name: "Core Banking API",
    type: "api",
    status: "connected",
    description: "Integration with Finacle core banking system",
    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    name: "Paystack Webhook",
    type: "webhook",
    status: "connected",
    description: "Real-time settlement notifications from Paystack",
    lastSync: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "3",
    name: "FTP Server",
    type: "ftp",
    status: "disconnected",
    description: "Automated file retrieval from FTP server",
    lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
]

export default function IntegrationsPage() {
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
                <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
                <p className="text-muted-foreground">
                  Connect ReckAI with external systems and services
                </p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Integration
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Integration</DialogTitle>
                    <DialogDescription>
                      Connect ReckAI with external systems
                    </DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="api" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="api">API</TabsTrigger>
                      <TabsTrigger value="webhook">Webhook</TabsTrigger>
                      <TabsTrigger value="ftp">FTP/SFTP</TabsTrigger>
                    </TabsList>
                    <TabsContent value="api" className="space-y-4">
                      <div className="space-y-2">
                        <Label>Integration Name</Label>
                        <Input placeholder="Core Banking API" />
                      </div>
                      <div className="space-y-2">
                        <Label>API Endpoint</Label>
                        <Input placeholder="https://api.example.com/v1" />
                      </div>
                      <div className="space-y-2">
                        <Label>API Key</Label>
                        <Input type="password" placeholder="Enter API key" />
                      </div>
                      <Button className="w-full">Connect</Button>
                    </TabsContent>
                    <TabsContent value="webhook" className="space-y-4">
                      <div className="space-y-2">
                        <Label>Webhook Name</Label>
                        <Input placeholder="Paystack Webhook" />
                      </div>
                      <div className="space-y-2">
                        <Label>Webhook URL</Label>
                        <Input
                          value="https://api.reckai.com/webhooks/paystack"
                          disabled
                          className="bg-muted"
                        />
                        <p className="text-xs text-muted-foreground">
                          Use this URL in your external system
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Secret Key</Label>
                        <Input type="password" placeholder="Webhook secret" />
                      </div>
                      <Button className="w-full">Create Webhook</Button>
                    </TabsContent>
                    <TabsContent value="ftp" className="space-y-4">
                      <div className="space-y-2">
                        <Label>FTP Server Name</Label>
                        <Input placeholder="Settlement FTP Server" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Host</Label>
                          <Input placeholder="ftp.example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label>Port</Label>
                          <Input type="number" placeholder="21" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Username</Label>
                        <Input placeholder="ftp_user" />
                      </div>
                      <div className="space-y-2">
                        <Label>Password</Label>
                        <Input type="password" placeholder="Enter password" />
                      </div>
                      <Button className="w-full">Test & Connect</Button>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {integrations.map((integration) => (
                <Card key={integration.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {integration.type === "api" && <Key className="h-5 w-5" />}
                        {integration.type === "webhook" && <Webhook className="h-5 w-5" />}
                        {integration.type === "ftp" && <Database className="h-5 w-5" />}
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                      </div>
                      <Badge
                        variant={integration.status === "connected" ? "success" : "secondary"}
                      >
                        {integration.status === "connected" ? (
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                        ) : (
                          <XCircle className="mr-1 h-3 w-3" />
                        )}
                        {integration.status}
                      </Badge>
                    </div>
                    <CardDescription>{integration.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Last Sync: </span>
                      <span>{integration.lastSync.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={integration.status === "connected"}
                          onCheckedChange={() => {}}
                        />
                        <span className="text-sm">Enabled</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>
                  Access ReckAI APIs and webhooks for integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">REST API</h3>
                      <p className="text-sm text-muted-foreground">
                        Full REST API for programmatic access
                      </p>
                    </div>
                    <Button variant="outline">View Docs</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Webhooks</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive real-time events via webhooks
                      </p>
                    </div>
                    <Button variant="outline">Configure</Button>
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

