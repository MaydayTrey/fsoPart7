import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button } from '@mui/material'
import Blogs from './components/Blogs'
import BlogView from './components/BlogView'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import NotFound from './components/NotFound'
import ErrorBoundary from './components/ErrorBoundary'
import { useBlogs } from './hooks/useBlogs'
import { useNotify } from './contexts/NotificationContext'
import { useUser, useAuth } from './contexts/UserContext'

const App = () => {
  // Server state: TanStack Query, wrapped in a custom hook.
  const { blogs, isPending, createBlog, likeBlog, removeBlog, addComment } = useBlogs()
  // Client state: Context.
  const user = useUser()
  const { login, logout } = useAuth()
  const notify = useNotify()

  const navigate = useNavigate()

  const handleLogin = async (credentials) => {
    try {
      await login(credentials)
      navigate('/')
    } catch {
      notify('Failed to login!', 'error')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleCreate = async (blogObject) => {
    try {
      await createBlog(blogObject)
      notify(`Blog successfully created. ${blogObject.title} by ${blogObject.author}`, 'success')
      navigate('/')
    } catch {
      notify('Failed to create the blog.', 'error')
    }
  }

  const handleDelete = async (blogObject) => {
    if (!window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
      return
    }
    try {
      await removeBlog(blogObject)
      navigate('/')
    } catch {
      notify('Failed to remove the blog.', 'error')
    }
  }

  const handleLike = async (blogObject) => {
    try {
      await likeBlog(blogObject)
    } catch {
      notify('Failed to like the blog.', 'error')
    }
  }

  const handleComment = async (blogObject, comment) => {
    try {
      await addComment(blogObject.id, comment)
    } catch {
      notify('Failed to add the comment.', 'error')
    }
  }

  // The navigation bar is outside the ErrorBoundary, so it keeps working
  // even when something inside the boundary crashes.
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          {user
            ? <>
              <Button color="inherit" component={Link} to="/create">
                new blog
              </Button>
              <em style={{ marginLeft: 10, marginRight: 10 }}>
                {user.name} logged in
              </em>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
            : <Button color="inherit" component={Link} to="/login">
              login
            </Button>
          }
        </Toolbar>
      </AppBar>

      <ErrorBoundary>
        <Notification />

        <Routes>
          <Route path="/" element={<Blogs blogs={blogs} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/create" element={<BlogForm createBlog={handleCreate} />} />
          <Route path="/blogs/:id" element={
            isPending
              ? <div>loading...</div>
              : <BlogView
                blogs={blogs}
                handleLike={handleLike}
                handleDelete={handleDelete}
                addComment={handleComment}
                username={user?.username}
              />
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App
