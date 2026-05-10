"use client"

import * as React from "react"
import { Sparkles, ArrowRight, Gem } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-background">
      {/* Left side: Form */}
      <div className="flex w-full flex-col p-8 sm:p-12 lg:w-[45%] xl:p-20">
        <div className="mb-12">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex size-10 items-center justify-center overflow-hidden rounded-2xl bg-surface-raised border border-border shadow-xl transition-transform duration-300 group-hover:scale-105">
              <img src="/traveloop_logo.png" alt="Traveloop Logo" className="h-full w-full object-cover" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-text-primary uppercase">
              Traveloop<span className="text-primary">.</span>
            </span>
          </Link>
        </div>

        <div className="mx-auto w-full max-w-sm my-auto">
          <div className="mb-10 animate-fade-up space-y-3">
            <h1 className="font-serif text-[2.5rem] font-medium leading-[1.05] text-text-primary">
              Start your <span className="text-text-muted italic">journey.</span>
            </h1>
            <p className="text-sm text-text-secondary leading-relaxed">
              Create an account and let AI curate your travel experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="group/field space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted group-focus-within/field:text-primary transition-colors">Email Address</Label>
              <div className="relative">
                <Input 
                  type="email"
                  required
                  className="h-10 rounded-none border-0 border-b border-border bg-transparent px-0 pb-2 text-sm shadow-none focus-visible:ring-0"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-primary transition-all duration-300 group-focus-within/field:w-full" />
              </div>
            </div>

            <div className="group/field space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted group-focus-within/field:text-primary transition-colors">Password</Label>
              <div className="relative">
                <Input 
                  type="password"
                  required
                  className="h-10 rounded-none border-0 border-b border-border bg-transparent px-0 pb-2 text-sm shadow-none focus-visible:ring-0"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                />
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-primary transition-all duration-300 group-focus-within/field:w-full" />
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-coral-soft p-3 text-[11px] font-bold text-coral">
                {error}
              </div>
            )}

            <Button 
              disabled={loading}
              className="group h-12 w-full gap-2 bg-primary text-sm font-bold text-white shadow-[0_8px_20px_-6px_rgba(4,122,115,0.4)] transition-all hover:bg-primary-hover hover:-translate-y-0.5"
            >
              {loading ? "Creating Account..." : "Create Workspace"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <div className="text-center text-[11px] text-text-muted">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-primary hover:underline">Sign in</Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="relative hidden flex-1 lg:block">
        <img 
          src="/images/destinations/meghalaya-nature.jpg" 
          alt="Tropical paradise" 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-text-primary/60 via-transparent to-transparent" />
        
        {/* Floating Cards */}
        <div className="absolute top-12 right-12 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
            <div className="flex size-10 items-center justify-center rounded-full bg-ocean shadow-lg">
              <Sparkles className="size-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">AI Discovery</p>
              <p className="text-[10px] text-white/80">Find your perfect trip</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-32 right-12 animate-fade-up" style={{ animationDelay: "0.7s" }}>
          <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
            <div className="flex size-10 items-center justify-center rounded-full bg-coral shadow-lg">
              <Gem className="size-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">12 Hidden Gems</p>
              <p className="text-[10px] text-white/80">Discovered weekly</p>
            </div>
          </div>
        </div>

        {/* Editorial Overlay */}
        <div className="absolute bottom-12 left-12 max-w-sm animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <p className="font-serif text-3xl font-medium leading-tight text-white">
            Your next adventure starts here.
          </p>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            Join thousands of travelers who let AI curate unforgettable journeys tailored 
            just for them. Discover real places, through real signals.
          </p>
        </div>
      </div>
    </div>
  )
}
