import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {CredentialsContext} from '../App'
import Todos from './Todos'
import '../css/welcome.css'
const Welcome=()=>{

    const [credentials,setCredentials]=useContext(CredentialsContext);
    const Logout=()=>{
        setCredentials(null);
    }
     return(
         <div className="mainwelcome">
         <div className="welcome">
             {credentials&&<button onClick={Logout}>Logout</button>}
         <div>Welcome {credentials && credentials.username}</div>
         {!credentials&&<Link to="./register">REGISTER</Link>}
         <br></br>
         {!credentials&&<Link to="./login">LOGIN</Link>}
         {credentials&&<Todos/>}
         </div>
         </div>
     )
}
export default Welcome