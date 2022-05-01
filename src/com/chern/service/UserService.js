import {MS_API_URL} from "./CommonService";
import axios from "axios";
import {TOKEN_KEY} from "./AuthenticationService";


let config;

export default class UserService {


    static async getAll(filter,page, size) {
        config = {
            method: 'get',
            url: MS_API_URL + '/employees',
            headers: {
                Authorization: sessionStorage.getItem(TOKEN_KEY)
            },
            params: {
                filterInactive: filter.showOnlyActive,
                orderByNameAndSurname: filter.sortByInitials,
                username: filter.searchByUsername,
                page: page - 1,
                size: size
            }
        }
        return axios(config)
    }

    static async getProfile() {
        config = {
            method: 'get',
            url: MS_API_URL + '/users/profile',
            headers: {
                Authorization: sessionStorage.getItem(TOKEN_KEY)
            }
        }
        return axios(config)
    }

    static async updateProfile(profile) {
        config = {
            method: 'put',
            url: MS_API_URL + '/users/profile',
            headers: {
                Authorization: sessionStorage.getItem(TOKEN_KEY)
            },
            data: profile
        }
        return axios(config)
    }

    static async changeStatus(id, status) {
        console.log(status)
        config = {
            method: 'put',
            url: MS_API_URL + '/employees/' + id + '/status',
            headers: {
                Authorization: sessionStorage.getItem(TOKEN_KEY)
            },
            params: {
                status: status
            }
        }
        return axios(config)
    }
}