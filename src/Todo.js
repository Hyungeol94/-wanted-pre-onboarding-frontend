import React, {useState, useRef, useEffect} from 'react'

const Todo = () => {
    const [toDoList, setToDoList] = useState([])
    const inputRef = useRef('')
    const [ModifyTargetToDoID, setModifyTargetToDoID] = useState('')
    const token = localStorage.getItem('jwt');
    const toDoRef = useRef('')

    // Fetch and update the to-do list when the component mounts
    useEffect(() => {
      if (token) {
        getToDos();
      }
    }, [token]);
  
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

    const getToDos = async () => {
      //console.log('getToDos called ')
      // Make a GET request to the /todos endpoint
      const response = await fetch('https://www.pre-onboarding-selection-task.shop/todos', {
          method: 'GET',
          headers:  
            {'Authorization': `Bearer ${token}`},
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setToDoList(data)
      })
                
        // Update the to-do list or perform other actions as needed
        // For example, you can update the to-do list state here:
        .catch((error) => {
          console.error('Error:', error);
        });
    }
      
    const handleCheckBoxClick = async (info) => {
    const response = await fetch(`https://www.pre-onboarding-selection-task.shop/todos/${info.id}`, {
        method: 'PUT',
        headers:  
          {'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'},        
        body:        
          JSON.stringify({todo: info.todo,
          isCompleted: !info.isCompleted
          }),
    })

    
      if (!response.ok) {            
        const responseBody = await response.text();
        console.error('수정 실패:', responseBody);
        throw new Error(`실패 상태: ${response.status}`);            
      }
    
      const newToDo = await response.json();
      console.log('newToDo:', newToDo);      
      const updatedToDoList = toDoList.map((item) =>
      item.id === newToDo.id ? { ...item, isCompleted: !item.isCompleted } : item
      );
      
      setToDoList(updatedToDoList);
    }


    const deleteToDo = async (info) => {
      const response = await fetch(`https://www.pre-onboarding-selection-task.shop/todos/${info.id}`, {
          method: 'DELETE',
          headers:  
            {'Authorization': `Bearer ${token}`,
            },
      })
  
        if (!response.ok) {            
          const responseBody = await response.text();
          console.error('삭제 실패:', responseBody);
          throw new Error(`실패 상태: ${response.status}`);            
        }
       
        const updatedToDoList = toDoList.filter(todo => todo.id !== info.id);
  
      setToDoList(updatedToDoList);
      }

    const activateModifyToDo = (todo) => {
      setModifyTargetToDoID(todo.id)
    }

    const deactivateModifyToDo = () => {
      setModifyTargetToDoID('');
    }

    const modifyToDo = async (info) => {
      const response = await fetch(`https://www.pre-onboarding-selection-task.shop/todos/${info.id}`, {
        method: 'PUT',
        headers:  
          {'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'},        
        body:        
          JSON.stringify({todo: toDoRef.current.value,
            isCompleted: info.isCompleted
          }),
    })

    
      if (!response.ok) {            
        const responseBody = await response.text();
        console.error('수정 실패:', responseBody);
        throw new Error(`실패 상태: ${response.status}`);            
      }
    
      const newToDo = await response.json();
      console.log('newToDo:', newToDo);      
      const updatedToDoList = toDoList.map((item) =>
      item.id === newToDo.id ? { ...item, todo: toDoRef.current.value } : item
      );
      
    deactivateModifyToDo();
    setToDoList(updatedToDoList);
    }


    return (
        <>
            <input data-testid="new-todo-input" ref = {inputRef}/>
            <button data-testid="new-todo-add-button" onClick = {createToDo}>추가</button>
            <ul>
            {toDoList.map((todo) => (
              <li key={todo.id}>
                {todo.id === ModifyTargetToDoID ? (
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onClick={() => handleCheckBoxClick(todo)}
                    />
                    <input ref = {toDoRef} defaultValue={todo.todo} />
                    <button onClick = {()=> modifyToDo(todo)}>제출</button>
                    <button onClick = {()=> deactivateModifyToDo()} >취소</button>
                  </label>
                ) : (
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onClick={() => handleCheckBoxClick(todo)}
                    />
                    <span>{todo.todo}</span>
                    <button data-testid="modify-button" onClick={() => activateModifyToDo(todo)}>
                      수정
                    </button>
                    <button data-testid="delete-button" onClick={() => deleteToDo(todo)}>
                      삭제
                    </button>
                  </label>
                )}
              </li>
            ))}
          </ul>
        </>
    )}

export default Todo