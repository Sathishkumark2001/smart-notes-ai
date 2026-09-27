import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NoteEditor from './pages/NoteEditor'
import PrivateRoute from './components/PrivateRoute'


function App() {
  return (
          <AuthProvider>
              <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/notes/:id" element={<PrivateRoute><NoteEditor /></PrivateRoute>} />
                  </Routes>
              </AuthProvider>

      )
}

export default App
