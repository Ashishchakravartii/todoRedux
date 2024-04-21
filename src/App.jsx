import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeTodo, updateTodo } from './features/todo/todoSlice';

const App = () => {
  const [input, setInput] = useState("")
  const [updationId, setUpdationId] = useState(null)
  const dispatch = useDispatch()

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(input))
    setInput("")
  };

  const todos = useSelector(state=>state.todos)

  const updateHandler= (id)=>{
      const todoToUpdate = todos.find((todo) => todo.id === id);
     
      if(todoToUpdate){
        setUpdationId(todoToUpdate.id);
        setInput(todoToUpdate.text);
      
     }


  }

  const updateState= (e)=>{
   e.preventDefault();
   dispatch(updateTodo({updationId,text:input}))
   setInput("")
  }


  return (
    <div>
      <h1>Todo</h1>
      <form onSubmit={addTodoHandler}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
        />
        <button type="submit">Create</button>
        <button onClick={updateState}>Update</button>
      </form>

      <hr />

      <h3>Your Todos</h3>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {" "}
            {todo.text}{" "}
            <button onClick={() => dispatch(removeTodo(todo.id))}> x</button>{" "}
            <button onClick={() => updateHandler(todo.id)}>Update</button>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App