import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $host_stavka = axios.create({
    baseURL: process.env.REACT_APP_API_URL_STAVKA
})

const $host_upload = axios.create({
    baseURL: process.env.REACT_APP_API_URL_UPLOAD
})


export {
    $host, $host_upload, $host_stavka,
}