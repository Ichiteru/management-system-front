import React, {useState} from 'react';
import {STATUS_ACCEPTED, STATUS_ACTIVE, STATUS_REJECTED} from "../../service/CommonService";
import {LOGGED_USER_ROLE_KEY} from "../../service/AuthenticationService";

const ApplicationRow = (props) => {

    const [currentUserRole] = useState(sessionStorage.getItem(LOGGED_USER_ROLE_KEY))

    function rowColor() {
        if (props.application.applicationStatus == STATUS_ACCEPTED) {
            return 'table-success'
        }
        else if (props.application.applicationStatus == STATUS_REJECTED) {
            return 'table-danger'
        }
        else return 'table-warning'
    }

    return (
        <tr className={rowColor()}>
            <td scope="col">{props.application.id}</td>
            <td scope="col">{props.application.applicationType}</td>
            <td scope="col">{props.application.applicationStatus}</td>
            <td scope="col">{props.application.postDate}</td>
            <td scope="col">{props.application.modifiedDate}</td>
            <td scope="col">{props.application.post}</td>
            <td scope="col">{props.application.suggestedSalary}</td>
            <td scope="col">
                {
                    currentUserRole == 'ROLE_EMPLOYEE' &&
                    <button
                        onClick={() => props.remove(props.application.id)}
                        id='a-change-status' className='btn btn-danger'>
                        <small>Удалить</small>
                    </button>
                }
                {
                    currentUserRole == 'ROLE_MANAGER' && props.application.applicationStatus == 'POSTED' &&
                    <div>
                        <button
                            id='a-change-status' className='btn btn-success'
                            onClick={(e) => {props.feedback(props.application.id, STATUS_ACCEPTED)}}>
                            <small>Принять</small>
                        </button>
                        <button
                            id='a-change-status' className='btn btn-danger mx-1'
                            onClick={(e) => {props.feedback(props.application.id, STATUS_REJECTED)}}>
                            <small>Отклонить</small>
                        </button>
                        <button
                            // onClick={() => props.changeStatus(props.user.id, props.user.status)}
                            id='a-change-status' className='btn btn-primary mx-1'
                            onClick={(e) => {props.openInfo(props.application.resumeId)}}>
                            <small>Подробнее</small>
                        </button>
                    </div>
                }
            </td>
        </tr>
    );
};

export default ApplicationRow;