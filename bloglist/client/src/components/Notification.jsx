import { Alert } from '@mui/material'
import { useNotification } from '../contexts/NotificationContext'

const Notification = () => {
  const { message, type } = useNotification()

  if (message === null) {
    return null
  }

  return (
    <Alert severity={type} style={{ marginTop: 10, marginBottom: 10 }}>
      {message}
    </Alert>
  )
}

export default Notification
