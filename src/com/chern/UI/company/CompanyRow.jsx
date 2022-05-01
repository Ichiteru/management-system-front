import React from 'react';
import {STATUS_ACTIVE} from "../../service/CommonService";

const CompanyRow = (props) => {
    return (
        <tr className='table-success'>
            <td scope="col">{props.company.id}</td>
            <td scope="col">{props.company.name}</td>
            <td scope="col">{props.company.type}</td>
            <td scope="col">{props.company.managerEmail}</td>
            <td scope="col">
                <button
                    onClick={() => props.delete(props.company.id)}
                    className='btn btn-danger'>
                    <small>Удалить</small>
                </button>
            </td>
        </tr>
    );
};

export default CompanyRow;