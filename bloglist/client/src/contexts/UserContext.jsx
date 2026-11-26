/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import persistentUser from '../services/persistentUser'

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  // Runs once: restore a previously logged-in user, if there is one.
  const [user, setUser] = useState(() => {
    const storedUser = persistentUser.getUser()
    if (storedUser) {
      blogService.setToken(storedUser.token)
    }
    return storedUser
  })

  // Throws if the credentials are wrong, so the caller can show an error.
  const login = async (credentials) => {
    const loggedInUser = await loginService.login(credentials)
    persistentUser.saveUser(loggedInUser)
    blogService.setToken(loggedInUser.token)
    setUser(loggedInUser)
  }

  const logout = () => {
    persistentUser.removeUser()
    blogService.setToken(null)
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext).user
export const useAuth = () => {
  const { login, logout } = useContext(UserContext)
  return { login, logout }
}

export default UserContext
