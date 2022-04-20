import {MS_API_URL} from "./CommonService";
import {TOKEN_KEY} from "./AuthenticationService";
import axios from "axios";

let config;

export default class ResumeService {

    static async getAll(){
        config = {
            method: 'get',
            url: MS_API_URL + '/resumes',
            headers: {
                Authorization: sessionStorage.getItem(TOKEN_KEY)
            }
        }
        return axios(config)
    }
}