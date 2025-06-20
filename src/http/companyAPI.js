import {$authHost, $host_person} from "./index";

export const getCompanyProfId = async (id) =>{
    try {
       let response = await $host_person.get(`api/companyprof/${id}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getCompanyProfId api", error.message);
    }
}