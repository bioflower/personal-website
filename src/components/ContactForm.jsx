import { useState } from "react"
import "./ContactForm.css"

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"

function ContactForm() {
  const [status, setStatus] = useState("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    console.log("[ContactForm] submit", {
      accessKeyConfigured: Boolean(accessKey),
      accessKeyPreview: accessKey ? `${accessKey.slice(0, 4)}...${accessKey.slice(-4)}` : null,
    })
    if (!accessKey) {
      console.error("[ContactForm] access key missing — check VITE_WEB3FORMS_ACCESS_KEY")
      setStatus("error")
      setMessage("Form not configured. Please try again later.")
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    formData.append("access_key", accessKey)
    const payload = Object.fromEntries(formData)
    console.log("[ContactForm] payload", payload)

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
      console.log("[ContactForm] response status", response.status)
      const result = await response.json()
      console.log("[ContactForm] response body", result)

      if (result.success) {
        setStatus("success")
        setMessage("Message sent — thanks!")
        form.reset()
      } else {
        setStatus("error")
        setMessage(result.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("[ContactForm] fetch error", error)
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