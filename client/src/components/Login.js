import React, { useState, useContext } from 'react'
import {CredentialsContext} from '../App'
import {useHistory} from 'react-router-dom'



export const handleErrors=async (response)=>{
    if(!response.ok){
        const {message}=await response.json();
        console.log("message",message);
 
        throw Error(message);
    }
    return response.json();
 };
 


const Login=()=>{

    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [isError,setisError]=useState(false);
    const [,setCredentials]=useContext(CredentialsContext);
     
    const history=useHistory();

    const login=(e)=>{
        e.preventDefault();
        fetch('http://localhost:4000/login',{
            method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username,
            password
        })
        }).then(handleErrors)
        .then(()=>{
            setCredentials({
                username,
                password
            });
            history.push("/");
        }).catch((response)=>{
            setisError(true);

            
        })

     
    }

    return(
        <div className="login">
            <h1>Login</h1>
            {isError&&"Invalid credentials"}
            <form onSubmit={login}>
        <input onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="username"></input><br></br>
        <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password"></input>
        <br></br>
        <button type="submit">Login</button>
        </form>
        </div>
    )
}
export default Login