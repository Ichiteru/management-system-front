import React from 'react';
import {STATUS_ACTIVE} from "../../service/CommonService";
import VacancyApplicationsPage from "../../page/VacancyApplicationsPage";
import {Link, useNavigate} from "react-router-dom";

const VacancyRow = (props) => {

    const route = useNavigate();

    function openVacancyApplicationsPage() {
        route('/applications/' + props.vacancy.id)
    }

    return (
        <tr

        >
            <td scope="col">{props.vacancy.id}</td>
            <td scope="col">{props.vacancy.post}</td>
            <td scope="col">{props.vacancy.suggestedSalary} BYN</td>
            <td scope="col">{props.vacancy.companyName}</td>
            <td scope="col">{props.vacancy.companyType}</td>
            <td scope="col">
                {
                    props.role == 'ROLE_EMPLOYEE' ?
                        <button
                            onClick={() => {
                                props.view(props.vacancy.id)
                            }}
                            id='a-change-status' className='btn btn-success'>
                            <small>Отправить заявку</small>
                        </button>
                        :
                        <div className='row row-cols-3'>
                            {/*<div className="col">*/}
                                <button
                                    onClick={() => {
                                        props.openUpdate(props.vacancy.id)
                                    }}
                                    id='a-change-status' className='btn btn-success m-1'>
                                    <small>Обновить</small>
                                </button>
                            {/*</div>*/}
                            {/*<div className="col-6">*/}
                                <button
                                    onClick={() => {
                                        props.remove(props.vacancy.id)
                                    }}
                                    id='a-change-status' className='btn btn-danger m-1'>
                                    <small>Удалить</small>
                                </button>
                            {/*</div>*/}
                            <button
                                onClick={() => {
                                    openVacancyApplicationsPage()
                                }}
                                id='a-change-status' className='btn btn-primary m-1'>
                                <small>Заявки</small>
                            </button>
                        </div>
                }
            </td>
        </tr>
    );
};

export default VacancyRow;