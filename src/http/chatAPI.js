import {$host} from "./index";

export const sendMyMessage = async (id) =>{
    try {
       let response = await $host.get(`api/sendmessage/${id}`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling sendMessage api", error.message);
    }
}
