# Web3Forms Contact Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the landing page's "Send a Message" form to Web3Forms via AJAX so visitors can send messages without leaving the page.

**Architecture:** Extract the static form into a self-contained `ContactForm` component (`src/components/ContactForm.jsx`) that owns its own submit state and `fetch` call. The access key comes from `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY` and is read inside the submit handler so tests can stub it. Styles move into a colocated `ContactForm.css`.

**Tech Stack:** React 19, Vite 8, Vitest 4 + @testing-library/react, plain CSS.

## Global Constraints

- JavaScript only (no TypeScript); functional components; plain CSS; no new dependencies.
- No backend, database, or authentication.
- Do not add code comments.
- Env var name is exactly `VITE_WEB3FORMS_ACCESS_KEY`; endpoint is exactly `https://api.web3forms.com/submit`.
- Follow existing patterns: default-exported components, `import "./Component.css"`, tests import `describe/it/expect/vi` explicitly from `vitest`.
- Per AGENTS.md, **do not commit or push without explicit user approval** — commit steps below are proposals to run only once the user approves.
- Run `npm run lint` and `npm run build` before declaring any task complete.

---

## File Structure

- `src/components/ContactForm.jsx` (new) — form markup + submit/status logic.
- `src/components/ContactForm.css` (new) — all `.form-*` styles moved from `Home.css`, plus status + honeypot styles.
- `src/pages/Home.jsx` (modify) — render `<ContactForm />`, drop inline form.
- `src/pages/Home.css` (modify) — remove moved `.form-*` rules; keep `.contact-form` container rules.
- `src/index.css` (modify) — add status color variables (light + dark).
- `src/test/ContactForm.test.jsx` (new) — behavior tests for the component.
- `.env.example` (new) — documents the env var.
- `.env` (new, gitignored) — user pastes their real key.

---

### Task 1: Build the `ContactForm` component

**Files:**
- Create: `src/components/ContactForm.jsx`
- Create: `src/components/ContactForm.css`
- Modify: `src/index.css`
- Create: `.env.example`
- Create: `.env`
- Test: `src/test/ContactForm.test.jsx`

**Interfaces:**
- Consumes: env var `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY` (string | undefined).
- Produces: default export `ContactForm` (no props). Renders a `<h3 className="form-heading">` and a `<form>`; parent wraps it in `<div className="contact-form">`. POSTs JSON to `https://api.web3forms.com/submit` with fields `access_key`, `from_name`, `email`, `subject`, `message`, `botcheck`.

- [ ] **Step 1: Write the failing tests**

Create `src/test/ContactForm.test.jsx`:

```jsx
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
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- src/test/ContactForm.test.jsx`
Expected: FAIL — `Failed to resolve import "../components/ContactForm"`.

- [ ] **Step 3: Add the status color variables**

In `src/index.css`, inside the light-theme `:root` block (near `--color-skill-border`), add:

```css
  --color-status-success: #1a7f37;
  --color-status-error: #b42318;
```

Inside the dark-theme block (the `@media (prefers-color-scheme: dark)` `:root`, near `--color-skill-border`), add:

```css
    --color-status-success: #4ade80;
    --color-status-error: #f87171;
```

- [ ] **Step 4: Create the stylesheet**

Create `src/components/ContactForm.css`:

```css
.form-heading {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-text);
  margin: 0 0 8px 0;
}

.form-label {
  font-size: 16px;
  line-height: 1.4;
  color: var(--color-text);
}

.form-row {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.form-row .form-field {
  flex: 1;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-input {
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  border: 1px solid var(--color-skill-border);
  border-radius: 6px;
  font-size: 16px;
  font-family: var(--sans);
  color: var(--color-text);
  background: var(--color-bg);
}

.form-textarea {
  min-height: 90px;
  resize: vertical;
  font-family: var(--sans);
}

.form-submit {
  align-self: flex-end;
  width: 190px;
  height: 42px;
  font-size: 14px;
  cursor: pointer;
}

.form-submit:disabled {
  cursor: default;
  opacity: 0.7;
}

.form-honeypot {
  display: none;
}

.form-status {
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
  min-height: 20px;
}

.form-status--success {
  color: var(--color-status-success);
}

.form-status--error {
  color: var(--color-status-error);
}

@media (max-width: 640px) {
  .form-row {
    flex-direction: column;
  }
}
```

- [ ] **Step 5: Create the component**

Create `src/components/ContactForm.jsx`:

