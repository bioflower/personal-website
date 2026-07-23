import "./Notes.css"
import Nav from "../components/Nav"

function Notes() {
  return (
    <div className="notes-page">
      <Nav />
      <section className="notes">
        <div className="notes-inner">
          <h1 className="notes-heading">Notes</h1>
          <p className="notes-message">This page is under construction. Check back soon.</p>
        </div>
      </section>
    </div>
  )
}

export default Notes
