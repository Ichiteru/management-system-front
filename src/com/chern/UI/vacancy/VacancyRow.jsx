import React from 'react';
import {STATUS_ACTIVE} from "../../service/CommonService";

const VacancyRow = (props) => {

    function openVacancyApplicationsPage() {
        console.log('open vacancy applications page')
    }

    return (
        <tr onClick={(e) => {
            props.role == 'ROLE_MANAGER' ?
                openVacancyApplicationsPage() : console.log('click for employee')
        }

        }>
            <td scope="col">{props.vacancy.id}</td>
            <td scope="col">{props.vacancy.post}</td>
            <td scope="col">{props.vacancy.suggestedSalary} BYN</td>
            <td scope="col">{props.vacancy.companyName}</td>
            <td scope="col">{props.vacancy.companyType}</td>
            <td scope="col">
                {
                    props.role == 'ROLE_EMPLOYEE' ?
                        <a
                            // onClick={() => props.changeStatus(props.user.id, props.user.status)}
                            id='a-change-status' className='link-primary'>
                            <small>Send application</small>
                        </a>
                        :
                        <div className='row row-cols-2'>
                            <div className="col">
                                <a
                                    // onClick={() => props.changeStatus(props.user.id, props.user.status)}
                                    id='a-change-status' className='link-success'>
                                    <small>Update</small>
                                </a>
                            </div>
                            <div className="col-6">
                                <a
                                    // onClick={() => props.changeStatus(props.user.id, props.user.status)}
                                    id='a-change-status' className='link-danger'>
                                    <small>Remove</small>
                                </a>
                            </div>
                        </div>
                }
            </td>
        </tr>
    );
};

export default VacancyRow;