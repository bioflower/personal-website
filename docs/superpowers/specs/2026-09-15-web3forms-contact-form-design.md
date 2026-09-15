# Web3Forms Contact Form — Design

**Date:** 2026-09-15
**Status:** Approved

## Problem

The "Send a Message" form on the landing page (`src/pages/Home.jsx`) is a static
`<form>` with no `name` attributes, no submit handler, and no way to actually
deliver messages. This spec wires it to [Web3Forms](https://web3forms.com), a
no-backend form service, using the AJAX approach.

## Goals

- Submissions are delivered to the site owner's inbox via Web3Forms.
- The user stays on the page and sees inline success/error feedback.
- Existing minimalist design and accessibility stay intact.
- No backend or new runtime dependencies are added.

## Non-Goals

- No database, authentication, or server code.
- No spam filtering beyond Web3Forms' built-in honeypot + domain locking.
- No visual redesign of the form.

## Access key

Web3Forms access keys are public by design (sent from the browser, domain-locked
in the Web3Forms dashboard). We still avoid committing it:

- `VITE_WEB3FORMS_ACCESS_KEY` read via `import.meta.env` at build time.
- Provided locally in `.env` (already gitignored).
- Documented in `.env.example`.
- Set as an Amplify environment variable (App settings → Environment variables)
  for production builds. Rotating the key = edit env var + redeploy.
- Missing key at build time: the form renders normally but submission shows an
  inline error ("Form not configured. Please try again later.") instead of
  silently failing.

## Component & data flow

New `src/components/ContactForm.jsx`, rendered by `Home.jsx` inside the existing
`.contact-form` container (replacing the inline `<form>`).

- React state: `status` (`idle | sending | success | error`) and `errorMessage`.
- On submit: `preventDefault()`, then `fetch("https://api.web3forms.com/submit")`
  with `Content-Type: application/json` and JSON body, then read `res.success`
  from the response.
- Success: show "Message sent — thanks!" and reset the form.
- Failure: show the Web3Forms-provided message, or a generic network error.

### Request body

| Field        | Source                                    |
| ------------ | ----------------------------------------- |
| `access_key` | `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY` |
| `from_name`  | Name input (named `from_name`)            |
| `email`      | Email input (required, `type="email"`)    |
| `subject`    | Subject input                             |
| `message`    | Message textarea (required)               |
| `botcheck`   | Honeypot, hidden via CSS, `tabIndex={-1}`, `autoComplete="off"` |

`botcheck` must remain empty; Web3Forms treats a filled value as a bot.

## UX & accessibility

- HTML5 validation: `required` on name, email, message; `type="email"` on email.
- Status line below the submit button, `aria-live="polite"`:
  - sending: "Sending…"
  - success: "Message sent — thanks!"
  - error: the Web3Forms error or a generic message.
- Submit button disabled while sending; label switches to "Sending…".
- All labels stay visible (`<label>` wrapping input text, existing pattern).

## Styling

- New `src/components/ContactForm.css` (colocated, matching `Nav.css` pattern).
- `ContactForm` renders the `<h3 className="form-heading">` heading plus the
  `<form>`. The `.contact-form` wrapper div stays in `Home.jsx` and keeps its
  container layout styles (`.contact-form`, `.contact-form form`) in `Home.css`.
- Move all other `.form-*` rules (heading, label, row, field, input, textarea,
  submit) out of `src/pages/Home.css` into the new file.
- Add `.form-status`, `.form-status--success`, `.form-status--error`.

## Files changed

- `src/components/ContactForm.jsx` (new)
- `src/components/ContactForm.css` (new)
- `src/pages/Home.jsx` (import + render `<ContactForm />`)
- `src/pages/Home.css` (remove moved form styles)
- `.env.example` (new)
- `.env` (new, gitignored, user pastes key)
- `src/test/ContactForm.test.jsx` (new)

## Testing

New `src/test/ContactForm.test.jsx` with `fetch` mocked via `vi.fn()`:

1. Success path → shows "Message sent — thanks!", resets fields, fetch called
   with the correct URL and JSON body containing `access_key`.
2. Error path (`success: false`) → shows the Web3Forms error message.
3. Missing access key → shows "Form not configured" error without calling fetch.
4. Honeypot filled → no fetch call (Web3Forms behavior; optional assertion).

Run `npm run lint` and `npm run build` before declaring complete.

## Deployment note

Add `localhost` and the Amplify domain to the allowed domains in the Web3Forms
dashboard so local testing and production both work. Amplify needs the
`VITE_WEB3FORMS_ACCESS_KEY` environment variable set, then a redeploy.