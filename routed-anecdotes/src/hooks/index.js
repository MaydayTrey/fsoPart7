import { useState } from "react"


const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (e) => {
        setValue(e.target.value)

        return {
            type,
            value,
            onChange
        }
    }
}

export default useField
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