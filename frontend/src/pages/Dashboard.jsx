import { useState, useEffect } from 'react'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

function Dashboard() {
    const {user,logout} = useAuth()
    const[notes,setNotes] = useState([])
    const[loading,setLoading] = useState(true)

    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')

    useEffect(() => {
        const loadNotes = async () =>{
        const data = await api.getNotes()
        setNotes(data)
        setLoading(false)
        }
        loadNotes()
        },[])

    const handleCreate = async(e) =>{
        e.preventDefault()
        const newNote = await api.createNote({title,content})
        setNotes([newNote,...notes])
        setTitle('')
        setContent('')
        }


    if(loading){
        return <p>Loading...</p>
        }
    return(
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Welcome {user?.name}</h1>
                    <button onClick={logout} className="text-sm text-gray-500 hover:text-gray-800">Log out</button>
                </div>
                <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg shadow-md space-y-3 mb-6">
                    <input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <textarea
                        placeholder="Write a note..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button type="submit" className="bg-blue-600 text-white rounded-md px-4 py-2 font-medium hover:bg-blue-700 transition">
                        Create note
                    </button>
                 </form>
               <ul className="space-y-3">
                   {notes.map((note) => (
                       <li
                           key={note.id}
                           className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                       >
                           <Link
                               to={`/notes/${note.id}`}
                               className="text-lg font-medium text-gray-800 hover:text-blue-600"
                           >
                               {note.title}
                           </Link>
                       </li>
                   ))}
               </ul>
                </div>
                </div>
        )
    }

export default Dashboard