import { describe, it, expect } from "vitest"
import { skillDomains } from "../data/skills"

describe("skillDomains", () => {
  it("has at least one domain", () => {
    expect(skillDomains.length).toBeGreaterThan(0)
  })

  it("each domain has a title and skills array", () => {
    skillDomains.forEach((domain) => {
      expect(domain).toHaveProperty("title")
      expect(typeof domain.title).toBe("string")
      expect(domain.title.length).toBeGreaterThan(0)
      expect(domain).toHaveProperty("skills")
      expect(Array.isArray(domain.skills)).toBe(true)
    })
  })

  it("each domain has at least one skill", () => {
    skillDomains.forEach((domain) => {
      expect(domain.skills.length).toBeGreaterThan(0)
    })
  })

  it("every skill is a non-empty string", () => {
    skillDomains.forEach((domain) => {
      domain.skills.forEach((skill) => {
        expect(typeof skill).toBe("string")
        expect(skill.length).toBeGreaterThan(0)
      })
    })
  })

  it("has unique domain titles", () => {
    const titles = skillDomains.map((d) => d.title)
    expect(new Set(titles).size).toBe(titles.length)
  })
})
