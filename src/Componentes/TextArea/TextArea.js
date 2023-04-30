import React from 'react'
import './TextArea.css';

function TextArea({ name,
  requiredTextarea,
  placeholderTextarea,
  value,
  abovetext,
  onChange
}) {
  return (
    <div>
      <div className='foot-text-area'>
        {abovetext}
      </div>

      <textarea
        name={name}
        required={requiredTextarea}
        placeholder={placeholderTextarea}
        value={value}
        onChange={onChange}
        className='inside-input-textarea' /> </div>
  )
}

export default TextArea