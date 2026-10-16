import { NextResponse } from "next/server"
import { z } from "zod"
import {
  createPricingAdminToken,
  isPricingAdminConfigured,
  isValidPricingAdminPassword,
  PRICING_ADMIN_COOKIE,
} from "@/lib/pricing-auth"

export const runtime = "nodejs"

const loginSchema = z.object({
  password: z.string().min(1),
})

export async function POST(request: Request) {
  if (!isPricingAdminConfigured()) {
    return NextResponse.json(
      { error: "Pricing admin is not configured. Set PRICING_ADMIN_PASSWORD." },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    const result = loginSchema.safeParse(body)

    if (!result.success || !isValidPricingAdminPassword(result.data.password)) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 })
    }

    const token = createPricingAdminToken()
    if (!token) {
      return NextResponse.json({ error: "Pricing admin is not configured." }, { status: 503 })
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set(PRICING_ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/api/pricing",
    })
    return response
  } catch {
    return NextResponse.json({ error: "Unable to sign in right now." }, { status: 400 })
  }
}
