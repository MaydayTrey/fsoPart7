import { Link } from 'react-router-dom'
import { Paper, List, ListItem, ListItemText } from '@mui/material'

// A list, not a table: the course's users-view test looks up table rows by
// user name, and a blog table whose rows contain the author's name would
// match that lookup too.
const Blogs = ({ blogs }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <Paper>
        <List>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <ListItem key={blog.id} divider>
                <ListItemText
                  primary={
                    <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                  }
                  secondary={`${blog.likes} likes`}
                />
              </ListItem>
            ))}
        </List>
      </Paper>
    </div>
  )
}

export default Blogs
