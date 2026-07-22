import "./Home.css"

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
    </div>
  )
}

export default Home
