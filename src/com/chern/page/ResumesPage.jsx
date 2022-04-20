import React, {useEffect, useState} from 'react';
import ResumesTable from "../UI/resume/ResumesTable";
import {useFetching} from "../hook/useFetching";
import UserService from "../service/UserService";
import ResumeService from "../service/ResumeService";

const ResumesPage = () => {

    const [resumes, setResumes] = useState([]);
    const [fetchResumes, isResumesLoading, resumeError] = useFetching(async () => {
        let response = await ResumeService.getAll();
        console.log("works")
        setResumes(response.data)
    })

    useEffect(() => {
        fetchResumes()
    }, [])

    return (
        <div className='container mt-lg-5'>
            <ResumesTable resumes={resumes}/>
        </div>
    );
};

export default ResumesPage;