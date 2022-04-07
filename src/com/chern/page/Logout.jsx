import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {LOGGED_USER_ROLE_KEY} from "../service/AuthenticationService";
import {AuthContext} from "../context/AuthContext";

const Logout = ({setRole}) => {

    const {setIsAuth} = useContext(AuthContext);
    const routing = useNavigate()

    function logout() {
        sessionStorage.clear()
        setIsAuth(false)
        setRole('')
        routing("/login")
    }

    return (
        <div className="container">
            <div className="card card-container">
                    <div id="card-body">
                        <div className="card-img">
                            <h1 className='text-center'>Are you sure you want to exit?</h1>
                            <img style={{width: 300}}
                                 src="https://static.vecteezy.com/system/resources/previews/004/637/632/original/logout-icon-vector.jpg"
                                 alt="User Icon"/>
                        </div>
                            <div className="row justify-content-center mb-2">
                                <button type="button" onClick={logout} className="btn btn-primary">Log out</button>
                            </div>
                    </div>
            </div>
        </div>
    );
};

export default Logout;