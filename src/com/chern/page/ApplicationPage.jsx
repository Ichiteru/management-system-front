import React, {useEffect, useState} from 'react';
import {LOGGED_USER_ROLE_KEY} from "../service/AuthenticationService";
import {useFetching} from "../hook/useFetching";
import CompanyService from "../service/CompanyService";
import {getPageCount} from "../utils/pages";
import ApplicationService from "../service/ApplicationService";
import ApplicationTable from "../UI/application/ApplicationTable";
import Pagination from "../UI/pagination/Pagination";

const ApplicationPage = () => {

    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [applications, setApplications] = useState([])
    const [fetchApplications, isLoading, error] = useFetching(async (page, limit)  => {
        let response = await ApplicationService.getAll(page, limit);
        setTotalPages(getPageCount(response.headers["total-count"], limit))
        setApplications(response.data);
    })

    useEffect(()=>{
        fetchApplications(page, limit)
    }, [page])

    const changePage = (page) => {
        if (!isNaN(page)) {
            setPage(Number(page))
        }
    }


    return (
        <div className='container mt-lg-5' >
            <ApplicationTable applications={applications}/>
            <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
        </div>
    );
};

export default ApplicationPage;