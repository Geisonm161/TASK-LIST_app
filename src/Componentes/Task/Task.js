import React from 'react'
import './Task.css';

function Task({
  title,
  desc,
  onClick,
  accessClass,
  id,
  access
}) {

  return (
    <div className={'container-main-task'}>

      <div className={
        accessClass
          ? 'task-create-task'
          : 'container-task'
      } onClick={onClick}>

        <div className='information-task'>

          <div className='title-task'>
            {
              access
              && <h4 style={{
                display: 'inline-block',
                color: 'black'
              }}>Title:</h4>
            }
            {title}
          </div>

          <div className='description-task'>
            {
              access
              && <h4 style={{
                display: 'inline-block',
                color: 'black'
              }}>Description:</h4>
            }
            {desc}
          </div>

          <div className='description-task'>
            {
              access
              && <h4 style={{
                display: 'inline-block',
                color: 'black'
              }}>Id:</h4>
            }
            {id}
          </div>

        </div>

      </div>

      <hr />

    </div>

  )
}

export default Task