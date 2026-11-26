import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(data => setAnecdotes(data))
  }, [])

  const addAnecdote = async (anecdoteObject) => {
    const saved = await anecdoteService.createNew(anecdoteObject)
    setAnecdotes(anecdotes.concat(saved))
  }

  const deleteAnecdote = async (id) => {
    await anecdoteService.remove(id)
    setAnecdotes(anecdotes.filter(n => n.id !== id))
  }

  return { anecdotes, addAnecdote, deleteAnecdote }
}


/*

Write the useField custom hook from the material 
above in the file src/hooks/index.js. 
The hook should manage the state of a single form input field 
and return an object with the following properties: 
type, value, and onChange.


Referencing the code in FSO:

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

*/