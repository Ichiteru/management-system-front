import React from 'react';
import UserRow from "../user/UserRow";
import CompanyRow from "./CompanyRow";

const CompanyTable = ({companies, deleteCompany}) => {
    return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Тип</th>
                    <th scope="col">Почта</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {
                    companies.map(company =>
                        <CompanyRow key={company.id} company={company} delete={deleteCompany}/>
                    )
                }
                </tbody>
            </table>
    );
};

export default CompanyTable;