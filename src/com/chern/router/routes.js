import Profile from "../page/Profile";
import Users from "../page/Users";
import CompanyManagement from "../page/CompanyManagement";
import ResumesPage from "../page/ResumesPage";
import VacanciesPage from "../page/VacanciesPage";
import VacancyApplicationsPage from "../page/VacancyApplicationsPage";
import ApplicationPage from "../page/ApplicationPage";
import ChartInfoPage from "../page/ChartInfoPage";

export const privateRoutes = [
    {path: "/profile", element: <Profile/>, exact: true},
    {path: "/users", element: <Users/>, exact: true},
    {path: "/resumes", element: <ResumesPage/>, exact: true},
    {path: "/companies", element: <CompanyManagement/>, exact: true},
    {path: "/vacancies", element: <VacanciesPage/>, exact: true},
    {path: "/applications/:id", element: <VacancyApplicationsPage/>, exact: true},
    {path: "/applications", element: <ApplicationPage/>, exact: true},
    {path: "/chart", element: <ChartInfoPage/>, exact: true}
]

export default function getDefaultRoleRoute(role){
    switch (role){
        case 'ROLE_SYSTEM_ADMIN' : return '/companies'
        case 'ROLE_MANAGER' : return '/vacancies'
        case 'ROLE_EMPLOYEE' : return '/profile'
    }
}