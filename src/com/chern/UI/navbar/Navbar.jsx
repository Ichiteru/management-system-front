import {AuthContext} from "../../context/AuthContext";
import {useContext, useEffect, useState} from "react";

import React from 'react';
import {Link} from "react-router-dom";

const Navbar = ({role}) => {

    const {isAuth} = useContext(AuthContext);
    const [navLinks, setNavLinks] = useState();

    useEffect(() => {
        setNavLinks(getNavLinks())
    }, [role])

    const getNavLinks = () => {
        switch (role) {
            case 'ROLE_SYSTEM_ADMIN':
                return <ul className="navbar-nav">
                    <li><Link className="nav-link" to="/users">Users</Link></li>
                    <li><Link className="nav-link" to="/companies">Companies</Link></li>
                </ul>
            case 'ROLE_MANAGER':
                return <ul className="navbar-nav">
                    <li><Link className="nav-link" to="/vacancies">Vacancies</Link></li>
                    <li><Link className="nav-link" to="/company">Company info</Link></li>
                    <li><Link className="nav-link" to="/applications">Applications</Link></li>
                </ul>
            case 'ROLE_EMPLOYEE':
                return <ul className="navbar-nav">
                    <li><Link className="nav-link" to="/vacancies">Vacancies</Link></li>
                    <li><Link className="nav-link" to="/resumes">Resumes</Link></li>
                    <li><Link className="nav-link" to="/applications">Applications</Link></li>
                </ul>
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand mx-2" href="#">Recruitment manage system</a>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                {navLinks}
                <ul className="navbar-nav navbar-collapse justify-content-end">
                    {isAuth
                        ?
                        <>
                            {
                                role !== 'ROLE_SYSTEM_ADMIN' ?
                                    <li>
                                        <Link className="nav-link" to='/profile'>Profile</Link>
                                    </li>
                                    : <></>
                            }
                            <li>
                                <Link className="nav-link" to='/logout'>Logout</Link>
                            </li>
                        </>
                        : <>
                            <li>
                                <Link className="nav-link" to='/login'>Login</Link>
                            </li>
                            <li>
                                <Link className="nav-link" to='/registration'>Sign up</Link>
                            </li>
                        </>

                    }
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;