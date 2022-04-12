import React from 'react';
import UserRow from "./UserRow";

const UsersTable = ({users, changeStatus}) => {

    return (
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Full name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
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