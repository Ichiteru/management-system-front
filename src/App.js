import {BrowserRouter} from "react-router-dom";
import Navbar from "./com/chern/UI/navbar/Navbar";
import AppRouter from "./com/chern/router/AppRouter";
import {AuthContext} from "./com/chern/context/AuthContext";
import {useState} from "react";

function App() {

    const [isAuth, setIsAuth] = useState(false)
    const [role, setRole] = useState('')

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
