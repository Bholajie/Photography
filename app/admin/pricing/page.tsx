"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DEFAULT_ADDITIONAL_FEES,
  DEFAULT_DELIVERY_FEES,
  type AdditionalFeeId,
  type DeliveryFeeId,
  type PricingConfig,
} from "@/lib/types"

const deliveryFields: Array<{ id: DeliveryFeeId; label: string }> = [
  { id: "outdoor-mainland", label: "Outdoor · Mainland" },
  { id: "outdoor-ikoyi-lekki", label: "Outdoor · Ikoyi/Lekki" },
  { id: "outdoor-lekki2-ajah", label: "Outdoor · Lekki 2/Ajah" },
  { id: "home-mainland", label: "Home service · Mainland" },
  { id: "home-vi-ikoyi", label: "Home service · VI/Ikoyi" },
  { id: "home-lekki-lekki2", label: "Home service · Lekki/Lekki 2" },
]

const additionalFields: Array<{ id: AdditionalFeeId; label: string }> = [
  { id: "express", label: "Express Service" },
  { id: "express-delivery", label: "Express Delivery" },
  { id: "extra-selections", label: "Extra Image Selection" },
  { id: "lateness-fee", label: "Lateness Fee" },
  { id: "photobook-30", label: "Photobook · 30 pages" },
  { id: "photobook-40", label: "Photobook · 40 pages" },
  { id: "frame", label: "Large Fibre Frame" },
  { id: "flash-drive", label: "Extra Flash Drive" },
  { id: "drone", label: "Drone Coverage" },
]

function formatPrice(value: number) {
  return `₦${value.toLocaleString()}`
}

export default function PricingAdminPage() {
  const [pricing, setPricing] = useState<PricingConfig | null>(null)
  const [packagePrices, setPackagePrices] = useState<Record<string, string>>({})
  const [deliveryFees, setDeliveryFees] = useState<Record<DeliveryFeeId, string>>(
    Object.fromEntries(
      Object.entries(DEFAULT_DELIVERY_FEES).map(([id, value]) => [id, String(value)])
    ) as Record<DeliveryFeeId, string>
  )
  const [additionalFees, setAdditionalFees] = useState<Record<AdditionalFeeId, string>>(
    Object.fromEntries(
      Object.entries(DEFAULT_ADDITIONAL_FEES).map(([id, value]) => [id, String(value)])
    ) as Record<AdditionalFeeId, string>
  )
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const loadPricing = async () => {
      try {
        const response = await fetch("/api/pricing", { cache: "no-store" })
        if (!response.ok) throw new Error("Unable to load pricing")

        const data: PricingConfig = await response.json()
        setPricing(data)
        setPackagePrices(
          Object.fromEntries(data.packages.map((pkg) => [pkg.id, String(pkg.price)]))
        )
        setDeliveryFees(
          Object.fromEntries(
            deliveryFields.map(({ id }) => [id, String(data.deliveryFees[id])])
          ) as Record<DeliveryFeeId, string>
        )
        setAdditionalFees(
          Object.fromEntries(
            additionalFields.map(({ id }) => [id, String(data.additionalFees[id])])
          ) as Record<AdditionalFeeId, string>
        )
      } catch {
        setError("Unable to load the current prices.")
      } finally {
        setIsLoading(false)
      }
    }

    loadPricing()
  }, [])

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    setMessage("")

    try {
      const response = await fetch("/api/pricing/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Unable to sign in")

      setIsLoggedIn(true)
      setPassword("")
      setMessage("You can now update prices.")
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to sign in")
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError("")
    setMessage("")

    const packagePriceValues = Object.fromEntries(
      Object.entries(packagePrices).map(([id, value]) => [id, Number(value)])
    )
    const deliveryFeeValues = Object.fromEntries(
      deliveryFields.map(({ id }) => [id, Number(deliveryFees[id])])
    )
    const additionalFeeValues = Object.fromEntries(
      additionalFields.map(({ id }) => [id, Number(additionalFees[id])])
    )
    const allValues = [
      ...Object.values(packagePriceValues),
      ...Object.values(deliveryFeeValues),
      ...Object.values(additionalFeeValues),
    ]

    if (allValues.some((value) => !Number.isInteger(value) || value < 0)) {
      setError("Prices must be whole numbers greater than or equal to zero.")
      setIsSaving(false)
      return
    }

    try {
      const response = await fetch("/api/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packagePrices: packagePriceValues,
          deliveryFees: deliveryFeeValues,
          additionalFees: additionalFeeValues,
        }),
      })
      const result = await response.json()
      if (!response.ok) {
        if (response.status === 401) setIsLoggedIn(false)
        throw new Error(result.error || "Unable to save prices")
      }

      setPricing(result)
      setMessage("Prices updated successfully. The booking page now uses the new values.")
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save prices")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <main className="container mx-auto px-4 py-12">Loading pricing…</main>
  }

  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">Admin</p>
        <h1 className="text-3xl font-display">Booking pricing</h1>
        <p className="mt-2 text-muted-foreground">
          Update package prices and delivery/logistics fees shown on <code>/book</code>.
        </p>
      </div>

      {!isLoggedIn && (
        <Card className="mb-8 max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Sign in to edit</CardTitle>
            <CardDescription>Your admin password is never stored in the browser.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pricing-password">Admin password</Label>
                <Input
                  id="pricing-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
              <Button type="submit">Sign in</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {error && <p className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
      {message && <p className="mb-4 rounded-md bg-accent/10 p-3 text-sm">{message}</p>}

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Package prices</CardTitle>
            <CardDescription>These are the base prices used in the package cards and totals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {pricing?.packages.map((pkg) => (
              <div key={pkg.id} className="grid gap-2 sm:grid-cols-[1fr_180px] sm:items-center">
                <div>
                  <Label htmlFor={`package-${pkg.id}`}>{pkg.name}</Label>
                  <p className="text-xs text-muted-foreground">Current: {formatPrice(pkg.price)}{pkg.priceSuffix}</p>
                </div>
                <Input
                  id={`package-${pkg.id}`}
                  type="number"
                  min="0"
                  step="1000"
                  value={packagePrices[pkg.id] || ""}
                  onChange={(event) => setPackagePrices((current) => ({ ...current, [pkg.id]: event.target.value }))}
                  disabled={!isLoggedIn}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-xl">Delivery / logistics</CardTitle>
            <CardDescription>These fees are added to eligible outdoor, home, and event bookings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {deliveryFields.map(({ id, label }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={`delivery-${id}`}>{label}</Label>
                <Input
                  id={`delivery-${id}`}
                  type="number"
                  min="0"
                  step="1000"
                  value={deliveryFees[id] || ""}
                  onChange={(event) => setDeliveryFees((current) => ({ ...current, [id]: event.target.value }))}
                  disabled={!isLoggedIn}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Additional fees</CardTitle>
            <CardDescription>These values are used by the event booking calculator.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {additionalFields.map(({ id, label }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={`additional-${id}`}>{label}</Label>
                <Input
                  id={`additional-${id}`}
                  type="number"
                  min="0"
                  step="1000"
                  value={additionalFees[id] || ""}
                  onChange={(event) => setAdditionalFees((current) => ({ ...current, [id]: event.target.value }))}
                  disabled={!isLoggedIn}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <Button onClick={handleSave} disabled={!isLoggedIn || isSaving}>
          {isSaving ? "Saving…" : "Save prices"}
        </Button>
        {pricing?.updatedAt && (
          <span className="text-sm text-muted-foreground">
            Last saved {new Date(pricing.updatedAt).toLocaleString()}
          </span>
        )}
      </div>
    </main>
  )
}
