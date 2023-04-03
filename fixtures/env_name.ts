//@ts-ignore
import { test as base } from "@playwright/test";
//@ts-ignore
import { color } from "../helperMethods/common.helper.ts";



export const test = base.extend<{ saveLogs: void }>({

    saveLogs: [ async ({}, use) => {
      console.log(color.info(`<<< ENVIRONMENT: ${process.env.ENV_NAME} >>>`));
      await use();
    }, { auto: true } ]
  
  });