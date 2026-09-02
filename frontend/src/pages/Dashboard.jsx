import { useState, useEffect } from 'react'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
    const {user,logout} = useAuth()
    const[notes,setNotes] = useState([])
    const[loading,setLoading] = useState(true)

    useEffect(() => {
        const loadNotes = async () =>{
        const data = await api.getNotes()
        setNotes(data)
        setLoading(false)
        }
        loadNotes()
        },[])
    if(loading){
        return <p>Loading...</p>
        }
    return(
        <div>
        <h1>Welcome {user?.name}</h1>
        <button onClick={logout}>Log out</button>
        <ul>
            {notes.map((note)=>(
                <li key={note.id}>{note.title}</li>
                ))}
         </ul>
        </div>
        )
    }

export default Dashboard