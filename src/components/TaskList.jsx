import React, { Children } from 'react'

const TaskList = ({children}) => {
  return (
    <ul className='pl-10'>
        {children}
    </ul>
    
)
}

export default TaskList