import { describe, it, expect, afterEach, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import App from "../App"

vi.mock("../assets/portrait.webp", () => ({ default: "portrait.png" }))

function setPathname(pathname) {
  window.location = new URL(`http://localhost${pathname}`)
}

describe("App routing", () => {
  const originalLocation = window.location

  afterEach(() => {
    window.location = originalLocation
  })

  it("renders Home on root path", () => {
    setPathname("/")
    render(<App />)
    expect(screen.getByText("Hello, I'm Andrea.")).toBeInTheDocument()
  })

  it("renders Home on empty path", () => {
    setPathname("/")
    render(<App />)
    expect(screen.getByText("Hello, I'm Andrea.")).toBeInTheDocument()
  })

  it("renders Notes on /notes", () => {
    setPathname("/notes")
    render(<App />)
    expect(screen.getByRole("heading", { name: "Notes" })).toBeInTheDocument()
    expect(screen.getByText("This page is under construction. Check back soon.")).toBeInTheDocument()
  })

  it("renders Notes on /notes/", () => {
    setPathname("/notes/")
    render(<App />)
    expect(screen.getByRole("heading", { name: "Notes" })).toBeInTheDocument()
  })

  it("renders Home for unknown paths", () => {
    setPathname("/some-random-path")
    render(<App />)
    expect(screen.getByText("Hello, I'm Andrea.")).toBeInTheDocument()
  })
})
