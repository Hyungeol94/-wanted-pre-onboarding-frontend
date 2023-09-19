import React, {useState, useRef} from 'react'

const Todo = () => {
    const [toDoList, setToDoList] = useState(['TODO 1', 'TODO 2'])
    const inputRef = useRef('')

    const addToDo = (e) => {
        setToDoList([...toDoList, inputRef.current.value])
    }

    return (
        <>
            <input data-testid="new-todo-input" ref = {inputRef}/>
            <button data-testid="new-todo-add-button" onClick = {addToDo}>추가</button>
            {toDoList.map((todo) => (
               <li>
               <label>
                   <input type="checkbox" />
                   <span>{todo}</span>
               </label>
           </li> 
            ))}
        </>
    )}

export default Todo