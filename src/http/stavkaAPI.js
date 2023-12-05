import {$host, $host_stavka} from "./index";

export const getStavka = async (projectId, staffId) =>{
    try {
       let response = await $host_stavka.get(`pre-payment/${projectId}/${staffId}`);
       //console.log(response)
       return response.data;
    } catch (error) {
        console.log("error while calling getStavka api", error.message);
    }
}

export const addStavka = async (specsId, stavka) =>{
    try {
       let response = await $host.get(`api/specs/stavka/add/${specsId}/${stavka}`);
       //console.log(response)
       return response.data;
    } catch (error) {
        console.log("error while calling getStavka api", error.message);
    }
}

export const getSpecStavka = async (specsId) =>{
    try {
       let response = await $host.get(`api/specs/stavka/get/${specsId}`);
       //console.log(response)
       return response.data;
    } catch (error) {
        console.log("error while calling getSpecStavka api", error.message);
    }
}


