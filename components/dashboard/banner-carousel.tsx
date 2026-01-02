"use client"

import { Carousel } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, AlertCircle, CheckCircle2, Zap } from "lucide-react"
import { Banner } from "@/components/ui/banner"

const announcements = [
  {
    title: "New Feature: Real-Time Processing",
    description: "Experience live reconciliation updates with our new WebSocket integration",
    icon: Zap,
    variant: "info" as const,
    action: "Learn More",
  },
  {
    title: "System Maintenance Complete",
    description: "All systems are operational. Performance improvements deployed.",
    icon: CheckCircle2,
    variant: "success" as const,
    action: "View Details",
  },
  {
    title: "High Exception Rate Alert",
    description: "Exception rate increased by 15% this week. Review exceptions dashboard.",
    icon: AlertCircle,
    variant: "warning" as const,
    action: "View Exceptions",
  },
]

export function BannerCarousel() {
  return (
    <div className="mb-6 animate-fadeIn">
      <Carousel autoPlay={true} interval={5000}>
        {announcements.map((announcement, index) => {
          const Icon = announcement.icon
          return (
            <Card key={index} className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-black text-white animate-pulse-slow">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{announcement.title}</h3>
                      <Badge variant="outline">{announcement.variant}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{announcement.description}</p>
                    <Button variant="outline" size="sm">
                      {announcement.action}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </Carousel>
    </div>
  )
}

