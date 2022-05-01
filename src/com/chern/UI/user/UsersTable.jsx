import React from 'react';
import UserRow from "./UserRow";

const UsersTable = ({users, changeStatus}) => {

    return (
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Полное имя</th>
                <th scope="col">Имя пользователя</th>
                <th scope="col">Почта</th>
                <th scope="col">Статус</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
                {
                    users.map(user =>
                        <UserRow key={user.id} user={user} changeStatus={changeStatus}/>
                    )
                }
            </tbody>
        </table>
    );
};

export default UsersTable;