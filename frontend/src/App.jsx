import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NoteEditor from './pages/NoteEditor'


function App() {
  return (
          <AuthProvider>
              <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/notes/:id" element={<NoteEditor />} />
                  </Routes>
              </AuthProvider>

      )
}

export default App
