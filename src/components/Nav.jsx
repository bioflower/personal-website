import "./Nav.css"

function Nav() {
  const isHome = window.location.pathname === "/" || window.location.pathname === ""

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="/" className="nav-logo">Andrea Do</a>
        <div className="nav-links">
          <a href={isHome ? "#about" : "/#about"}>About</a>
          <a href={isHome ? "#skills" : "/#skills"}>Skills</a>
          <a href={isHome ? "#experience" : "/#experience"}>Experience</a>
          <a href="/notes">Notes</a>
          <a href={isHome ? "#contact" : "/#contact"}>Contact</a>
        </div>
      </div>
    </nav>
  )
}

export default Nav
