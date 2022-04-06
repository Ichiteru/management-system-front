import React, {useState} from 'react';
import './../styles/login.css';

const Login = ({setRole}) => {

    const [credentials,setCredentials] = useState({username: '', password: ''})

    return (
        <div className="container">
            <div className="card card-container">
                <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
                <p id="profile-name" className="profile-name-card"></p>
                <div className="form-signin">
                    <span id="reauth-email" className="reauth-email"></span>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address"/>
                    <input type="password" className="form-control" placeholder="Password" id="inputPassword"/>
                    <button className="btn btn-lg btn-primary btn-block btn-signin">Sign in</button>
                    <button className="btn btn-lg btn-primary btn-block btn-signup">Sign up</button>
                </div>

            </div>
        </div>
    )
};

export default Login;