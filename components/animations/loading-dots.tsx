"use client"

export function LoadingDots() {
  return (
    <div className="flex items-center gap-1">
      <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
      <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
      <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
    </div>
  )
}

