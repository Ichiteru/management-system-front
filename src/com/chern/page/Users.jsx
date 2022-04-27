import React, {useEffect, useState} from 'react';
import UsersTable from "../UI/user/UsersTable";
import {useFetching} from "../hook/useFetching";
import UserService from "../service/UserService";
import {STATUS_ACTIVE, STATUS_INACTIVE} from "../service/CommonService";
import {getPageCount} from "../utils/pages";
import Pagination from "../UI/pagination/Pagination";


const Users = () => {

    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [fetchUsers, isUsersLoading, userError] = useFetching( async (filter, page, limit) => {
        let response = await UserService.getAll(filter, page, limit);
        setTotalPages(getPageCount(response.headers["total-count"], limit))
        setUsers(response.data);
    })
    const [filter, setFilter] = useState({searchByUsername: '', showOnlyActive: false, sortByInitials: false})

    useEffect(() => {
        fetchUsers(filter, page, limit);
    }, [filter, page])

    function changeStatus(id, status){
        UserService.changeStatus(id, getChangedStatus(status)).then(resp => {
           fetchUsers(filter)
        }).catch(err => {
            console.log(err)
        })
    }

    const changePage = (page) => {
        if (!isNaN(page)) {
            setPage(Number(page))
        }
    }

    function getChangedStatus(status) {
        return status == STATUS_ACTIVE ? STATUS_INACTIVE : STATUS_ACTIVE;
    }

    return (
        <div className='container mt-lg-5' >
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Введите часть юзернейма"
                       aria-label="Recipient's username" aria-describedby="basic-addon2"
                        onChange={(e) => {setFilter({...filter, searchByUsername: e.target.value})}}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button">Поиск</button>
                    </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="form-check">
                        <input
                            onChange={(e) => setFilter({...filter, showOnlyActive: e.target.checked ? true : false})}
                            className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Только активные аккаунты
                        </label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-check">
                        <input
                            onChange={(e) => setFilter({...filter, sortByInitials: e.target.checked ? true : false})}
                            className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Отсортировать по имени/фамилии
                        </label>
                    </div>
                </div>
            </div>

            <UsersTable users={users} changeStatus={changeStatus}/>

           <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
        </div>
    );
};

export default Users;