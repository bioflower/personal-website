import "./Nav.css"

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="/" className="nav-logo">Andrea Do</a>
        <div className="nav-links">
          <a href="/#about">About</a>
          <a href="/#skills">Skills</a>
          <a href="/#experience">Experience</a>
          <a href="/notes">Notes</a>
          <a href="/#contact">Contact</a>
        </div>
      </div>
    </nav>
  )
}

export default Nav
