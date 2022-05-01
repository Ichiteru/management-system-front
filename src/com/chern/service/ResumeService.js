import {MS_API_URL} from "./CommonService";
import {TOKEN_KEY} from "./AuthenticationService";
import axios from "axios";

let config;

export default class ResumeService {

    static async getAll(page, limit, searchByName){
        config = {
            method: 'get',
            url: MS_API_URL + '/resumes',
            headers: {
                Authorization: sessionStorage.getItem(TOKEN_KEY)
            },
            params:{
                page: page-1,
                size: limit,
                namePart: searchByName
            }
        }
        return axios(config)
    }

    static async getById(id){
        config = {
            method: 'get',
            url: MS_API_URL + '/resumes/' + id,
            headers: {
                Authorization: sessionStorage.getItem(TOKEN_KEY)
            }
        }
        return axios(config)
    }

    static async deleteById(id){
        config = {
            method: 'delete',
            url: MS_API_URL + '/resumes/' + id,
            headers: {
                Authorization: sessionStorage.getItem(TOKEN_KEY)
            }
        }
        return axios(config)
    }

    static async save(resume){
        config = {
            method: 'post',
            url: MS_API_URL + '/resumes',
            data: resume,
            headers: {
                Authorization : sessionStorage.getItem(TOKEN_KEY)
            }
        }
        return  axios(config);
    }

    static async update(resume) {
        config = {
            method: 'put',
            url: MS_API_URL + '/resumes',
            data: resume,
            headers: {
                Authorization : sessionStorage.getItem(TOKEN_KEY)
            }
        }
        return axios(config)
    }
}