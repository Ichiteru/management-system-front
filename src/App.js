import {BrowserRouter} from "react-router-dom";
import Navbar from "./com/chern/UI/navbar/Navbar";
import AppRouter from "./com/chern/router/AppRouter";
import {AuthContext} from "./com/chern/context/AuthContext";
import {useEffect, useState} from "react";
import {LOGGED_USER_ROLE_KEY, TOKEN_KEY} from "./com/chern/service/AuthenticationService";

function App() {

    const [isAuth, setIsAuth] = useState(false)
    const [role, setRole] = useState(sessionStorage.getItem(LOGGED_USER_ROLE_KEY) ? sessionStorage.getItem(LOGGED_USER_ROLE_KEY) : '')

    useEffect(() => {
        if(sessionStorage.getItem(TOKEN_KEY)) {
            setIsAuth(true)
        }
    }, [])

    return (
        <AuthContext.Provider value={
            {isAuth, setIsAuth}}>
            <BrowserRouter>
                <Navbar role={role}/>
                <AppRouter setRole={setRole}/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
