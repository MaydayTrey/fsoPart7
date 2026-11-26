import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Paper, Button, Typography, TextField, List, ListItem } from '@mui/material'
import NotFound from './NotFound'

const BlogView = ({ blogs, handleLike, handleDelete, addComment, username }) => {
  const id = useParams().id
  const [comment, setComment] = useState('')
  const blog = blogs.find(b => b.id === id)

  // An id that matches no blog is a "not found", not a crash.
  if (!blog) {
    return <NotFound />
  }

  const submitComment = (event) => {
    event.preventDefault()
    addComment(blog, comment)
    setComment('')
  }

  const comments = blog.comments || []

  // blog.user is read without a guard on purpose: a blog with no user is
  // broken data, and the ErrorBoundary around the routes handles the crash.
  return (
    <Paper elevation={2} style={{ padding: 20, marginTop: 10 }} className="blog">
      <Typography variant="h5">{blog.title} {blog.author}</Typography>

      <Typography style={{ marginTop: 10 }}>
        You can read it at: <a href={blog.url}>{blog.url}</a>
      </Typography>

      <Typography style={{ marginTop: 10 }}>
        Likes: {blog.likes}
      </Typography>
      {username && (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleLike(blog)}
          style={{ marginTop: 5 }}
        >
          like
        </Button>
      )}

      <Typography style={{ marginTop: 10 }}>
        Added by: {blog.user.name}
      </Typography>

      {blog.user.username === username && (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(blog)}
          style={{ marginTop: 10 }}
        >
          remove
        </Button>
      )}

      <Typography variant="h6" style={{ marginTop: 20 }}>comments</Typography>

      <form onSubmit={submitComment} style={{ marginTop: 10 }}>
        <TextField
          label="comment"
          size="small"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button type="submit" variant="contained" style={{ marginLeft: 10 }}>
          add comment
        </Button>
      </form>

      <List>
        {comments.map((text, index) => (
          <ListItem key={index} divider>{text}</ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default BlogView
