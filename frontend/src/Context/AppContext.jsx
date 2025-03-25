import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();
function AppProvider({children}) {

  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const fetchCurrentUser = async (token) => {
    try {
      const response = await fetch('http://localhost:8001/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      setCurrentUser(data);
      console.log(data);
    }
    catch(error) {
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    if (token) {
      fetchCurrentUser(token);
    }
  }, [token])

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    fetchCurrentUser(newToken);
  }

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
  }


  return (
    <AppContext.Provider value={{currentUser, setCurrentUser, fetchCurrentUser, login, logout, token}}>
      {children}
    </AppContext.Provider>
  )
}
export default AppProvider;