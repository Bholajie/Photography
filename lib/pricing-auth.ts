import { createHmac, timingSafeEqual } from "crypto"

export const PRICING_ADMIN_COOKIE = "pricing_admin_session"

function getAdminPassword() {
  return process.env.PRICING_ADMIN_PASSWORD
}

export function isPricingAdminConfigured() {
  return Boolean(getAdminPassword())
}

export function isValidPricingAdminPassword(password: string) {
  const configuredPassword = getAdminPassword()
  if (!configuredPassword || !password) return false

  const provided = Buffer.from(password)
  const expected = Buffer.from(configuredPassword)
  return provided.length === expected.length && timingSafeEqual(provided, expected)
}

export function createPricingAdminToken() {
  const configuredPassword = getAdminPassword()
  if (!configuredPassword) return null

  return createHmac("sha256", configuredPassword)
    .update("sheyilor-pricing-admin")
    .digest("hex")
}

export function isValidPricingAdminToken(token?: string) {
  const expectedToken = createPricingAdminToken()
  if (!expectedToken || !token) return false

  const provided = Buffer.from(token)
  const expected = Buffer.from(expectedToken)
  return provided.length === expected.length && timingSafeEqual(provided, expected)
}
