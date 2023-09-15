import {$host} from "./index";

export const sendMessage = async () =>{
    try {
       let response = await $host.get('api/sendmessage');
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling sendMessage api", error.message);
    }
}
