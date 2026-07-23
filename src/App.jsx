import { useEffect } from "react"
import Home from "./pages/Home"
import Notes from "./pages/Notes"

function App() {
  const path = window.location.pathname

  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1))
      if (el) el.scrollIntoView()
    }
  }, [])

  if (path === "/notes" || path === "/notes/") {
    return <Notes />
  }

  return <Home />
}

export default App
