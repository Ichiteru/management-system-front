import Profile from "../page/Profile";

export const privateRoutes = [
    {path: "/profile", element: <Profile/>, exact: true}
]

export default function getDefaultRoleRoute(role){
    switch (role){
        case 'ROLE_SYSTEM_ADMIN' : return '/companies'
        case 'ROLE_MANAGER' : return '/company'
        case 'ROLE_EMPLOYEE' : return '/profile'
    }
}