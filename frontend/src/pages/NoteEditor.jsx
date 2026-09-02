import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api } from '../api/client'

function NoteEditor(){
    const { id } = useParams()
    const [note,setNote] = useState(null)
    const [title,setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)

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
    if(loading){
        return <p>Loading...</p>
       }

    return(
        <form onSubmit = {handleSave}>
            <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)} />
             <textarea
              value={content}
              onChange={(e)=>setContent(e.target.value)} />
              <button type="submit">Save</button>
                </form>
        )


    }

export default NoteEditor


