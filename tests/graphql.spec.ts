
import {test} from '../fixtures/env_name.ts';

import { faker } from '@faker-js/faker'

import { GrapQLService } from "../helperMethods/api.helper.ts";

const newTea = faker.random.word();
const teaPrice = faker.finance.amount();
let teaID: string;

test.describe.serial('GRAPHQL DEMO', async () => {

    const graphQlService = new GrapQLService();

    test(`should list all teas`, async () => {
        await graphQlService.getAllTeas();
    });

    test(`should add new tea`, async () => {
        await graphQlService.addNewTea(newTea, teaPrice);
    });
    
    test(`should get new tea by name`, async () => {
        await graphQlService.getTeaByName(newTea);
    });
    
    test('should verify that new tea is in the list of all teas', async () => {
        teaID = await graphQlService.getTeaByID(newTea);
        console.log("\nNew tea ID:", teaID);
    });
    
    test('should delete newly added tea', async () => {
        await graphQlService.deleteTea(teaID);
    });

});
