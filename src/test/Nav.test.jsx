import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { render, screen } from "@testing-library/react"
import Nav from "../components/Nav"

function setPathname(pathname) {
  window.location = new URL(`http://localhost${pathname}`)
}

describe("Nav", () => {
  const originalLocation = window.location

  afterEach(() => {
    window.location = originalLocation
  })

  beforeEach(() => {
    setPathname("/")
  })

  it("renders the logo", () => {
    render(<Nav />)
    expect(screen.getByText("Andrea Do")).toBeInTheDocument()
  })

  it("renders all navigation links", () => {
    render(<Nav />)
    expect(screen.getByText("About")).toBeInTheDocument()
    expect(screen.getByText("Skills")).toBeInTheDocument()
    expect(screen.getByText("Experience")).toBeInTheDocument()
    expect(screen.getByText("Notes")).toBeInTheDocument()
    expect(screen.getByText("Contact")).toBeInTheDocument()
  })

  it("uses hash links on the home page", () => {
    render(<Nav />)
    expect(screen.getByText("About").getAttribute("href")).toBe("#about")
    expect(screen.getByText("Skills").getAttribute("href")).toBe("#skills")
    expect(screen.getByText("Experience").getAttribute("href")).toBe("#experience")
    expect(screen.getByText("Contact").getAttribute("href")).toBe("#contact")
  })

  it("uses absolute links on the notes page", () => {
    setPathname("/notes")
    render(<Nav />)
    expect(screen.getByText("About").getAttribute("href")).toBe("/#about")
    expect(screen.getByText("Skills").getAttribute("href")).toBe("/#skills")
    expect(screen.getByText("Experience").getAttribute("href")).toBe("/#experience")
    expect(screen.getByText("Contact").getAttribute("href")).toBe("/#contact")
  })

  it("always links Notes to /notes", () => {
    render(<Nav />)
    expect(screen.getByText("Notes").getAttribute("href")).toBe("/notes")
  })

  it("logo links to home", () => {
    render(<Nav />)
    expect(screen.getByText("Andrea Do").getAttribute("href")).toBe("/")
  })
})
