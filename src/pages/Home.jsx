import "./Home.css"
import { skillDomains } from "../data/skills"

function Home() {
  return (
    <div className="home">
      <nav className="nav">
        <span className="nav-logo">Andrea Do</span>
        <div className="nav-spacer" />
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="/notes">Notes</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
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
                <div className="skill-domain-bg" />
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
    </div>
  )
}

export default Home
