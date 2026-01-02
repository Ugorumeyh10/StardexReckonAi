"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDateTime } from "@/lib/utils"
import { MessageSquare, User, CheckCircle2, AlertTriangle, FileText } from "lucide-react"

const activities = [
  {
    id: "1",
    type: "comment",
    user: { name: "John Doe", initials: "JD" },
    action: "commented on",
    target: "Exception #123",
    content: "This looks like a timing difference. Checking with settlement team.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "2",
    type: "resolve",
    user: { name: "Jane Smith", initials: "JS" },
    action: "resolved",
    target: "Exception #120",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "3",
    type: "assign",
    user: { name: "Mike Johnson", initials: "MJ" },
    action: "assigned",
    target: "Exception #118",
    to: "John Doe",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: "4",
    type: "mention",
    user: { name: "Sarah Williams", initials: "SW" },
    action: "mentioned you in",
    target: "Exception #115",
    content: "@JohnDoe can you review this?",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case "comment":
      return MessageSquare
    case "resolve":
      return CheckCircle2
    case "assign":
      return User
    case "mention":
      return AlertTriangle
    default:
      return FileText
  }
}

const getActivityColor = (type: string) => {
  switch (type) {
    case "comment":
      return "text-blue-600"
    case "resolve":
      return "text-green-600"
    case "assign":
      return "text-purple-600"
    case "mention":
      return "text-yellow-600"
    default:
      return "text-gray-600"
  }
}

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type)
            const iconColor = getActivityColor(activity.type)
            return (
              <div key={activity.id} className="flex gap-3">
                <Avatar>
                  <AvatarFallback>{activity.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{activity.user.name}</span>
                    <span className="text-muted-foreground">{activity.action}</span>
                    <Badge variant="outline">{activity.target}</Badge>
                    {activity.to && (
                      <>
                        <span className="text-muted-foreground">to</span>
                        <span className="font-medium">{activity.to}</span>
                      </>
                    )}
                    <Icon className={`h-4 w-4 ${iconColor} ml-auto`} />
                  </div>
                  {activity.content && (
                    <p className="text-sm text-muted-foreground pl-7">{activity.content}</p>
                  )}
                  <p className="text-xs text-muted-foreground pl-7">
                    {formatDateTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

