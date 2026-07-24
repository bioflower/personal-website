import { describe, it, expect } from "vitest"
import { experienceEntries } from "../data/experience"

describe("experienceEntries", () => {
  it("has at least one entry", () => {
    expect(experienceEntries.length).toBeGreaterThan(0)
  })

  it("each entry has all required fields", () => {
    const requiredFields = ["title", "company", "location", "timeline", "description"]
    experienceEntries.forEach((entry) => {
      requiredFields.forEach((field) => {
        expect(entry).toHaveProperty(field)
        expect(typeof entry[field]).toBe("string")
        expect(entry[field].length).toBeGreaterThan(0)
      })
    })
  })

  it("each timeline has a valid date range format", () => {
    experienceEntries.forEach((entry) => {
      expect(entry.timeline).toMatch(/[A-Z][a-z]{2,}\s\d{4}\s-\s[A-Z][a-z]{2,}\s\d{4}/)
    })
  })

  it("has unique timeline values", () => {
    const timelines = experienceEntries.map((e) => e.timeline)
    expect(new Set(timelines).size).toBe(timelines.length)
  })
})
