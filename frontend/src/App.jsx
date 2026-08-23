import { useState } from 'react'

function App() {
  const [status, setStatus] = useState('Not checked yet')

  // Note: calls go through /api/... which Nginx routes to Spring Boot.
  // This will 401 (expected — no auth token) but proves the gateway routing works.
  const checkGateway = async () => {
    try {
      const res = await fetch('/api/notes')
      setStatus(`Backend responded: HTTP ${res.status}`)
    } catch (err) {
      setStatus(`Gateway/network error: ${err.message}`)
    }
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Smart Notes AI</h1>
      <p>Placeholder frontend — real UI coming next.</p>
      <button onClick={checkGateway}>Test gateway → backend routing</button>
      <p>{status}</p>
    </div>
  )
}

export default App
