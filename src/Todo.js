import React, {useState, useRef} from 'react'

const Todo = () => {
    const [toDoList, setToDoList] = useState([{
      'id' : 1,
      'todo' : "과제하기",
      'isCompleted' : false,
      'userId' : 1
    }])
    const inputRef = useRef('')
    const token = localStorage.getItem('jwt');

  
    const createToDo = async () => {
        const response = await fetch('https://www.pre-onboarding-selection-task.shop/todos',{
            method: 'POST',
            headers: 
              {'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'},
            body:
              JSON.stringify({todo: inputRef.current.value}),
        });

          if (!response.ok) {            
            const responseBody = await response.text();
            console.error('목록 추가 실패:', responseBody);
            throw new Error(`실패 상태: ${response.status}`);            
          }
          
        
          const newToDo = await response.json();
          console.log('newToDo:', newToDo);          
          setToDoList([...toDoList, newToDo])
        }
    
    

    // const getToDos = async () => {
    //     // Make a GET request to the /todos endpoint
    //     fetch('https://www.pre-onboarding-selection-task.shop/todos', {
    //         method: 'GET',
    //         headers: JSON.stringify({Authorization: token}),
    //     })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error(`Request failed with status: ${response.status}`);
    //       }
    //       return response.json();
    //     })
    //     .then((data) => {
    //       // Handle the response data
    //         const parsedData = JSON.parse(data);
    //         const newToDoList = parsedData.body;
    //       //console.log('to-dos:', data.body);
        
    //       toDoList = JSON.parse(data).body
    //       setToDoList(newToDoList);
    //     })

        
    //       // Update the to-do list or perform other actions as needed
    //       // For example, you can update the to-do list state here:
    //     .catch((error) => {
    //       console.error('Error:', error);
    //     });
    // }


    const updatTodo = () => {

    }

    return (
        <>
            <input data-testid="new-todo-input" ref = {inputRef}/>
            <button data-testid="new-todo-add-button" onClick = {createToDo}>추가</button>
            {/* {getToDos} */}
            <ul>
                {toDoList.map((info) => (
                <li key={info.id}>
                    <label>
                        <input type="checkbox" />
                        <span>{info.todo}</span>
                    </label>
                </li>
                ))}
            </ul>
        </>
    )}

export default Todo