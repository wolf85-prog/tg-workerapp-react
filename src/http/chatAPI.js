import {$host, $host_upload} from "./index";

export const sendMyMessage = async (id) =>{
    try {
       let response = await $host.get(`api/sendmessage/${id}`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling sendMessage api", error.message);
    }
}

export const getWorkerId = async (id) =>{
    try {
       let response = await $host.get(`api/workers/${id}`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getWorkerId api", error.message);
    }
}

export const getProjectsAll = async () =>{
    try {
       let response = await $host.get(`api/projectall`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getProjectAll api", error.message);
    }
}

export const getProjectsNew = async () =>{
    try {
       let response = await $host.get(`api/projectsnew`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getProjectsNew api", error.message);
    }
}

export const getProjectsOld = async () =>{
    try {
       let response = await $host.get(`api/projectsold`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getProjectsOld api", error.message);
    }
}


export const getBlockId = async (id) =>{
    try {
       let response = await $host.get(`api/blocks/${id}`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getBlockId api", error.message);
    }
}

export const getDatabase = async (id) =>{
    try {
       let response = await $host.get(`api/database/${id}`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getDatabase api", error.message);
    }
}

//file
export const uploadFile = async (data) =>{
    try {
        return await $host_upload.post(`api/file/upload`, data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    } catch (error) {
        console.log("error while calling uploadFile api",error.message);
        
    }
}
