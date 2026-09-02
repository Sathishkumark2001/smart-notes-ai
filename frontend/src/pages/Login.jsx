import { useState } from 'react'
import { useAuth } from '../context/AuthContext'


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
       <form onSubmit={handlesubmit}>
           <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
           <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
           {error && <p>{error}</p>}
           <button type="submit">Log in </button>
       </form>
       )
  }
export default Login