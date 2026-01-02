"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SettingsForm() {
  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="matching">Matching Rules</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure general system preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Organization Name</Label>
              <Input defaultValue="Bank Name" />
            </div>
            <div className="space-y-2">
              <Label>Default Currency</Label>
              <Input defaultValue="NGN" />
            </div>
            <div className="space-y-2">
              <Label>Time Zone</Label>
              <Input defaultValue="Africa/Lagos" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">Save as Draft</Button>
              <Button className="flex-1">Request Approval</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="matching" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Matching Rules</CardTitle>
            <CardDescription>Configure reconciliation matching rules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Amount Tolerance (%)</Label>
              <Input type="number" defaultValue="0.01" step="0.01" />
            </div>
            <div className="space-y-2">
              <Label>Date Tolerance (days)</Label>
              <Input type="number" defaultValue="1" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Fuzzy Matching</Label>
                <p className="text-sm text-muted-foreground">
                  Allow partial string matches for transaction IDs
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-resolve Timing Differences</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically resolve exceptions within date tolerance
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">Save as Draft</Button>
              <Button className="flex-1">Request Approval</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure email and system notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications for critical exceptions
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Job Completion Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Notify when reconciliation jobs complete
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Exception Escalation Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Alert when exceptions are escalated
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">Save as Draft</Button>
              <Button className="flex-1">Request Approval</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Configure security and access controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require MFA</Label>
                <p className="text-sm text-muted-foreground">
                  Enforce multi-factor authentication for all users
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label>Session Timeout (minutes)</Label>
              <Input type="number" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label>Password Policy</Label>
              <Input defaultValue="Minimum 8 characters, 1 uppercase, 1 number" disabled />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">Save as Draft</Button>
              <Button className="flex-1">Request Approval</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

