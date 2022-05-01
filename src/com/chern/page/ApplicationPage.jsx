import React, {useEffect, useState} from 'react';
import {LOGGED_USER_ROLE_KEY} from "../service/AuthenticationService";
import {useFetching} from "../hook/useFetching";
import CompanyService from "../service/CompanyService";
import {getPageCount} from "../utils/pages";
import ApplicationService from "../service/ApplicationService";
import ApplicationTable from "../UI/application/ApplicationTable";
import Pagination from "../UI/pagination/Pagination";
import Modal from "../UI/modal/Modal";
import ResumeService from "../service/ResumeService";
import ResumeForm from "../UI/resume/ResumeForm";
import {VIEW_SCOPE} from "../service/CommonService";

const ApplicationPage = () => {

    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1);
    const [change, setChange] = useState(0);
    const [limit] = useState(10);
    const [resume, setResume] = useState({})
    const [success, setSuccess] = useState(false)
    const [pageError, setPageError] = useState(false)
    const [applications, setApplications] = useState([])
    const [modal, setModal] = useState(false)
    const [fetchApplications, isLoading, error] = useFetching(async (page, limit) => {
        let response = await ApplicationService.getAll(page, limit);
        setTotalPages(response.headers["total-count"])
        setApplications(response.data);
    })

    useEffect(() => {
        fetchApplications(page, limit)
    }, [page, change])

    const changePage = (page) => {
        if (!isNaN(page)) {
            setPage(Number(page))
        }
    }

    function feedback(id, status) {
        ApplicationService.feedback(id, status).then(resp => {
            setPageError(false);
            // setChange(Math.random)
            setSuccess('Отзыв на заявку отправлен на почту пользователя')
        }).catch(err => {
            setSuccess(false)
            setPageError(err.response.data)
        })
    }

    function remove(id){
        ApplicationService.deleteById(id).then(resp => {
            setSuccess('Заявка успешно удалена')
            setPageError(false)
            setChange(Math.random)
        }).catch(err =>{

            setSuccess(false)
            setPageError('Ошибка при удалении заявки')
        })
    }

    function openResumeInfo(id) {
        ResumeService.getById(id).then(resp =>{
            const temp = resp.data;
            setResume(temp);
            setChange(Math.random)
            setModal(true)
        }).catch(err =>{
            setPageError('Ошибка. Такого резюме не существует.')
        })
    }

    return (
        <div className='container mt-lg-5'>
            <Modal visible={modal} setVisible={setModal}>
                <ResumeForm setMessage={setSuccess} setPageError={setPageError} setModal={setModal} scope={VIEW_SCOPE} updatedResume={resume} setChange={setChange}/>
            </Modal>
            {
                success != false && <div className='alert alert-success'>{success}</div>
            }
            {
                pageError != false && <div className='alert alert-danger'>{pageError}</div>
            }
            <ApplicationTable applications={applications} feedback={feedback} openInfo={openResumeInfo} remove={remove}/>
            <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
        </div>
    );
};

export default ApplicationPage;