import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ContactForm from "../components/ContactForm"

async function fillAndSubmit(user) {
  await user.type(screen.getByLabelText("Your Name"), "Ada Lovelace")
  await user.type(screen.getByLabelText("Your Email"), "ada@example.com")
  await user.type(screen.getByLabelText("Your Message"), "Hello there")
  await user.click(screen.getByRole("button", { name: "Send Message" }))
}

describe("ContactForm", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_WEB3FORMS_ACCESS_KEY", "test-access-key")
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it("submits the form and shows a success message", async () => {
    const user = userEvent.setup()
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({ success: true }),
    })
    vi.stubGlobal("fetch", fetchMock)

    render(<ContactForm />)
    await fillAndSubmit(user)

    expect(await screen.findByText("Message sent — thanks!")).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [url, options] = fetchMock.mock.calls[0]
    expect(url).toBe("https://api.web3forms.com/submit")
    expect(options.method).toBe("POST")
    const body = JSON.parse(options.body)
    expect(body.access_key).toBe("test-access-key")
    expect(body.from_name).toBe("Ada Lovelace")
    expect(body.email).toBe("ada@example.com")
    expect(body.message).toBe("Hello there")
  })

  it("shows the Web3Forms error message when submission fails", async () => {
    const user = userEvent.setup()
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: async () => ({ success: false, message: "Invalid access key" }),
      }),
    )

    render(<ContactForm />)
    await fillAndSubmit(user)

    expect(await screen.findByText("Invalid access key")).toBeInTheDocument()
  })

  it("shows a configuration error and does not call fetch when the access key is missing", async () => {
    vi.stubEnv("VITE_WEB3FORMS_ACCESS_KEY", "")
    const user = userEvent.setup()
    const fetchMock = vi.fn()
    vi.stubGlobal("fetch", fetchMock)

    render(<ContactForm />)
    await fillAndSubmit(user)

    expect(
      await screen.findByText("Form not configured. Please try again later."),
    ).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it("keeps the honeypot field out of the tab order", () => {
    render(<ContactForm />)
    const honeypot = document.querySelector('input[name="botcheck"]')
    expect(honeypot).toHaveAttribute("tabindex", "-1")
    expect(honeypot).toHaveAttribute("aria-hidden", "true")
  })
})