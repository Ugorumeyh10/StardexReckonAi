"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Activity, CheckCircle2, AlertCircle } from "lucide-react"
import { getWebSocket } from "@/lib/websocket"

interface RealtimeStatusProps {
  jobId: string
}

export function RealtimeStatus({ jobId }: RealtimeStatusProps) {
  const [status, setStatus] = useState({
    progress: 0,
    processedRows: 0,
    totalRows: 0,
    matchedRows: 0,
    exceptionRows: 0,
    currentPhase: "Initializing...",
  })

  useEffect(() => {
    const ws = getWebSocket()

    const unsubscribe = ws.subscribe(`job:${jobId}`, (data) => {
      setStatus({
        progress: data.progress || 0,
        processedRows: data.processedRows || 0,
        totalRows: data.totalRows || 0,
        matchedRows: data.matchedRows || 0,
        exceptionRows: data.exceptionRows || 0,
        currentPhase: data.phase || "Processing...",
      })
    })

    return () => {
      unsubscribe()
    }
  }, [jobId])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary animate-pulse" />
          Real-Time Processing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">{status.currentPhase}</span>
            <span className="font-medium">{status.progress}%</span>
          </div>
          <Progress value={status.progress} />
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Processed:</span>
            <span className="ml-2 font-medium">
              {status.processedRows.toLocaleString()} / {status.totalRows.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Matched:</span>
            <span className="ml-2 font-medium text-green-600">
              {status.matchedRows.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Exceptions:</span>
            <span className="ml-2 font-medium text-red-600">
              {status.exceptionRows.toLocaleString()}
            </span>
          </div>
          <div>
            <Badge variant={status.progress === 100 ? "success" : "default"}>
              {status.progress === 100 ? "Completed" : "Processing"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

