"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Compass,
  Sparkles,
  MapPin,
  ArrowRight,
  Route,
  Eye,
  EyeOff,
  AlertCircle,
  X,
  Loader2,
} from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const emailId = useId();
  const passwordId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const email = watch("email", "");
  const emailValid = email.length > 0 && !errors.email;

  async function onSubmit(data: LoginFormValues) {
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setError("The email or password you entered is incorrect.");
        } else {
          setError(error.message);
        }
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-background font-sans selection:bg-primary/10 selection:text-primary">
      {/* Subtle dot pattern on background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Left panel — Form */}
      <div className="relative z-10 flex w-full flex-col justify-between bg-surface px-6 py-8 sm:px-10 sm:py-12 lg:w-[44%] xl:w-[42%] shadow-2xl">
        {/* Logo */}
        <div className="animate-fade-in">
          <Link href="/" className="inline-flex items-center gap-3 group/logo">
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-surface-raised border border-border shadow-xl transition-transform duration-300 group-hover/logo:scale-105">
              <img src="/traveloop_logo.png" alt="Traveloop Logo" className="h-full w-full object-cover" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-text-primary uppercase">
              Traveloop<span className="text-primary">.</span>
            </span>
          </Link>
        </div>

        {/* Form */}
        <div className="mx-auto w-full max-w-[380px] my-auto py-12">
          {/* Heading */}
          <div
            className="mb-12 animate-fade-up space-y-4"
            style={{ animationDelay: "0.1s" }}
          >
            <h1 className="font-serif text-5xl font-bold leading-tight text-text-primary uppercase">
              Welcome<span className="text-primary">.</span>
            </h1>
            <p className="text-lg leading-relaxed text-text-secondary">
              Sign in to your AI travel workspace.
            </p>
          </div>

          {/* Form fields */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Email */}
            <div className="group/field space-y-2">
              <Label
                htmlFor={emailId}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted transition-colors group-focus-within/field:text-primary"
              >
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id={emailId}
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  className={cn(
                    "h-14 rounded-full border border-border bg-background px-6 text-sm text-text-primary transition-all focus:border-primary focus:ring-1 focus:ring-primary/20 shadow-none",
                    errors.email && "border-error focus:border-error focus:ring-error/20"
                  )}
                />
                {/* Success indicator */}
                {emailValid && (
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-success/20 animate-fade-in">
                    <svg
                      className="h-3 w-3 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                )}
              </div>
              {errors.email && (
                <p className="pl-6 text-[11px] font-medium text-error animate-fade-up">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="group/field space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor={passwordId}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted transition-colors group-focus-within/field:text-primary"
                >
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-bold text-text-muted transition-colors hover:text-primary"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id={passwordId}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className={cn(
                    "h-14 rounded-full border border-border bg-background px-6 pr-14 text-sm text-text-primary transition-all focus:border-primary focus:ring-1 focus:ring-primary/20 shadow-none",
                    errors.password && "border-error focus:border-error focus:ring-error/20"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="pl-6 text-[11px] font-medium text-error animate-fade-up">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 rounded-2xl border border-error/20 bg-error/10 px-5 py-4 animate-fade-up">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error" />
                <p className="flex-1 text-[13px] font-medium leading-relaxed text-error">
                  {error}
                </p>
                <button
                  type="button"
                  onClick={() => setError("")}
                  className="shrink-0 p-0.5 text-error/50 transition-colors hover:text-error"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="group/btn relative mt-4 h-16 w-full overflow-hidden rounded-full bg-primary text-base font-bold text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary-hover hover:-translate-y-1 active:translate-y-0"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full" />
              
              {loading ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Checking credentials...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Sign In</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                </div>
              )}
            </Button>
          </form>

          {/* Register link */}
          <div
            className="mt-12 animate-fade-up text-center"
            style={{ animationDelay: "0.35s" }}
          >
            <p className="text-sm text-text-secondary">
              New to Traveloop?{" "}
              <Link
                href="/register"
                className="font-bold text-primary hover:underline underline-offset-4"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p
          className="animate-fade-in text-center text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted/40 sm:text-left"
          style={{ animationDelay: "0.5s" }}
        >
          Traveloop &copy; 2026 &middot; AI Travel Planning
        </p>
      </div>

      {/* Right panel — Travel image + AI cards */}
      <div className="hidden lg:relative lg:flex lg:w-[56%] xl:w-[58%] bg-bg">
        <div className="absolute inset-4 rounded-[2.5rem] overflow-hidden shadow-2xl animate-reveal-right">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-surface-raised animate-pulse" />
          )}
          <img
            src="/images/destinations/udaipur-lakes.jpg"
            alt="Udaipur"
            onLoad={() => setImageLoaded(true)}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-1000",
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
            )}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-bg/90 via-bg/20 to-transparent" />

          {/* Floating AI cards */}
          <div
            className="absolute right-12 top-12 animate-fade-up"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="flex items-center gap-4 rounded-[24px] border border-border bg-surface/80 px-6 py-4 backdrop-blur-xl shadow-2xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/20">
                <Sparkles className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Budget Fit</p>
                <p className="text-sm font-bold text-text-primary">Perfect match found</p>
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-48 right-12 animate-fade-up"
            style={{ animationDelay: "1s" }}
          >
            <div className="flex items-center gap-4 rounded-[24px] border border-border bg-surface/80 px-6 py-4 backdrop-blur-xl shadow-2xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-info/20">
                <Route className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Planning Agent</p>
                <p className="text-sm font-bold text-text-primary">Itinerary ready</p>
              </div>
            </div>
          </div>

          {/* Overlay text */}
          <div className="absolute bottom-0 left-0 right-0 p-16">
            <div className="animate-fade-up" style={{ animationDelay: "0.6s" }}>
              <div className="mb-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">
                  <Compass className="h-4 w-4 text-primary" />
                  Discovery Agent
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">
                  <MapPin className="h-4 w-4 text-text-secondary" />
                  Udaipur, India
                </span>
              </div>
              <h2 className="font-serif text-6xl font-bold leading-tight text-white uppercase tracking-tight">
                Find the places<br />you're meant to be.
              </h2>
              <p className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed">
                Our AI agents scan millions of travel stories to discover hidden gems and build your perfect itinerary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

