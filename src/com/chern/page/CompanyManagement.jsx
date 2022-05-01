import React, {useEffect, useState} from 'react';
import UsersTable from "../UI/user/UsersTable";
import Pagination from "../UI/pagination/Pagination";
import {useFetching} from "../hook/useFetching";
import CompanyService from "../service/CompanyService";
import CompanyRow from "../UI/company/CompanyRow";
import CompanyTable from "../UI/company/CompanyTable";
import {getPageCount} from "../utils/pages";
import './../styles/common.css';
import Modal from "../UI/modal/Modal";
import AddCompanyForm from "../UI/company/AddCompanyForm";

const CompanyManagement = () => {

    const [companies, setCompanies] = useState([]);
    const [message, setMessage] = useState(false)
    const [page,setPage] = useState(1);
    const [limit] = useState(10);
    const [modal, setModal] = useState(false);
    const [searchByName, setSearchByName] = useState('')
    const [totalPages, setTotalPages] = useState(0);
    const [deleteError, setDeleteError] = useState(false)
    const [fetchCompanies, isLoading, error] = useFetching(async (page, limit, searchByName)  => {
        let response = await CompanyService.getAll(page, limit, searchByName);
        setTotalPages(response.headers["total-count"])
        setCompanies(response.data);
    })

    useEffect(() => {
        fetchCompanies(page, limit, searchByName);
    }, [page, searchByName])

    function deleteCompany(id){
        CompanyService.deleteById(id).then(resp => {
            setMessage('Аккаунт компании номер ' + id + ' успешно удалена.')
            setDeleteError(false)
            setCompanies(companies.filter(c => c.id !== id ))
        }).catch(err => {
            setMessage(false);
            setDeleteError("Ошибка при удалении. Попробуйте снова.")
        });
    }

    function addCompany(company){
        setCompanies([...companies, company]);
        setModal(false)
    }

    const changePage = (page) => {
        if (!isNaN(page)) {
            setPage(Number(page))
        }
    }

    return (
        <div className='container mt-lg-5' >

            <Modal visible={modal} setVisible={setModal}>
                <AddCompanyForm setMessage={setMessage} addCompany={addCompany}/>
            </Modal>
            {
                message !=false && <div className='alert alert-success'>{message}</div>
            }
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Поиск по названию компании"
                       aria-label="Recipient's username" aria-describedby="basic-addon2"
                       onChange={(e) => {setSearchByName(e.target.value)}}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button">Поиск</button>
                </div>
            </div>
                <CompanyTable companies={companies} deleteCompany={deleteCompany}/>
            <div className="row">
                <div className="col">
                    <button
                        onClick={() => {setModal(true)}}
                        className="btn btn-primary btn-add">Добавить компанию</button>
                </div>
            </div>
            <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
        </div>
    );
};

export default CompanyManagement;