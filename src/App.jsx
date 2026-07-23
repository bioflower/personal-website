import Home from "./pages/Home"
import Notes from "./pages/Notes"

function App() {
  const path = window.location.pathname

  if (path === "/notes" || path === "/notes/") {
    return <Notes />
  }

  return <Home />
}

export default App
