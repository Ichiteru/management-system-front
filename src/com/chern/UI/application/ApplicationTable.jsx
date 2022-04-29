import React from 'react';
import UserRow from "../user/UserRow";
import ApplicationRow from "./ApplicationRow";

const ApplicationTable = ({applications}) => {
    return (
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Тип</th>
                <th scope="col">Статус</th>
                <th scope="col">Дата заявки</th>
                <th scope="col">Дата последнего изменения</th>
                <th scope="col">Вакансия</th>
                <th scope="col">Зарплата</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            {
                applications.map(app =>
                    <ApplicationRow key={app.id} application={app}/>
                )
            }
            </tbody>
        </table>
    );
};

export default ApplicationTable;