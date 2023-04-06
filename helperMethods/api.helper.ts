
import { expect, request } from "@playwright/test";

import { color } from "./common.helper.ts";

import ENV from "../utils/env.ts";
import prettyjson from "prettyjson";

const URL = ENV.BASE_URL as string;

export class GrapQLService {
  async logRequestAPI(URL: string, data?: any) {
    console.log(
      color.request(`\n<=============SENDING REQUEST==============>`)
    );
    console.log(color.request(`\n REQUEST URL: \n`, prettyjson.render(URL)));
    console.log(color.request(`\n REQUEST DATA: \n`, prettyjson.render(data)));
  }

  async logResponseAPI(status: any, data: any) {
    console.log(
      color.response(`\n<=============RECIEVED RESPONSE ==============>`)
    );
    console.log(color.response(`\n RESPONSE STATUS CODE \n ${status}`));
    console.log(color.response(`\n RESPONSE DATA \n`, prettyjson.render(data)));
  }

//   async getAllTeas() {
//     const api = await request.newContext();
//     const query = "{teas {id, name} }"; // query to hit the graphql engine
//     const data = {
//       query: query,
//     };

//     this.logRequestAPI(URL, data); // log the request sent

//     const response = await api.post(URL, { data });
//     const responseStatus = response.status();
//     const responseJSON = await response.json();

//     this.logResponseAPI(responseStatus, responseJSON); // log the respons recieved
//     expect(responseStatus).toEqual(200);
//   }

async getAllTeas() {
    const api = await request.newContext();
    const query = "{ teas { id, name} }";
    const data = {
      query: query
    };

    this.logRequestAPI(URL, data);

    const response = await api.post(URL, { data});
    const status = response.status();
    const respJson = await response.json();
  
    this.logResponseAPI(status, respJson);

    expect(status).toEqual(200);
  };

  async addNewTea(newTea: any, teaPrice: any) {
    const api = await request.newContext();
    const query = `mutation {addTea(teaInput: {name : "${newTea}", description:
        "Darjeeling Tea - Finest from Assam, price: ${teaPrice}",
        producerId:"60b8bc31956abb0009efb710" }) {name price}}`;

    const data = {
      query: query,
    };

    this.logRequestAPI(URL, data);

    const response = await api.post(URL, { data });
    const responseStatus = response.status();
    const responseJSON = await response.json();

    this.logResponseAPI(responseStatus, responseJSON);
    expect(responseStatus).toEqual(200);
  }

  async getTeaByName(teaName: any) {
    const api = await request.newContext();
    const query = `{ teas(name: "${teaName}") {id, name} }`;
    const data = {
      query: query,
    };

    this.logRequestAPI(URL, data);
    const response = await api.post(URL, { data });
    const responseStatus = response.status();
    const responseJSON = await response.json();

    this.logResponseAPI(responseStatus, responseJSON);
    expect(responseStatus).toEqual(200);
    expect(JSON.stringify(responseJSON)).toContain(teaName);
  }

  async getTeaByID(teaName: any) {
    const api = await request.newContext();
    const query = "{ teas { id, name} }";
    const data = {
      query: query,
    };

    this.logRequestAPI(URL, data);

    const response = await api.post(URL, { data });
    const responseStatus = response.status();
    const responseJSON = await response.json();

    this.logResponseAPI(responseStatus, responseJSON);

    const teaObj = responseJSON.data.teas.find((obj) => {
      return obj.name === teaName;
    });

    let teaID = teaObj["id"];

    expect(responseStatus).toEqual(200);
    expect(JSON.stringify(responseJSON)).toContain(teaName);

    return teaID.toString();
  }

  async deleteTea(teaId: any) {
    const api = await request.newContext();
    const query = `mutation { deleteTea(id: "${teaId}")}`;
    const data = {
      query: query,
    };

    this.logRequestAPI(URL, { data });
    const response = await api.post(URL, { data });
    const responseStatus = await response.status();
    const responseJSON = await response.json();

    this.logResponseAPI(responseStatus, responseJSON);

    expect(responseStatus).toEqual(200);
    expect(responseJSON.data.deleteTea).toBe(true);
  }

}

export async function assert(assertionName:any, expectedData: any, actualData: any) {
      let EXP = await expectedData.toString();
      let ACT = await actualData.toString();

      expect(EXP).toEqual(ACT);
      console.log(color.success(`\n$$$$$$$$$$  ASSERTION PASSED [${assertionName}]: response data contains [${actualData}] & equals [${expectedData}] $$$$$$$$$$`));
}
