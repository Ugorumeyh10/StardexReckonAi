"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  BookOpen,
  Lightbulb,
  Zap,
  Minimize2,
  Maximize2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Carousel } from "@/components/ui/carousel"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  suggestions?: string[]
  quickActions?: { label: string; action: string }[]
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your StardexReckonAi assistant. I can help you with reconciliation questions, explain exceptions, guide you through workflows, and answer questions about the system. How can I help you today?",
    timestamp: new Date(),
    suggestions: [
      "How do I upload a file?",
      "What is an exception?",
      "How to create a report?",
    ],
  },
]

const QUICK_ACTIONS = [
  { label: "Upload Guide", action: "show_upload_guide" },
  { label: "Exception Help", action: "show_exception_help" },
  { label: "Report Tutorial", action: "show_report_tutorial" },
  { label: "Settings Help", action: "show_settings_help" },
]

export function EnhancedChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const response = generateResponse(input)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions,
        quickActions: response.quickActions,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000)
  }

  const generateResponse = (userInput: string): {
    content: string
    suggestions?: string[]
    quickActions?: { label: string; action: string }[]
  } => {
    const lowerInput = userInput.toLowerCase()

    if (lowerInput.includes("upload") || lowerInput.includes("file")) {
      return {
        content: "To upload files:\n1. Go to Upload Files page\n2. Select file type (bank, settlement, etc.)\n3. Drag & drop or click to select\n4. System will auto-detect format and guide mapping\n\nSupported formats: Excel, CSV, TXT, XML (max 100MB)",
        suggestions: ["How to map columns?", "What file types are supported?"],
        quickActions: [{ label: "Open Upload Page", action: "navigate:/upload" }],
      }
    }

    if (lowerInput.includes("exception") || lowerInput.includes("mismatch")) {
      return {
        content: "Exceptions occur when transactions don't match between data sources. Types include:\n• Amount mismatches\n• Date differences\n• Missing entries\n• Duplicates\n• Timing differences\n\nView exceptions in the Exceptions page. AI provides explanations and suggested actions for each.",
        suggestions: ["How to resolve exceptions?", "What is bulk resolution?"],
        quickActions: [{ label: "View Exceptions", action: "navigate:/exceptions" }],
      }
    }

    if (lowerInput.includes("report") || lowerInput.includes("export")) {
      return {
        content: "Generate reports:\n1. Go to Reports page\n2. Select report type (daily, aging, trend, etc.)\n3. Choose date range\n4. Select format (PDF, Excel, CSV)\n5. Generate and download\n\nUse Custom Report Builder for personalized reports.",
        suggestions: ["How to schedule reports?", "What report types are available?"],
      }
    }

    if (lowerInput.includes("help") || lowerInput.includes("how")) {
      return {
        content: "I can help with:\n• File uploads and mapping\n• Exception resolution\n• Report generation\n• Matching rules\n• System navigation\n• Troubleshooting\n\nTry asking about a specific feature or use the quick actions below!",
        suggestions: ["Upload guide", "Exception help", "Report tutorial"],
        quickActions: QUICK_ACTIONS,
      }
    }

    return {
      content: "I understand you're asking about that. Let me help you find the right information. Could you provide more details? I can assist with uploads, exceptions, reports, rules, and general navigation.",
      suggestions: ["How to upload files?", "What are exceptions?", "How to create reports?"],
    }
  }

  const handleQuickAction = (action: string) => {
    if (action.startsWith("navigate:")) {
      const path = action.split(":")[1]
      window.location.href = path
      return
    }

    const actionMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: action,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, actionMessage])
    handleSend()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => {
          setIsOpen(!isOpen)
          setIsMinimized(false)
        }}
        className={cn(
          "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-14 w-14 rounded-full shadow-lg z-50 animate-float bg-primary hover:bg-primary/90",
          isOpen && "hidden"
        )}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card
          className={cn(
            "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 shadow-2xl z-50 flex flex-col transition-all duration-300",
            isMinimized ? "w-80 h-16" : "w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-8rem)] sm:h-[600px] max-h-[600px]"
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-black text-white animate-pulse-slow">
                <Bot className="h-4 w-4" />
              </div>
              <CardTitle className="text-lg">StardexReckonAi Assistant</CardTitle>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8"
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          {!isMinimized && (
            <>
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 px-4 py-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-3 animate-fadeIn",
                          message.role === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        {message.role === "assistant" && (
                          <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "rounded-lg px-4 py-2 max-w-[80%] animate-scaleIn",
                            message.role === "user"
                              ? "bg-black text-white"
                              : "bg-muted"
                          )}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          {message.suggestions && message.suggestions.length > 0 && (
                            <div className="mt-3 space-y-2">
                              <p className="text-xs font-medium opacity-80">Suggestions:</p>
                              <div className="flex flex-wrap gap-2">
                                {message.suggestions.map((suggestion, idx) => (
                                  <Button
                                    key={idx}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-7"
                                    onClick={() => {
                                      setInput(suggestion)
                                      inputRef.current?.focus()
                                    }}
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                          {message.quickActions && message.quickActions.length > 0 && (
                            <div className="mt-3 space-y-2">
                              <p className="text-xs font-medium opacity-80">Quick Actions:</p>
                              <div className="flex flex-wrap gap-2">
                                {message.quickActions.map((action, idx) => (
                                  <Button
                                    key={idx}
                                    variant="secondary"
                                    size="sm"
                                    className="text-xs h-7"
                                    onClick={() => handleQuickAction(action.action)}
                                  >
                                    {action.label}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        {message.role === "user" && (
                          <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-3 justify-start animate-fadeIn">
                        <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="bg-muted rounded-lg px-4 py-2">
                          <div className="flex gap-1">
                            <div className="h-2 w-2 bg-foreground rounded-full animate-bounce" />
                            <div className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                            <div className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button onClick={handleSend} size="icon" disabled={!input.trim() || isTyping}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {QUICK_ACTIONS.slice(0, 4).map((action, idx) => (
                      <Button
                        key={idx}
                        variant="ghost"
                        size="sm"
                        className="text-xs h-6"
                        onClick={() => handleQuickAction(action.action)}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      )}
    </>
  )
}

