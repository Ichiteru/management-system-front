import React from 'react';
import UserRow from "../user/UserRow";
import VacancyRow from "./VacancyRow";

const VacancyTable = ({vacancies, role}) => {
    return (
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Должность</th>
                <th scope="col">Зарплата</th>
                <th scope="col">Компания</th>
                <th scope="col">Тип компании</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            {
                vacancies.map(vacancy =>
                    <VacancyRow role={role} vacancy={vacancy} key={vacancy.id}/>
                )
            }
            </tbody>
        </table>
    );
};

export default VacancyTable;