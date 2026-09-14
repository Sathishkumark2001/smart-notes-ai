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
        <div>
        <h1>Welcome {user?.name}</h1>
        <button onClick={logout}>Log out</button>
        <form onSubmit={handleCreate}>
            <input value={title} onChange={(e) => setTitle(e.target.value)}/>
            <textarea value={content} onChange={(e) => setContent(e.target.value)}/>
            <button type ="submit">Create note </button>
             </form>
        <ul>
            {notes.map((note)=>(
                <li key={note.id}><Link to = {`/notes/${note.id}`}>{note.title}</Link></li>
                ))}
         </ul>
        </div>
        )
    }

export default Dashboard