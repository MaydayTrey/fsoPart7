// The only file in the app that touches the browser's storage.
// Everything else goes through these three functions.
const KEY = 'loggedUser'

const getUser = () => {
  const json = window.localStorage.getItem(KEY)
  return json ? JSON.parse(json) : null
}

const saveUser = (user) => {
  window.localStorage.setItem(KEY, JSON.stringify(user))
}

const removeUser = () => {
  window.localStorage.removeItem(KEY)
}

export default { getUser, saveUser, removeUser }
