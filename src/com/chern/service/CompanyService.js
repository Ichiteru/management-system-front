import {TOKEN_KEY} from "./AuthenticationService";
import axios from "axios";
import {MS_API_URL} from "./CommonService";

let config;

export default class CompanyService {

    static async getAll(page, size, search) {
        config = {
            method: 'get',
            url: MS_API_URL + '/companies',
            headers: {
                Authorization: sessionStorage.getItem(TOKEN_KEY)
            },
            params: {
                page: page - 1,
                size: size,
                name: search
            }
        }
        return axios(config)
    }

    static async add(company){
        config = {
            method: 'post',
            url: MS_API_URL + '/companies',
            headers: {
                Authorization: sessionStorage.getItem(TOKEN_KEY)
            },
            data : company
        }
        return axios(config)
    }

    static async deleteById(id) {
        config = {
            method: 'delete',
            url: MS_API_URL + '/companies/' + id,
            headers: {
                Authorization: sessionStorage.getItem(TOKEN_KEY)
            }
        }
        return axios(config)
    }
}