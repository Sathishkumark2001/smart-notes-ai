import { createContext, useContext, useState,useEffect  } from 'react'
import { api, setToken, clearToken, getToken } from '../api/client'

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const[user,setUser] = useState(null)
    useEffect(()=>{
        const token = getToken()
        if(token){
            api.getMe().then((data) =>{
                setUser({name:data.name,email:data.email})
                })
            }

        },[])

    const login = async (email,password) => {
        const data = await api.login({email,password})
        setToken(data.token)
        setUser({name:data.name,email:data.email})
    }

const register = async (name,email,password) => {
        const data = await api.register({name,email,password})
        setToken(data.token)
        setUser({name:data.name,email:data.email})
    }


  const logout = () => {
    clearToken()
    setUser(null)
  }

return (
    <AuthContext.Provider value={{user,login,register,logout}}>
        {children}
     </AuthContext.Provider>
    )
}

export function useAuth() {
  return useContext(AuthContext)
}