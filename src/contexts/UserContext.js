import React, {useState} from 'react';

const Context = React.createContext({});

export function UserContextProvider({children}){
    const token = window.sessionStorage.getItem('token');

    const [jwt, setJWT] = useState(() => token)

    return <Context.Provider value={ { jwt, setJWT } }>
        {children}
    </Context.Provider>
}
export default Context;