import axios from "axios";
//import { errorInterceptor, responseInterceptor } from "./interceptor";

const API = axios.create({
    baseURL: "http://localhost:8000/",
});

// API.interceptors.response.use(
//     (response) => responseInterceptor(response),
//     (error) => errorInterceptor(error),
// );

export {API};