/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useRef } from 'react'

const initialState = { message: null, type: 'info' }

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return { message: action.payload.message, type: action.payload.type }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, initialState)
  const timeoutRef = useRef(null)

  const notify = (message, type = 'success', seconds = 5) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'SET', payload: { message, type } })
    timeoutRef.current = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, seconds * 1000)
  }

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext).notification
export const useNotify = () => useContext(NotificationContext).notify

export default NotificationContext
