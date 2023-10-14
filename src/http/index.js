import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $host_upload = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


export {
    $host, $host_upload,
}