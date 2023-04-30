import React from 'react'
import './Button.css'
function Button({ Text, onClick, className, type = 'button', alertGuide }) {
  return (
    <div className={
      className ? 'container-main-button' : ''
    }>

      <button type={type}
        className={
          className
            ? 'button-task-create'
            : alertGuide
              ? 'button-guide blinks'
              : 'button-create'
        }
        onClick={onClick} >{Text}
      </button>

    </div>
  )
}

export default Button;