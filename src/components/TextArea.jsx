import React from 'react'

const TextArea = ({ setState, value, name, placeholder }) => {
  return (
    <textarea value={value} name={name} id={name} placeholder={placeholder} onChange={(e) => {
      setState(e.target.value)
    }}></textarea>
  )
}

export default TextArea