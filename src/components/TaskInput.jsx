import React, { useState } from 'react'

const TaskInput = ({addTask}) => {
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (event) =>{
        setInputValue(event.target.value)
    }

    const handleClick = () => {
        if(inputValue.trim() != ''){
            addTask(inputValue)
            setInputValue('')

        }


    }

  return (
    <div className="flex p-2">
        <input 
        className="focus:ring-0 focus:outline-none focus:ring-offset-0 mr-2"  
        type="text"
        value={inputValue}
        placeholder='Новая задача'
        onChange={handleInputChange}
        
        />
        <button onClick={handleClick} className=''> Добавить</button>

    </div>    
  )
}

export default TaskInput