import { expect,request } from "@playwright/test";
import { color } from "./common.helper";
import ENV from "../utils/env";
let prettyjson = require('prettyjson');



export class GrapQLService{

    async logRequestAPI(URL: string,data?:any ){
        console.log(color.request(`\n<=============SENDING REQUEST==============>`));
        console.log(color.request(`\n REQUEST URL: \n`,prettyjson.render(URL)));
        console.log(color.request(`\n REQUEST DATA: \n`,prettyjson.render(data)));

    };


    async logResponseAPI(status: any, data: any){
        console.log(color.response(`\n<=============RECIEVED RESPONSE ==============>`));
        console.log(color.response(`\n RESPONSE STATUS CODE \n ${status}`));
        console.log(color.response(`\n RESPONSE DATA \n`, prettyjson.render(data)));
    }
}