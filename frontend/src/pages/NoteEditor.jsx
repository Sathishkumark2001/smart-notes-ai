import { useParams,useNavigate  } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api } from '../api/client'

function NoteEditor(){
    const { id } = useParams()
    const [note,setNote] = useState(null)
    const [title,setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const loadNote = async () => {
            const data = await api.getNote(id)
            setNote(data)
            setTitle(data.title)
            setContent(data.content)
            setLoading(false)
            }
    loadNote()
    },[id])

const handleSave = async (e) =>{
      e.preventDefault()
      await api.updateNote(id,{title,content})
      }


const handleDelete = async () =>{
    await api.deleteNote(id)
    navigate('/')
    }

const handleSummarize = async () =>{
    const updated = await api.summarizeNote(id)
    setNote(updated)
    }

    if(loading){
        return <p>Loading...</p>
       }

    return(
            <div>
        <form onSubmit = {handleSave}>
            <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)} />
             <textarea
              value={content}
              onChange={(e)=>setContent(e.target.value)} />
              <button type="submit">Save</button>
              <button type="button" onClick={handleDelete}>Delete</button>
              <button type="button" onClick={handleSummarize}>Summarize</button>
                </form>
                {note.summary && <p>Summary: {note.summary}</p>}
                    </div>
        )

    }



export default NoteEditor


