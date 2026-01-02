"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Lock, Mail, Shield, AlertCircle } from "lucide-react"
import Link from "next/link"
import { authenticate } from "@/lib/auth"
import { useAuthStore } from "@/lib/store"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/background.jpg)',
          }}
        >
          {/* Fallback gradient background if image doesn't load */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-background" />
        </div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        <Card className="backdrop-blur-sm bg-background/95 border-border/50 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4 animate-scaleIn">
              <Image
                src="/images/stardex_co_logo.jpeg"
                alt="StardexReckonAi Logo"
                width={80}
                height={80}
                className="object-contain rounded-lg"
              />
            </div>
            <CardTitle className="text-3xl font-bold animate-fadeIn">Welcome to StardexReckonAi</CardTitle>
            <CardDescription className="text-base animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              AI-Powered Reconciliation System
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <form 
              className="space-y-4" 
              onSubmit={async (e) => {
                e.preventDefault()
                setError("")
                setIsLoading(true)
                
                try {
                  const user = authenticate(email, password)
                  if (user) {
                    login(user)
                    router.push("/dashboard")
                  } else {
                    setError("Invalid email or password")
                  }
                } catch (err) {
                  setError("An error occurred. Please try again.")
                } finally {
                  setIsLoading(false)
                }
              }}
            >
              {error && (
                <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@bank.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-normal cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            </div>
            <div className="relative animate-fadeIn" style={{ animationDelay: "0.4s" }}>
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Secure Login
                </span>
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground animate-fadeIn" style={{ animationDelay: "0.5s" }}>
              <p>
                Protected by bank-grade security and{" "}
                <span className="font-semibold text-primary">MFA</span>
              </p>
            </div>
            <div className="mt-4 p-3 bg-muted/50 rounded-md animate-scaleIn" style={{ animationDelay: "0.6s" }}>
              <p className="text-xs font-semibold mb-2 text-muted-foreground">Demo Accounts:</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p><strong>Admin:</strong> admin@reckai.com / admin123</p>
                <p><strong>Analyst:</strong> analyst@reckai.com / analyst123</p>
                <p><strong>Auditor:</strong> auditor@reckai.com / auditor123</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6 text-center text-sm text-white/80">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/contact" className="text-primary hover:underline font-medium">
              Contact Administrator
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

