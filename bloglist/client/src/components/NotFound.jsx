import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

const NotFound = () => {
  return (
    <div style={{ marginTop: 20 }}>
      <Typography variant="h5">Page not found</Typography>
      <Typography style={{ marginTop: 10 }}>
        The page you are looking for does not exist. Go back to the{' '}
        <Link to="/">front page</Link>.
      </Typography>
    </div>
  )
}

export default NotFound
