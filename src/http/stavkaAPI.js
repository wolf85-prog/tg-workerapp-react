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

export const addStavka = async (specsId, projId, stavka, date) =>{
    try {
       let response = await $host.get(`api/specs/stavka/add/${specsId}/${projId}/${stavka}/${date}`);
       //console.log(response)
       return response.data;
    } catch (error) {
        console.log("error while calling addStavka api", error.message);
    }
}

export const addFactStavka = async (specsId, projId, stavka, date) =>{
    try {
       let response = await $host.get(`api/specs/stavka/fact/${specsId}/${projId}/${stavka}/${date}`);
       //console.log(response)
       return response.data;
    } catch (error) {
        console.log("error while calling addFactStavka api", error.message);
    }
}

export const getSpecStavka = async (specsId, projId, date) =>{
    try {
       let response = await $host.get(`api/specs/stavka/get/${specsId}/${projId}/${date}`);
       //console.log(response)
       return response.data;
    } catch (error) {
        console.log("error while calling getSpecStavka api", error.message);
    }
}


