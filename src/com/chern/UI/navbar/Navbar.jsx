import {AuthContext} from "../../context/AuthContext";
import {useContext, useEffect, useState} from "react";

import React from 'react';
import {Link} from "react-router-dom";

const Navbar = ({role, isAuth}) => {


    const [navLinks, setNavLinks] = useState();

    useEffect(() => {
        setNavLinks(getNavLinks())
    }, [role, isAuth])

    const getNavLinks = () => {
        switch (role) {
            case 'ROLE_SYSTEM_ADMIN':
                return <ul className="navbar-nav">
                    <li><Link className="nav-link" to="/users">Пользователи</Link></li>
                    <li><Link className="nav-link" to="/companies">Компании</Link></li>
                </ul>
            case 'ROLE_MANAGER':
                return <ul className="navbar-nav">
                    <li><Link className="nav-link" to="/vacancies">Вакансии</Link></li>
                    <li><Link className="nav-link" to="/chart">Стасистика</Link></li>
                    <li><Link className="nav-link" to="/applications">Заявки</Link></li>
                </ul>
            case 'ROLE_EMPLOYEE':
                return <ul className="navbar-nav">
                    <li><Link className="nav-link" to="/vacancies">Вакансии</Link></li>
                    <li><Link className="nav-link" to="/resumes">Резюме</Link></li>
                    <li><Link className="nav-link" to="/applications">Заявки</Link></li>
                </ul>
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand mx-2" href="#">Система найма работников</a>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                {navLinks}
                <ul className="navbar-nav navbar-collapse justify-content-end">
                    {isAuth
                        ?
                        <>
                            {
                                role !== 'ROLE_SYSTEM_ADMIN' ?
                                    <li>
                                        <Link className="nav-link" to='/profile'>Личный кабинет</Link>
                                    </li>
                                    : <></>
                            }
                            <li>
                                <Link className="nav-link" to='/logout'>Выйти</Link>
                            </li>
                        </>
                        : <>
                            <li>
                                <Link className="nav-link" to='/login'>Войти</Link>
                            </li>
                            <li>
                                <Link className="nav-link" to='/registration'>Зарегестрироваться</Link>
                            </li>
                        </>

                    }
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;