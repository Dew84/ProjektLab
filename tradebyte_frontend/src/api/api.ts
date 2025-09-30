import axiosInstance from "./axios.config";
import {AuthApi, UsersApi} from "../../generated/src";



const Auth = new AuthApi({basePath: ' ', axios: axiosInstance, configuration: {}});

const api = {
    Auth
};

export default api;