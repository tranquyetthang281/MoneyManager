import { createContext, useState } from "react";

const getAuthStorage = () => {
    const tokenString = localStorage.getItem('access_token');
    const accessToken = JSON.parse(tokenString);
    const idString = localStorage.getItem('userId')
    const userId = JSON.parse(idString);
    return accessToken && userId ? { accessToken, userId } : null
};

const saveAuthStorage = auth => {
    localStorage.setItem('access_token', JSON.stringify(auth.accessToken));
    localStorage.setItem('userId', JSON.stringify(auth.userId));
};

export const AuthContext = createContext({})

function AuthProvider({ children }) {

    const [auth, setAuth] = useState(getAuthStorage())
    const saveAuth = (auth) => {
        setAuth(auth)
        saveAuthStorage(auth)
    }

    return (  
        <AuthContext.Provider value={{auth, setAuth: saveAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;