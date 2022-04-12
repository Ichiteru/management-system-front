import React, {useEffect, useState} from 'react';
import UsersTable from "../UI/user/UsersTable";
import {useFetching} from "../hook/useFetching";
import UserService from "../service/UserService";
import {STATUS_ACTIVE, STATUS_INACTIVE} from "../service/CommonService";


const Users = () => {

    const [users, setUsers] = useState([]);
    const [fetchUsers, isUsersLoading, userError] = useFetching( async () => {
        let response = await UserService.getAll();
        setUsers(response.data);
    })

    useEffect(() => {
        fetchUsers();
    }, [])

    function changeStatus(id, status){
        UserService.changeStatus(id, getChangedStatus(status)).then(resp => {
           fetchUsers()
        }).catch(err => {
            console.log(err)
        })
    }

    function getChangedStatus(status) {
        return status == STATUS_ACTIVE ? STATUS_INACTIVE : STATUS_ACTIVE;
    }

    return (
        <div className='container mt-lg-5' >
            <UsersTable users={users} changeStatus={changeStatus}/>
        </div>
    );
};

export default Users;