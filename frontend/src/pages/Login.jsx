import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

function Login() {
 const{login} = useAuth()
 const [email,setEmail] = useState('')
 const [password,setPassword] =  useState('')
 const [error,setError] = useState('')

 const handleSubmit = async (e) => {
     e.preventDefault()
     setError('')
     try{
         await login(email,password)
         }catch(err){
             setError(err.message)
         }
     }

   return(
       <div className = "min-h-screen flex items-center justify-center bg-gray-50">


       <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
                      <h1 className="text-2xl font-bold text-gray-800">Log in</h1>
           <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
           <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"  />
           {error && <p className="text-red-500 text-sm">{error}</p>}
           <button type="submit" className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 transition">Log in</button>
           <p className="text-sm text-gray-500 text-center">
             No account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
           </p>
       </form>
       </div>
       )
  }
export default Login