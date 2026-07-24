import { describe, it, expect } from "vitest"
import { contactMethods } from "../data/contact"

describe("contactMethods", () => {
  it("has at least one method", () => {
    expect(contactMethods.length).toBeGreaterThan(0)
  })

  it("each method has label and detail", () => {
    contactMethods.forEach((method) => {
      expect(method).toHaveProperty("label")
      expect(typeof method.label).toBe("string")
      expect(method.label.length).toBeGreaterThan(0)
      expect(method).toHaveProperty("detail")
      expect(typeof method.detail).toBe("string")
      expect(method.detail.length).toBeGreaterThan(0)
    })
  })

  it("has unique labels", () => {
    const labels = contactMethods.map((m) => m.label)
    expect(new Set(labels).size).toBe(labels.length)
  })

  it("includes an email method", () => {
    const email = contactMethods.find((m) => m.label.toLowerCase() === "email")
    expect(email).toBeDefined()
    expect(email.detail).toContain("@")
  })
})
