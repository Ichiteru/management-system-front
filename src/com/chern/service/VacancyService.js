import {MS_API_URL} from "./CommonService";
import {TOKEN_KEY} from "./AuthenticationService";
import axios from "axios";

let config;

export default class VacancyService {

    static async getAll(role){
        config = {
            method: 'get',
            url: MS_API_URL + (role == 'ROLE_EMPLOYEE' ? '/vacancies' : "/company/vacancies"),
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
}