import React from 'react';
import ResumeCard from "./ResumeCard";

const ResumesTable = ({resumes}) => {
    return (
        <div className='row'>
                {resumes.map(resume => <ResumeCard key={resume.id} resume={resume}/> )}
        </div>
    );
};

export default ResumesTable;