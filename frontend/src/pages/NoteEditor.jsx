import { useParams,useNavigate, Link  } from 'react-router-dom'
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
            <div className="min-h-screen bg-gray-50 py-10 px-4">
                <div className="max-w-2xl mx-auto">
                    <Link to="/" className="text-blue-600 hover:underline text-sm mb-4 inline-block">← Back to notes</Link>
            <form onSubmit = {handleSave} className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
             className="w-full border border-gray-300 rounded-md px-3 py-2 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"/>
             <textarea
              value={content}
              onChange={(e)=>setContent(e.target.value)}
               rows={8}
               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
               <div className="flex gap-2">
              <button type="submit"  className="bg-blue-600 text-white rounded-md px-4 py-2 font-medium hover:bg-blue-700 transition">Save</button>
              <button type="button" onClick={handleDelete} className="bg-red-600 text-white rounded-md px-4 py-2 font-medium hover:bg-red-700 transition ml-auto">Delete</button>
              <button type="button" onClick={handleSummarize} className="bg-green-600 text-white rounded-md px-4 py-2 font-medium hover:bg-green-700 transition">Summarize</button>
                 </div>
                </form>
                {note.summary && (
                                     <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                                         <h3 className="text-sm font-semibold text-gray-500 mb-1">AI Summary</h3>
                                         <p className="text-gray-800">{note.summary}</p>
                                     </div>
                                 )}
                    </div>
                    </div>
        )

    }



export default NoteEditor


