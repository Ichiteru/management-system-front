import {MS_API_URL} from "./CommonService";
import {TOKEN_KEY} from "./AuthenticationService";
import axios from "axios";

let config;

export default class VacancyService {

    static async getAll(role, search, page, size){
        config = {
            method: 'get',
            url: MS_API_URL + (role == 'ROLE_EMPLOYEE' ? '/vacancies' : "/company/vacancies"),
            headers: {
                Authorization : sessionStorage.getItem(TOKEN_KEY)
            },
            params:{
                postPart: search,
                page: page-1,
                size: size
            }
        }
        return axios(config)
    }

    static async getChart(){
        config = {
            method: 'get',
            url: MS_API_URL + '/vacancies/chart',
            headers: {
                Authorization : sessionStorage.getItem(TOKEN_KEY)
            }

        }
        return axios(config)
    }

    static async getById(id){
        config = {
            method: 'get',
            url: MS_API_URL + /vacancies/ + id,
            headers: {
                Authorization : sessionStorage.getItem(TOKEN_KEY)
            }
        }
        return axios(config)
    }

    static async save(vacancy){
        config = {
            method: 'post',
            url: MS_API_URL + "/vacancies",
            data: vacancy,
            headers: {
                Authorization: sessionStorage.getItem(TOKEN_KEY)
            }
        }
        return axios(config)
    }

    static async update(vacancy){
        config = {
            method: 'put',
            url: MS_API_URL + "/vacancies",
            data: vacancy,
            headers: {
                Authorization: sessionStorage.getItem(TOKEN_KEY)
            }
        }
        return axios(config)
    }

    static async deleteById(id){
        config = {
            method: 'delete',
            url: MS_API_URL + "/vacancies/" + id,
            headers: {
                Authorization: sessionStorage.getItem(TOKEN_KEY)
            }
        }
        return axios(config)
    }
}