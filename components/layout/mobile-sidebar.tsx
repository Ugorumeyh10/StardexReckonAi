"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Upload,
  FileCheck,
  AlertTriangle,
  FileText,
  Users,
  Settings,
  LogOut,
  CheckCircle2,
  Calendar,
  X,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/store"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Upload Files", href: "/upload", icon: Upload },
  { name: "Reconciliations", href: "/reconciliations", icon: FileCheck },
  { name: "Schedules", href: "/schedules", icon: Calendar },
  { name: "Exceptions", href: "/exceptions", icon: AlertTriangle },
  { name: "Bulk Actions", href: "/exceptions/bulk", icon: CheckCircle2 },
  { name: "Approvals", href: "/approvals", icon: CheckCircle2 },
  { name: "Templates", href: "/templates", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: FileText },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Report Builder", href: "/reports/builder", icon: FileText },
  { name: "Rules Builder", href: "/rules/builder", icon: Settings },
  { name: "Currencies", href: "/currencies", icon: FileText },
  { name: "Predictions", href: "/predictions", icon: AlertTriangle },
  { name: "Archive", href: "/archive", icon: FileText },
  { name: "Performance", href: "/performance", icon: FileText },
  { name: "Compliance", href: "/compliance", icon: FileText },
  { name: "History", href: "/history", icon: FileText },
  { name: "Integrations", href: "/integrations", icon: Settings },
  { name: "Users", href: "/users", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
]

const infoNavigation = [
  { name: "Help", href: "/help", icon: FileText },
  { name: "About", href: "/about", icon: Users },
  { name: "FAQ", href: "/faq", icon: FileText },
]

export function MobileSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b px-6 gap-3">
            <Image
              src="/images/stardex_co_logo.jpeg"
              alt="StardexReckonAi Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <h1 className="text-xl font-bold">
              Stardex<span className="text-muted-foreground">Reckon</span>
              <span className="font-light">Ai</span>
            </h1>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
            <div className="pt-4 mt-4 border-t">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
                Information
              </div>
              {infoNavigation.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

