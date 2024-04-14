import { useState } from 'react';

export default function useAuth() {
    const getAuth = () => {
        const tokenString = localStorage.getItem('access_token');
        const accessToken = JSON.parse(tokenString);
        const idString = localStorage.getItem('userId')
        const userId = JSON.parse(idString);
        return accessToken && userId ? { accessToken, userId } : null
    };

    const [auth, setAuth] = useState(getAuth());

    const saveAuth = authInfo => {
        localStorage.setItem('access_token', JSON.stringify(authInfo.accessToken));
        localStorage.setItem('userId', JSON.stringify(authInfo.userId));
        setAuth(authInfo);
    };

    return {
        auth,
        setAuth: saveAuth
    }
}