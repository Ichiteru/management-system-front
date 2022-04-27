import React, {useEffect, useMemo, useState} from 'react';
import ResumesTable from "../UI/resume/ResumesTable";
import {useFetching} from "../hook/useFetching";
import UserService from "../service/UserService";
import ResumeService from "../service/ResumeService";
import {getPageCount} from "../utils/pages";
import Pagination from "../UI/pagination/Pagination";
import Modal from "../UI/modal/Modal";
import ResumeForm from "../UI/resume/ResumeForm";

const ResumesPage = () => {

    const [resumes, setResumes] = useState([]);
    const [modal, setModal] = useState(false);
    const [limit] = useState(3)
    const [searchByName, setSearchByName] = useState('')
    const [change, setChange] = useState(0)
    const [scope, setScope] = useState('add');
    const [message, setMessage] = useState(false)
    const [error, setError] = useState(false)
    const [page, setPage] = useState(1)
    const [toUpdate, setToUpdate] = useState({});
    const [totalPages, setTotalPages] = useState(0);
    const [fetchResumes, isResumesLoading, resumeError] = useFetching(async (page, limit, searchByName) => {
        let response = await ResumeService.getAll(page, limit, searchByName);
        setTotalPages(response.headers['total-count'])
        setResumes(response.data)
    })

    useEffect(() => {
        fetchResumes(page, limit, searchByName)
    }, [page, change, searchByName])

    function deleteById(id) {
        ResumeService.deleteById(id).then(resp => {
            setMessage('Выбранное вами резюме было успешно удалено');
            setError(false)
            setChange(Math.random());
        }).catch(err => {
            setMessage(false)
            setError('Ошибка при удалении резюме')
        })
    }

    function openUpdateModal(resume){
        setScope('update')
        setToUpdate(resume);
        setModal(true);
    }

    const changePage = (page) => {
        if (!isNaN(page)) {
            setPage(Number(page))
        }
    }

    return (
        <div className='container mt-lg-5'>
            <Modal visible={modal} setVisible={setModal}>
                <ResumeForm scope={scope} setChange={setChange}
                            setModal={setModal} setPageError={setError} setMessage={setMessage} updatedResume={toUpdate}/>
            </Modal>
            {
                message !=false && <div className='alert alert-success'>{message}</div>
            }
            {
                error !=false && <div className='alert alert-danger'>{error}</div>
            }
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Поиск по названию резюме"
                       aria-label="Recipient's username" aria-describedby="basic-addon2"
                       onChange={(e) => {setSearchByName(e.target.value)}}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button">Поиск</button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button
                        onClick={() => {setScope('add'); setModal(true)}}
                        className="btn btn-primary btn-add mx-2">Добавить резюме</button>
                </div>
            </div>
            <ResumesTable resumes={resumes} deleteById={deleteById} openUpdateModal={openUpdateModal}/>
            <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
        </div>
    );
};

export default ResumesPage;