import React, {useState} from 'react';
import './../styles/common.css';
// import './../styles/registration.css';
import {useNavigate} from "react-router-dom";
import RegistrationService from "../service/RegistrationService";

const Registration = () => {

    const route = useNavigate();
    const [info, setInfo] = useState({username: '', password: '', email: '', name: '', surname: ''});
    const [fieldError, setFieldError] = useState("");
    const [repeatPassword, setRepeatPassword] = useState('');

    function registration(e) {
        e.preventDefault();
        if (checkForPasswordCoincidence(info.password, repeatPassword)){
            setFieldError("");
            RegistrationService.register(info).then(resp => {
                route("/login")
            }).catch(err => {
                console.log(err.response.data)
                let errorData = err.response.data;
                bindErrorFields(errorData);
            })
        } else {
            setFieldError({...fieldError, fieldRepeatPassword : "Passwords not match"});
        }
    }

    function bindErrorFields(errorResponseData){
        setFieldError(errorResponseData)
    }

    function checkForPasswordCoincidence(password, repeatPassword){
        return  password == repeatPassword
    }

    return (
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-50">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="text-uppercase text-center mb-1">Создание аккаунта</h2>
                                    <form>
                                        <div className="form-outline mb-1">
                                            <label className="form-label" htmlFor="form3Example1cg">Имя</label>
                                            <input type="text" id="form3Example1cg"
                                                   onChange={(e) => {setInfo({...info, name: e.target.value})}}
                                                   className="form-control form-control-sm"
                                                    style={fieldError.name ? {borderColor : "red"} : {borderColor: "gray"}}
                                            />
                                            <small className="invalid-field-input"> {fieldError.name}</small>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form3Example7cg">Фамилия</label>
                                            <input  id="form3Example7cg"
                                                    onChange={(e) => {setInfo({...info, surname: e.target.value})}}
                                                   className="form-control form-control-sm"
                                                    style={fieldError.surname ? {borderColor : "red"} : {borderColor: "gray"}}
                                            />
                                            <small className="invalid-field-input"> {fieldError.surname}</small>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form3Example8cg">Имя пользователя</label>
                                            <input  id="form3Example8cg"
                                                   onChange={(e) => {setInfo({...info, username: e.target.value})}}
                                                   className="form-control form-control-sm"
                                                    style={fieldError.username ? {borderColor : "red"} : {borderColor: "gray"}}
                                            />
                                            <small className="invalid-field-input"> {fieldError.username}</small>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form3Example3cg">Почта</label>
                                            <input type="email" id="form3Example3cg"
                                                   onChange={(e) => {setInfo({...info, email: e.target.value})}}
                                                   className="form-control form-control-sm"
                                                   style={fieldError.email ? {borderColor : "red"} : {borderColor: "gray"}}
                                            />
                                            <small className="invalid-field-input"> {fieldError.email}</small>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form3Example4cg">Пароль</label>
                                            <input type="password" id="form3Example4cg"
                                                   onChange={(e) => {setInfo({...info, password: e.target.value})}}
                                                   className="form-control form-control-sm"
                                                   style={fieldError.password ? {borderColor : "red"} : {borderColor: "gray"}}
                                            />
                                            <small className="invalid-field-input"> {fieldError.password}</small>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form3Example4cdg">Повторение пароля</label>
                                            <input type="password" id="form3Example4cdg"
                                                   onChange={(e) => { setRepeatPassword(e.target.value)}}
                                                   className="form-control form-control-sm"
                                                   style={fieldError.fieldRepeatPassword ? {borderColor : "red"} : {borderColor: "gray"}}
                                            />
                                            <small className="invalid-field-input"> {fieldError.fieldRepeatPassword}</small>
                                        </div>

                                        <div className="d-flex justify-content-center">
                                            <button type="button"
                                                    className="btn btn-lg btn-primary btn-signup w-50 h-300"
                                                    onClick={registration}
                                            >Зарегестрироваться
                                            </button>
                                        </div>

                                        <p className="text-center text-muted">Уже есть аккаунт? <a
                                            href="#!" className="fw-bold text-body"><u onClick={()=>{route('/login')}}>Войдите тут</u></a></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default Registration;