```jsx
import { useState } from "react"
import "./ContactForm.css"

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"

function ContactForm() {
  const [status, setStatus] = useState("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      setStatus("error")
      setMessage("Form not configured. Please try again later.")
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    formData.append("access_key", accessKey)
    const payload = Object.fromEntries(formData)

    setStatus("sending")
    setMessage("")

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })
      const result = await response.json()

      if (result.success) {
        setStatus("success")
        setMessage("Message sent — thanks!")
        form.reset()
      } else {
        setStatus("error")
        setMessage(result.message || "Something went wrong. Please try again.")
      }
    } catch {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <>
      <h3 className="form-heading">Send a Message</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-field">
            <label className="form-label" htmlFor="contact-name">Your Name</label>
            <input id="contact-name" name="from_name" type="text" className="form-input" placeholder="Your Name" required />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="contact-email">Your Email</label>
            <input id="contact-email" name="email" type="email" className="form-input" placeholder="Your Email" required />
          </div>
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="contact-subject">Subject</label>
          <input id="contact-subject" name="subject" type="text" className="form-input" placeholder="Subject" />
        </div>
        <div className="form-field form-field-message">
          <label className="form-label" htmlFor="contact-message">Your Message</label>
          <textarea id="contact-message" name="message" className="form-input form-textarea" placeholder="Your Message" required />
        </div>
        <input type="checkbox" name="botcheck" className="form-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button type="submit" className="btn btn-secondary form-submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
        <p className={`form-status form-status--${status}`} aria-live="polite">{message}</p>
      </form>
    </>
  )
}

export default ContactForm
```

- [ ] **Step 6: Create the env files**

Create `.env.example`:

```
VITE_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key
```

Create `.env` (already covered by `.gitignore`) and have the user paste their real key:

```
VITE_WEB3FORMS_ACCESS_KEY=YOUR_KEY_HERE
```

- [ ] **Step 7: Run the tests to verify they pass**

Run: `npm test -- src/test/ContactForm.test.jsx`
Expected: PASS (4 tests).

- [ ] **Step 8: Lint**

Run: `npm run lint`
Expected: no errors. If `react-refresh/only-export-components` or similar flags the file, fix the cause rather than disabling the rule.

- [ ] **Step 9: Commit (only after user approval)**

```bash
git add src/components/ContactForm.jsx src/components/ContactForm.css src/index.css src/test/ContactForm.test.jsx .env.example
git commit -m "feat: add Web3Forms contact form component"
```

`.env` is intentionally not staged.

---

### Task 2: Integrate the form into the landing page

**Files:**
- Modify: `src/pages/Home.jsx:88-111`
- Modify: `src/pages/Home.css:294-348`, `src/pages/Home.css:437-439`
- Test: `src/test/Home.test.jsx` (existing — should keep passing)

**Interfaces:**
- Consumes: default export `ContactForm` from `src/components/ContactForm.jsx`.
- Produces: no new exports; the rendered page still exposes the same visible headings/labels so existing tests pass.

- [ ] **Step 1: Replace the inline form in `Home.jsx`**

Add the import after the existing imports:

```jsx
import ContactForm from "../components/ContactForm"
```

Replace the whole `<div className="contact-form">…</div>` block (currently `Home.jsx:88-111`, from `<div className="contact-form">` through its closing `</div>`) with:

```jsx
            <div className="contact-form">
              <ContactForm />
            </div>
```

- [ ] **Step 2: Move the form styles out of `Home.css`**

In `src/pages/Home.css`, delete the rules for `.form-heading`, `.form-label`, `.form-row`, `.form-row .form-field`, `.form-field`, `.form-input`, `.form-textarea`, and `.form-submit` (currently lines 294-348). Keep `.contact-form` and `.contact-form form` (lines 279-291) — the container and flex layout still apply.

In the `@media (max-width: 640px)` block, delete the `.form-row { flex-direction: column; }` rule (currently lines 437-439); it now lives in `ContactForm.css`.

- [ ] **Step 3: Run the full test suite**

Run: `npm test`
Expected: PASS — all existing tests plus the new `ContactForm` tests.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: build succeeds. Confirm the built bundle contains the Web3Forms endpoint string (`grep -r "api.web3forms.com" dist/assets`) — this verifies the component is wired in.

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 6: Commit (only after user approval)**

```bash
git add src/pages/Home.jsx src/pages/Home.css
git commit -m "feat: use ContactForm on the landing page"
```

---

## Deployment (manual, after merge)

1. In the Web3Forms dashboard, add `localhost` and the Amplify domain to the allowed domains.
2. In AWS Amplify → App settings → Environment variables, add `VITE_WEB3FORMS_ACCESS_KEY` with the real key, then redeploy so Vite bakes it into the build.

## Self-Review

- **Spec coverage:** access key handling (Task 1 steps 4-6), component/data flow (step 5), UX/accessibility — `required`, `aria-live`, disabled button, honeypot (step 5), styling incl. new `ContactForm.css` (steps 3-4), env/deployment (step 6 + Deployment section), tests (step 1), Home integration + CSS removal (Task 2). All covered.
- **Placeholder scan:** `YOUR_KEY_HERE` is intentional — the user pastes their own key, per the spec. No other placeholders.
- **Type consistency:** `ContactForm` default export used identically in Task 1 tests and Task 2 import; env var and endpoint strings match the Global Constraints.
- **Spec correction:** the spec's optional test #4 ("honeypot filled → no fetch call") is inaccurate — our component does not block submission based on `botcheck`; Web3Forms rejects it server-side. Replaced with a test asserting the honeypot is hidden from the tab order.
