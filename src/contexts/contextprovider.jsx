import { createContext, useContext } from "react";
import { useState } from "react";

const stateContext = createContext({
    user:null,
    token:null,
    notificatiion:null,
    setUser:()=>{},
    setToken:()=>{},
    setNotification:()=>{},
}
    
);
export const ContextProvider= ({children})=>{
    const [user,setUser]= useState({
        name:'catelle'
    });

    const [notification,_setNotification]=useState('')
    const [token,_setToken]= useState(null);

    const setNotification= (message)=>{

        _setNotification(message);
        setTimeout(()=>{

            _setNotification('')

        },5000)
    }


const setToken= (token)=>{
    _setToken(token)
    if(token){
        localStorage.setItem('ACCESS_TOKEN',token);
    }else{
        localStorage.removeItem('ACCESS_TOKEN');
    }
}
return(
    <stateContext.Provider value={{

        user,
        token,
        setUser,
        setToken,
        notification,
        setNotification
    }}>
        {children}
    </stateContext.Provider>
)
}

export const useStateContext= ()=> useContext(stateContext);