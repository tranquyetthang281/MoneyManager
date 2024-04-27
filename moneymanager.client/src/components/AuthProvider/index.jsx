import { createContext, useState } from "react";

const getAuthStorage = () => {


    const tokenString = localStorage.getItem('access_token');

    if (checkIfTimeExpired(tokenString)) {
        return null
    }

    const accessToken = JSON.parse(tokenString);
    const idString = localStorage.getItem('userId')
    const userId = JSON.parse(idString);

    return accessToken && userId ? { accessToken, userId } : null
};

const saveAuthStorage = auth => {
    localStorage.setItem('access_token', JSON.stringify(auth.accessToken));
    localStorage.setItem('userId', JSON.stringify(auth.userId));
};

const deleteAuthStore = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('userId')
}

const checkIfTimeExpired = (token) => {
    if (token) {
        const decode = JSON.parse(atob(token.split('.')[1]));
        if (decode.exp * 1000 < new Date().getTime()) {
            localStorage.clear()
            return true
        }
    }
    return false
};

export const AuthContext = createContext({})

function AuthProvider({ children }) {

    const [auth, setAuth] = useState(getAuthStorage())
    
    const saveAuth = (auth) => {
        setAuth(auth)
        saveAuthStorage(auth)
    }

    const logOut = () => {
        deleteAuthStore()
        setAuth(null)
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth: saveAuth, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;