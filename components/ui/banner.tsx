"use client"

import { X, AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface BannerProps {
  variant?: "info" | "success" | "warning" | "error"
  title?: string
  children: React.ReactNode
  dismissible?: boolean
  className?: string
}

const variants = {
  info: {
    icon: Info,
    bg: "bg-black",
    border: "border-white/20",
    text: "text-white",
  },
  success: {
    icon: CheckCircle2,
    bg: "bg-black",
    border: "border-white/20",
    text: "text-white",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-black",
    border: "border-white/20",
    text: "text-white",
  },
  error: {
    icon: AlertCircle,
    bg: "bg-black",
    border: "border-white/20",
    text: "text-white",
  },
}

export function Banner({
  variant = "info",
  title,
  children,
  dismissible = false,
  className,
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const { icon: Icon, bg, border, text } = variants[variant]

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "relative flex items-start gap-3 p-4 border rounded-lg animate-slideIn",
        bg,
        border,
        text,
        className
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        {title && <h3 className="font-semibold mb-1">{title}</h3>}
        <div className="text-sm">{children}</div>
      </div>
      {dismissible && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-white hover:bg-white/20"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

