import React, { useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {CredentialsContext} from '../App'


export const handleErrors=async (response)=>{
   if(!response.ok){
       const {message}=await response.json();
       console.log("message",message);

       throw Error(message);
   }
   return response.json();
};


const Register=()=>{
  

  //states
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const [,setCredentials]=useContext(CredentialsContext);
    //console.log({username});
    //console.log({password});
     const history=useHistory();
    const register=(e)=>{
        e.preventDefault();
        fetch('http://localhost:4000/register',{
            method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username,
            password
        })
        }).then(handleErrors)
        .then((response)=>{
            setCredentials({
                username,
                password
            });
            setError(response.message);
            history.push("/");
        }).catch((response)=>{
            setError(response.message);
            })
    }
   // console.log(register.message);

    return(
        <div className="register">
        <div><h1>Register</h1></div>
         {error}
        <form onSubmit={register}>
        <input onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="username"></input><br></br>
        <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password"></input>
        <br></br>
        <button type="submit">Register</button>
        </form>
        </div>
        
    )
}

export default Register