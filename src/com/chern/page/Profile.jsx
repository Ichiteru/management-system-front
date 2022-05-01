import React, {useContext, useEffect, useState} from 'react';
import {useFetching} from "../hook/useFetching";
import CompanyService from "../service/CompanyService";
import UserService from "../service/UserService";
import {useNavigate} from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";
import {AuthContext} from "../context/AuthContext";

const Profile = () => {

    const [profile, setProfile] = useState({});
    const [change, setChange] = useState(0)
    const [pageError, setPageError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errors, setErrors] = useState([])
    const {setIsAuth} = useContext(AuthContext)
    const route = useNavigate();
    const [fetchProfile, isLoading, error] = useFetching(async () => {
        let response = await UserService.getProfile();
        setProfile(response.data);
    })

    useEffect(() => {
        fetchProfile()
    }, [change])

    function updateProfile(e) {
        e.preventDefault()
        const toUpdate = {
            id: profile.id,
            name: profile.name,
            surname: profile.surname,
            username: profile.username,
            birthday: profile.birthday
        }
        UserService.updateProfile(profile).then(resp => {
            setChange(Math.random)
            setSuccess('Профиль успешно обновлен')
            setPageError(false)
            setIsAuth(false)
            sessionStorage.clear()
            window.location.reload(false);
            route('/login')
        }).catch(err => {
            setPageError('Ошибка при обновлении профиля')
            setSuccess(false)
            setErrors(err.response.data)
        })
    }

    return (
        <div className="container rounded bg-white mt-5 mb-5 w-50">
            <div className="row m-lg-5">
                {/*<div className="col-md-3 border-right">*/}
                {/*    /!*<div className="d-flex flex-column align-items-center text-center p-3 py-5"><img*!/*/}
                {/*    /!*    className="rounded-circle mt-5" width="150px"*!/*/}
                {/*    /!*    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/><span*!/*/}
                {/*    /!*    className="font-weight-bold">Edogaru</span><span*!/*/}
                {/*    /!*    className="text-black-50">edogaru@mail.com.my</span><span> </span></div>*!/*/}
                {/*</div>*/}
                {/*<div className="col-md-5 border-right">*/}
                <div className="p-3 py-5">
                    {
                        success != false && <div className='alert alert-success'>{success}</div>
                    }
                    {
                        pageError != false && <div className='alert alert-danger'>{pageError}</div>
                    }
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="text-right">Личный кабинет</h4>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-6">
                            <label className="labels">Имя</label>
                            <input type="text" className="form-control" placeholder="Имя" value={profile.name}
                                   onChange={(e) => {
                                       setProfile({...profile, name: e.target.value})
                                   }}
                                   style={errors.name ? {borderColor: "red"} : {borderColor: "gray"}}
                            />
                            <small className="invalid-field-input">{errors.name}</small>
                        </div>
                        <div className="col-md-6">
                            <label className="labels">Фамилия</label>
                            <input type="text" className="form-control" value={profile.surname} placeholder="Фамилия"
                                   onChange={(e) => {
                                       setProfile({...profile, surname: e.target.value})
                                   }}
                                   style={errors.surname ? {borderColor: "red"} : {borderColor: "gray"}}
                            />
                            <small className="invalid-field-input">{errors.surname}</small>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12 mb-2">
                            <label className="labels">Дата рождения</label>
                            <input type="date" className="form-control" placeholder="enter phone number"
                                   value={profile.birthday}
                                   onChange={(e) => {
                                       setProfile({...profile, birthday: e.target.value})
                                   }}
                                   style={errors.birthday ? {borderColor: "red"} : {borderColor: "gray"}}
                            />
                            <small className="invalid-field-input">{errors.birthday}</small>
                        </div>
                        <div className="col-md-12 mb-2">
                            <label className="labels">Имя пользователя</label>
                            <input type="text" className="form-control" placeholder="Введите имя пользователя"
                                   onChange={(e) => {
                                       setProfile({...profile, username: e.target.value})
                                   }}
                                   value={profile.username}
                                   style={errors.username ? {borderColor: "red"} : {borderColor: "gray"}}/>
                            <small className="invalid-field-input">{errors.username}</small>
                        </div>
                        <div className="col-md-12 mb-2">
                            <label className="labels">Почта</label>
                            <input disabled={true} type="text" className="form-control"
                                   placeholder="Введите почтовый адрес" value={profile.email}/>
                        </div>
                        <div className="col-md-12 mb-2">
                            <label className="labels">Компания</label>
                            <input disabled={true} type="text" className="form-control"
                                   value={profile.companyName ? profile.companyName : '-'}/>
                        </div>
                        <div className="col-md-12 mb-2">
                            <label className="labels">Статус</label>
                            <input disabled={true} type="text" className="form-control" value={profile.status}/>
                        </div>
                        <div className="col-md-12 mb-2">
                            <label className="labels">Роль</label>
                            <input disabled={true} type="text" className="form-control" value={profile.role}/>
                        </div>

                    </div>
                    <div className="mt-5 text-center">
                        <button className="btn btn-primary profile-button" type="button"
                                onClick={(e) => {
                                    updateProfile(e)
                                }}
                        >Сохранить
                        </button>
                    </div>
                </div>
                {/*</div>*/}
                {/*<div className="col-md-4">*/}
                {/*    <div className="p-3 py-5">*/}
                {/*        /!*<div className="d-flex justify-content-between align-items-center experience">*!/*/}
                {/*        /!*    <span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i*!/*/}
                {/*        /!*    className="fa fa-plus"></i>&nbsp;Experience</span></div>*!/*/}
                {/*        /!*<br/>*!/*/}
                {/*        /!*<div className="col-md-12"><label className="labels">Experience in Designing</label><input*!/*/}
                {/*        /!*    type="text" className="form-control" placeholder="experience" value=""/></div>*!/*/}
                {/*        /!*<br/>*!/*/}
                {/*        /!*<div className="col-md-12"><label className="labels">Additional Details</label>*!/*/}
                {/*        /!*    <input type="text" className="form-control" placeholder="additional details" value=""/>*!/*/}
                {/*        /!*</div>*!/*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Profile;