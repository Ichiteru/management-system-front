import {MS_API_URL} from "./CommonService";
import {TOKEN_KEY} from "./AuthenticationService";
import axios from "axios";

let config

export default class ApplicationService {

    static async send(resumeId, vacancyId, status) {
        const body = {
            vacancyId: vacancyId,
            resumeId: resumeId,
            applicationType: status
        }
        config = {
            method: 'post',
            url: MS_API_URL + "/applications",
            data:  body,
            headers: {
                Authorization: sessionStorage.getItem(TOKEN_KEY)
            }
        }
        return axios(config);
    }
}