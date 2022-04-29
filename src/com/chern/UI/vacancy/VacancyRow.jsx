import React from 'react';
import {STATUS_ACTIVE} from "../../service/CommonService";
import VacancyApplicationsPage from "../../page/VacancyApplicationsPage";
import {Link, useNavigate} from "react-router-dom";

const VacancyRow = (props) => {

    const route = useNavigate();

    function openVacancyApplicationsPage() {
        console.log('open vacancy applications page')
        route('/applications/' + props.vacancy.id)
        // return (<VacancyApplicationsPage vacancyId={props.vacancy.id}/>);
    }

    return (
        <tr
        //     onClick={(e) => {
        //     props.role == 'ROLE_MANAGER' ?
        //         openVacancyApplicationsPage() : console.log('click for employee')
        // }
        //
        // }
        >
            <td scope="col">{props.vacancy.id}</td>
            <td scope="col">{props.vacancy.post}</td>
            <td scope="col">{props.vacancy.suggestedSalary} BYN</td>
            <td scope="col">{props.vacancy.companyName}</td>
            <td scope="col">{props.vacancy.companyType}</td>
            <td scope="col">
                {
                    props.role == 'ROLE_EMPLOYEE' ?
                        <a
                            onClick={() => {props.view(props.vacancy.id)}}
                            id='a-change-status' className='link-primary'>
                            <small>Send application</small>
                        </a>
                        :
                        <div className='row row-cols-2'>
                            <div className="col">
                                <a
                                    onClick={() => {props.openUpdate(props.vacancy.id)}}
                                    id='a-change-status' className='link-success'>
                                    <small>Update</small>
                                </a>
                            </div>
                            <div className="col-6">
                                <a
                                    onClick={() => {props.remove(props.vacancy.id)}}
                                    id='a-change-status' className='link-danger'>
                                    <small>Remove</small>
                                </a>
                            </div>
                            <div className='col'>

                            </div><a
                            onClick={() => {openVacancyApplicationsPage()}}
                            id='a-change-status' className='link-primary'>
                            <small>Заявки</small>
                        </a>
                        </div>
                }
            </td>
        </tr>
    );
};

export default VacancyRow;