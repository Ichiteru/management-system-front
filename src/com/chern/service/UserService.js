import {MS_API_URL} from "./CommonService";
import axios from "axios";
import {TOKEN_KEY} from "./AuthenticationService";


let config;

export default class UserService {


    static async getAll() {
        config = {
            method: 'get',
            url: MS_API_URL + '/employees',
            headers: {
                Authorization: sessionStorage.getItem(TOKEN_KEY)
            }
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