import {$authHost, $host_person} from "./index";

export const getWorkerChildrenId = async (id) =>{
    try {
       let response = await $host_person.get(`api/workers/children/${id}`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getWorkerChildrenId api", error.message);
    }
}

export const getWorkers = async (userId) =>{
    try {
       let response = await $host_person.get(`api/workers/user/get/${userId}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getWorkers api", error.message);
    }
}

export const getWorker = async (id) =>{
    try {
       let response = await $host_person.get(`api/workers/${id}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getWorker api", error.message);
    }
}