import { test as base } from "@playwright/test";
import { color } from "../helperMethods/common.helper";

export const test = base.extend<{savelogs: void}>({
    savelogs:[
        async ({}, use)=>{
            console.log(color.info(`<<<<<<<<<<< ENV is : ${process.env.ENV_NAME} >>>>>>>>>>>>`));
            await use();
        }, {auto: true}
    ]
});