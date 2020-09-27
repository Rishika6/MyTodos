import React, { useState } from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Welcome from './components/Welcome'
import Register from './components/Register'
import Login from './components/Login'

//react context
export const CredentialsContext=React.createContext(null);

const App=()=>{


    const credentialState=useState(null);

    return(
        <div className="App">
          <CredentialsContext.Provider value={credentialState}>
          <BrowserRouter>
            <Switch>
                <Route exact path="/"><Welcome/></Route>
                <Route exact path="/register"><Register/></Route>
                 <Route exact path="/login"><Login/></Route>
            </Switch>
          </BrowserRouter>   
          </CredentialsContext.Provider>
          </div>    
    )
}

export default App;