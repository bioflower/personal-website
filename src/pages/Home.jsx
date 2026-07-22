import "./Home.css"
import Nav from "../components/Nav"
import { skillDomains } from "../data/skills"
import { experienceEntries } from "../data/experience"
import { contactMethods } from "../data/contact"

function Home() {
  return (
    <div className="home">
      <Nav />
      <section id="about" className="about">
        <div className="about-content">
          <div className="about-text">
            <h1 className="greeting">Hello, I'm Andrea.</h1>
            <p className="brief">I'm an AI Engineer with 7+ years of experience applying machine learning and data science to problems in business and medical research.</p>
            <p className="interest">I work across multidisciplinary teams, from early research through product delivery, to shape practical solutions and deploy AI at scale. I'm curiosity-driven, impact-focused and motivated by building technology that solves meaningful problems.</p>
            <div className="buttons">
              <a href="/notes" className="btn btn-primary">Read my notes</a>
              <a href="/resume.pdf" download className="btn btn-secondary">Download Resume</a>
            </div>
          </div>
          <div className="portrait-placeholder">
            <span>Portrait</span>
          </div>
        </div>
      </section>
      <section id="skills" className="skills">
        <div className="skills-inner">
          <h2 className="skills-heading">Technical Skills</h2>
          <div className="skills-grid">
            {skillDomains.map((domain) => (
              <div key={domain.title} className="skill-domain">
                <h3 className="skill-domain-title">{domain.title}</h3>
                <ul className="skill-list">
                  {domain.skills.map((skill) => (
                    <li key={skill} className="skill-chip">{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="experience" className="experience">
        <div className="experience-inner">
          <h2 className="experience-heading">Professional Experience</h2>
          <div className="experience-list">
            {experienceEntries.map((entry) => (
              <div key={entry.timeline} className="experience-card">
                <div className="experience-card-top">
                  <div className="experience-card-left">
                    <p className="experience-title">{entry.title}</p>
                    <p className="experience-company">{entry.company}</p>
                  </div>
                  <div className="experience-card-right">
                    <p className="experience-timeline">{entry.timeline}</p>
                    <p className="experience-location">{entry.location}</p>
                  </div>
                </div>
                <p className="experience-description">{entry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="contact">
        <div className="contact-inner">
          <h2 className="contact-heading">Let's Connect</h2>
          <div className="contact-layout">
            <div className="contact-cards">
            {contactMethods.map((method) => (
              <div key={method.label} className="contact-card">
                <p className="contact-label">{method.label}</p>
                <p className="contact-detail">{method.detail}</p>
              </div>
            ))}
            </div>
            <div className="contact-form">
              <h3 className="form-heading">Send a Message</h3>
              <form>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Your Name</label>
                    <input type="text" className="form-input" placeholder="Your Name" />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Your Email</label>
                    <input type="email" className="form-input" placeholder="Your Email" />
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label">Subject</label>
                  <input type="text" className="form-input" placeholder="Subject" />
                </div>
                <div className="form-field form-field-message">
                  <label className="form-label">Your Message</label>
                  <textarea className="form-input form-textarea" placeholder="Your Message" />
                </div>
                <button type="submit" className="btn btn-secondary form-submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
