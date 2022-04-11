import axios from "axios";
import {MS_API_URL} from "./CommonService";

let config;

export default class RegistrationService {


    static async register(body) {
       config = {
           method: 'post',
           url: MS_API_URL + "/employees",
           data: body
       }
       return axios(config);
    }
}

