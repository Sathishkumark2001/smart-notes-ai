const TOKEN_KEY = 'smart_notes_token'


export function getToken(){
return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
localStorage.removeItem(TOKEN_KEY)
}


async function request(path,{method='GET',body} = {}){
const headers = {'Content-Type':'application/json'}
const token = getToken();
if(token) headers['Authorization'] = `Bearer ${token}`

const res = await fetch(`/api${path}`,{
            method,
           headers,
           body:body?JSON.stringify(body):undefined,
            })
      const data = await res.json()

      if(!res.ok){
       throw new Error(data.message || 'Request failed')
         }

return data

}

export const api = {
register:(payload) => request('/auth/register',{ method: 'POST', body: payload }),
 login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
   getNotes: () => request('/notes'),
  getNote: (id) => request(`/notes/${id}`),
  createNote: (payload) => request('/notes', { method: 'POST', body: payload }),
  updateNote: (id, payload) => request(`/notes/${id}`, { method: 'PUT', body: payload }),
  deleteNote: (id) => request(`/notes/${id}`, { method: 'DELETE' }),
  summarizeNote: (id) => request(`/notes/${id}/summarize`, { method: 'POST' }),


}
