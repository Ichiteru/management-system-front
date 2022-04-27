import React, {useEffect, useState} from 'react';
import {LOGGED_USER_ROLE_KEY} from "../service/AuthenticationService";
import {useFetching} from "../hook/useFetching";
import VacancyService from "../service/VacancyService";
import VacancyTable from "../UI/vacancy/VacancyTable";
import Modal from "../UI/modal/Modal";
import VacancyForm from "../UI/vacancy/VacancyForm";
import {ADD_SCOPE} from "../service/CommonService";

const VacanciesPage = () => {

    const [scope, setScope] = useState(ADD_SCOPE)
    const [change, setChange] = useState(0);
    const [modal, setModal] = useState(false)
    const [currentUserRole] = useState(sessionStorage.getItem(LOGGED_USER_ROLE_KEY))
    const [vacancies, setVacancies] = useState([])
    const [fetchVacancies, isLoading, error] = useFetching(async (role) => {
        let response = await VacancyService.getAll(role);
        setVacancies(response.data);
    })

    useEffect(() => {
        fetchVacancies(currentUserRole);
    }, [currentUserRole, change])


    return (
        <div className='container mt-lg-5' >
            <Modal visible={modal} setVisible={setModal}>
                <VacancyForm setChange={setChange}/>
            </Modal>
            <div className="row">
                <div className="col">
                    <button
                        onClick={() => {
                            setScope(ADD_SCOPE);
                            setModal(true)}
                        }
                        className="btn btn-primary btn-add mx-2">Добавить вакансию</button>
                </div>
            </div>
            <VacancyTable vacancies={vacancies} role={currentUserRole}/>
        </div>
    );
};

export default VacanciesPage;