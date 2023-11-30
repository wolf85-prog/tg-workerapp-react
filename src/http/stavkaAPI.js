import {$host_stavka} from "./index";

export const getStavka = async (projectId, staffId) =>{
    //console.log(`pre-payment/${projectId}/${staffId}`)
    try {
       let response = await $host_stavka.get(`pre-payment/${projectId}/${staffId}`);
       
       return response.data;
    } catch (error) {
        console.log("error while calling getStavka api", error.message);
    }
}

