import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import {Navigate, Route, Routes} from "react-router-dom";
import Logout from "../page/Logout";
import Login from "../page/Login";
import {privateRoutes} from "./routes";
import Registration from "../page/Registration";

const AppRouter = ({setRole}) => {

    const {isAuth} = useContext(AuthContext);

    // if (isLoading){
    //     return null;
    // }

    return (
        isAuth ?
            <Routes>
                {
                    privateRoutes.map(route =>
                        <Route
                            element={route.element}
                            path={route.path}
                            exact={route.exact}
                            key={route.path}/>)
                }
                <Route
                    element={<Logout setRole={setRole}/>}
                    path={'/logout'}
                    exact={true}
                    key={'/logout'}>
                </Route>
            </Routes>
            :
            <Routes>
                <Route
                    element={<Login setRole={setRole}/>}
                    path={'/login'}
                    exact={true}
                    key={'/login'}>
                </Route>

                <Route
                    element={<Registration/>}
                    path={'/registration'}
                    exact={true}
                    key={'/registration'}>
                </Route>

                {/*<Route path='/*' element={<Navigate to={}/>}/>*/}
            </Routes>

    );
};

export default AppRouter;