import Profile from "../page/Profile";
import Users from "../page/Users";
import CompanyManagement from "../page/CompanyManagement";

export const privateRoutes = [
    {path: "/profile", element: <Profile/>, exact: true},
    {path: "/users", element: <Users/>, exact: true},
    {path: "/companies", element: <CompanyManagement/>, exact: true}
]

export default function getDefaultRoleRoute(role){
    switch (role){
        case 'ROLE_SYSTEM_ADMIN' : return '/companies'
        case 'ROLE_MANAGER' : return '/company'
        case 'ROLE_EMPLOYEE' : return '/profile'
    }
}