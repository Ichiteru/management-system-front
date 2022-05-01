import React from 'react';
import {STATUS_ACTIVE} from "../../service/CommonService";
import './../../styles/common.css'

const UserRow = (props) => {
    return (
        <tr className={props.user.status == STATUS_ACTIVE ?  'table-success' : 'table-danger'}>
            <td scope="col">{props.user.id}</td>
            <td scope="col">{props.user.name} {props.user.surname}</td>
            <td scope="col">{props.user.username}</td>
            <td scope="col">{props.user.email}</td>
            <td scope="col">{props.user.status}</td>
            <td scope="col">
                <a
                    onClick={() => props.changeStatus(props.user.id, props.user.status)}
                    id='a-change-status' className='btn link-primary'>
                    <small>Изменить статус</small>
                </a>
            </td>
        </tr>
    );
};

export default UserRow;