import {$authHost, $host_person} from "./index";

export const getProjects = async (userId) =>{
    try {
       let response = await $host_person.get(`api/projects/user/get/${userId}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getSpecialist api", error.message);
    }
}


export const getProjectId = async (id) =>{
    try {
       let response = await $host_person.get(`api/projects/get/${id}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getProjectId api", error.message);
    }
}
