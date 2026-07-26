import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import App from "../App"
import { contactMethods } from "../data/contact"
import { skillDomains } from "../data/skills"

vi.mock("../assets/portrait.webp", () => ({ default: "portrait.png" }))

function setPathname(pathname) {
  window.location = new URL(`http://localhost${pathname}`)
}

describe("Home page", () => {
  const originalLocation = window.location

  afterEach(() => {
    window.location = originalLocation
  })

  beforeEach(() => {
    setPathname("/")
  })

  it("renders the greeting", () => {
    render(<App />)
    expect(screen.getByText("Hello, I'm Andrea.")).toBeInTheDocument()
  })

  it("renders download resume button", () => {
    render(<App />)
    const btn = screen.getByText("Download Resume")
    expect(btn).toBeInTheDocument()
    expect(btn.getAttribute("href")).toBe("/Andrea_Do_Resume_July_2026.pdf")
    expect(btn.getAttribute("target")).toBe("_blank")
  })

  it("renders read my notes button", () => {
    render(<App />)
    const btn = screen.getByText("Read my notes")
    expect(btn).toBeInTheDocument()
    expect(btn.getAttribute("href")).toBe("/notes")
  })

  it("renders all section headings", () => {
    render(<App />)
    expect(screen.getByText("Technical Skills")).toBeInTheDocument()
    expect(screen.getByText("Professional Experience")).toBeInTheDocument()
    expect(screen.getByText("Let's Connect")).toBeInTheDocument()
  })

  it("renders contact methods from data", () => {
    render(<App />)
    contactMethods.forEach((method) => {
      expect(screen.getByText(method.detail)).toBeInTheDocument()
    })
  })

  it("renders all skill domain titles", () => {
    render(<App />)
    skillDomains.forEach((domain) => {
      expect(screen.getByText(domain.title)).toBeInTheDocument()
    })
  })

  it("renders the portrait image", () => {
    render(<App />)
    const img = screen.getByAltText("Portrait of Andrea Do")
    expect(img).toBeInTheDocument()
    expect(img.tagName).toBe("IMG")
  })
})
