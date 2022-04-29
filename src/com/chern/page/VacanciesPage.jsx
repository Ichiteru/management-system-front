import React, {useEffect, useState} from 'react';
import {LOGGED_USER_ROLE_KEY} from "../service/AuthenticationService";
import {useFetching} from "../hook/useFetching";
import VacancyService from "../service/VacancyService";
import VacancyTable from "../UI/vacancy/VacancyTable";
import Modal from "../UI/modal/Modal";
import VacancyForm from "../UI/vacancy/VacancyForm";
import {ADD_SCOPE, UPDATE_SCOPE, VIEW_SCOPE} from "../service/CommonService";
import {getPageCount} from "../utils/pages";
import Pagination from "../UI/pagination/Pagination";

const VacanciesPage = () => {

    const [success, setSuccess] = useState(false)
    const [pageError, setPageError] = useState(false)
    const [page, setPage] = useState(1);
    const [limit] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const [searchByPost, setSearchByPost] = useState('')
    const [scope, setScope] = useState(ADD_SCOPE)
    const [updatedId, setUpdatedId] = useState(-1)
    const [change, setChange] = useState(0);
    const [modal, setModal] = useState(false)
    const [currentUserRole] = useState(sessionStorage.getItem(LOGGED_USER_ROLE_KEY))
    const [vacancies, setVacancies] = useState([])
    const [fetchVacancies, isLoading, error] = useFetching(async (role, search, page, limit) => {
        let response = await VacancyService.getAll(role, search, page, limit);
        setTotalPages(getPageCount(response.headers["total-count"], limit))
        setVacancies(response.data);
    })

    useEffect(() => {
        fetchVacancies(currentUserRole, searchByPost, page, limit);
    }, [currentUserRole, change, searchByPost, page])

    function openUpdateModal(id) {
        setUpdatedId(id)
        setScope('')
        setScope(UPDATE_SCOPE)
        setModal(true)
    }

    function openSendApplicationModal(id){
        setUpdatedId(id)
        setScope(VIEW_SCOPE)
        setModal(true)
    }

    const changePage = (page) => {
        if (!isNaN(page)) {
            setPage(Number(page))
        }
    }

    function deleteById(id) {
        VacancyService.deleteById(id).then(resp => {
            setChange(Math.random)
            setSuccess('Вакансия была успешно удалена.')
            setPageError(false)
        }).catch(err => {
            setPageError('Ошибка при удалении вакансии.')
            setSuccess(false)
        })
    }

    return (
        <div className='container mt-lg-5'>
            <Modal visible={modal} setVisible={setModal}>
                <VacancyForm setChange={setChange} scope={scope} setModal={setModal} setSuccessMsg={setSuccess}
                             id={updatedId}/>
            </Modal>
            {
                currentUserRole == 'ROLE_EMPLOYEE' &&
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Поиск по вакансии"
                           aria-label="Recipient's username" aria-describedby="basic-addon2"
                           onChange={(e) => {setSearchByPost(e.target.value)}}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button">Поиск</button>
                    </div>
                </div>
            }
            {
                success != false && <div className='alert alert-success'>{success}</div>
            }
            {
                pageError != false && <div className='alert alert-danger'>{pageError}</div>
            }
            <div className="row">
                <div className="col">
                    <button
                        onClick={() => {
                            setScope('')
                            setScope(ADD_SCOPE);
                            setModal(true)
                        }
                        }
                        className="btn btn-primary btn-add mx-2">Добавить вакансию
                    </button>
                </div>
            </div>
            <VacancyTable vacancies={vacancies} role={currentUserRole} update={openUpdateModal} remove={deleteById}
            view={openSendApplicationModal}/>
            <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
        </div>
    );
};

export default VacanciesPage;