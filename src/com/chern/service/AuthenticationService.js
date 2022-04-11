import React from 'react';
import axios from "axios";
import {MS_API_URL} from "./CommonService";

let TOKEN = ''
export const TOKEN_KEY = 'token'
export const LOGGED_USER_ROLE_KEY = 'role'

class AuthenticationService {

    createBasicAuthToken(username, password) {
        TOKEN = 'Basic ' + window.btoa(username + ':' + password)
        return TOKEN
    }

    tryToLogin(username, password) {
        return axios.get(MS_API_URL + '/users/login', {
            headers: {
                Authorization: this.createBasicAuthToken(username, password)
            }
        })
    }

    saveBasicAuthTokenToSessionStorage(){
        sessionStorage.setItem(TOKEN_KEY, TOKEN)
    }

    saveRoleLoggedUserToSessionStorage(role){
        sessionStorage.setItem(LOGGED_USER_ROLE_KEY, role)
    }

};

export default new AuthenticationService();