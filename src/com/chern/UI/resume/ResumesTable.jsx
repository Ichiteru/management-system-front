import React from 'react';
import ResumeCard from "./ResumeCard";

const ResumesTable = ({resumes, deleteById, openUpdateModal}) => {
    return (
        <div className='row'>
                {resumes.map(resume => <ResumeCard key={resume.id} resume={resume} deleteById={deleteById} openUpdateModal={openUpdateModal}/> )}
        </div>
    );
};

export default ResumesTable;