import React from 'react'
import './Input.css'

function Input({ name,
  placeholder,
  value,
  className,
  aboveInput,
  onChange,
  type,
  required,
  handleAlertCreateTask,
  style }) {
  return (
    <div >
      <div className={className && 'foot-input'}>{aboveInput}</div>
      <div>
        <input
          className={className ? 'inside-input' : 'input-create'}
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          value={!style ? value : 'Press button create'}
          onChange={onChange}
          onClick={handleAlertCreateTask}
          style={
            style
              ? { background: 'rgb(255 0 15 / 45%)', color: 'white' }
              : { background: 'white' }
          }
        />
      </div>
    </div>
  )
}

export default Input