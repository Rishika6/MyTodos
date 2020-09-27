import React, { useState, useContext, useEffect } from 'react'
import {CredentialsContext} from '../App'

const Todos=()=>{
    const [todos,setTodos]=useState([]);
    const [todoText,setTodoText]=useState('');
    const [credentials]=useContext(CredentialsContext);

    const persist=(newTodos)=>{
        //e.preventDefault();
        fetch('http://localhost:4000/todos',{
            method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Basic ${credentials.username}:${credentials.password}`
        },
        body:JSON.stringify(newTodos),
        }).then(()=>{});
 }

    useEffect(()=>{
        fetch('http://localhost:4000/todos',{
            method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Basic ${credentials.username}:${credentials.password}`
        },
       // body:JSON.stringify(newTodos),
        }).then((response)=>response.json()).then((todos)=>setTodos(todos));
    },[]);
   
    const addTodo=(e)=>{
       e.preventDefault();
       if(!todoText)
       return;
       const newTodo={checked:false,text:todoText}
       const newTodos=[...todos,newTodo];
       setTodos(newTodos);
       setTodoText("");
       persist(newTodos);
      
       
    }
     
    const toggleTodos=(index)=>{
         const newTodoList=[...todos];
         newTodoList[index].checked=!newTodoList[index].checked;
         setTodos(newTodoList);
         persist(newTodoList)
    }
    return(
        <div>
             {todos.map((todo,index)=>(
                 <div key={index}>
            <input checked={todo.checked} 
            onChange={()=>toggleTodos(index)} type="checkbox"/>
             <label>{todo.text}</label>
            </div>
             ))}
            
            <br/>
            <form onSubmit={addTodo}>
            <input type="text" onChange={(e)=>setTodoText(e.target.value)}></input>
            <button type="submit">Add</button>
            </form>
        </div>
    )
}
export default Todos;