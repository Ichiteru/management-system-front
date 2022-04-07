import React, {useContext, useState} from 'react';
import './../styles/login.css';
import AuthenticationService from "../service/AuthenticationService";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import getDefaultRoleRoute from "../router/routes";

const Login = ({setRole}) => {

    const [credentials, setCredentials] = useState({username: '', password: ''})
    const [error, setError] = useState(false)
    const {setIsAuth} = useContext(AuthContext)
    const route = useNavigate();

    function login(e) {
        e.preventDefault();
        AuthenticationService.tryToLogin(credentials.username, credentials.password)
            .then(resp => {
                console.log(resp)
                setError(false)
                setRole(resp.data)
                setIsAuth(true)
                AuthenticationService.saveRoleLoggedUserToSessionStorage(resp.data)
                AuthenticationService.saveBasicAuthTokenToSessionStorage();
                route(getDefaultRoleRoute(resp.data))
            }).catch(err => {
            console.log(err)
            setError("Invalid email or password");
        })
    }

    return (
        <div className="container">
            <div className="card card-container">
                <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
                <p id="profile-name" className="profile-name-card"></p>
                {
                    error && <div className="alert alert-danger" role="alert">{error}</div>
                }
                <div className="form-signin">
                    <span id="reauth-email" className="reauth-email"></span>
                    <input
                        value={credentials.username}
                        onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                        type="email" id="inputEmail" className="form-control" placeholder="Email address"/>
                    <input
                        value={credentials.password}
                        onChange={(event => setCredentials({...credentials, password: event.target.value}))}
                        type="password" className="form-control" placeholder="Password" id="inputPassword"/>
                    <button onClick={login} className="btn btn-lg btn-primary btn-block btn-signin">Sign in</button>
                    <button className="btn btn-lg btn-primary btn-block btn-signup">Sign up</button>
                </div>

            </div>
        </div>
    )
};

export default Login;