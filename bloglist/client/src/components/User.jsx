import { useParams } from 'react-router-dom'
import { Paper, Typography, List, ListItem } from '@mui/material'
import { useUsers } from '../hooks/useUsers'
import NotFound from './NotFound'

const User = () => {
  const id = useParams().id
  const { users, isPending } = useUsers()

  if (isPending) {
    return <div>loading user...</div>
  }

  const user = users.find(u => u.id === id)

  if (!user) {
    return <NotFound />
  }

  return (
    <Paper elevation={2} style={{ padding: 20, marginTop: 10 }}>
      <Typography variant="h5" component="h2">{user.name}</Typography>
      <Typography variant="subtitle1" style={{ marginTop: 10 }}>
        added blogs
      </Typography>
      {user.blogs.length === 0
        ? <Typography style={{ marginTop: 5 }}>no blogs added yet</Typography>
        : (
          <List>
            {user.blogs.map(blog => (
              <ListItem key={blog.id} divider>{blog.title}</ListItem>
            ))}
          </List>
        )
      }
    </Paper>
  )
}

export default User
