import React from 'react';
import {useParams} from "react-router-dom";

const VacancyApplicationsPage = () => {

    const {id} = useParams();

    return (
        <div>
            {id}
        </div>
    );
};

export default VacancyApplicationsPage;