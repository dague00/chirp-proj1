import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import UsersDao from '../src/dao/UsersDao';
import {config_test, DEFAULT_JEST_TIMEOUT, testUser} from '../src/shared/constants';

jest.setTimeout(DEFAULT_JEST_TIMEOUT); 

const dao = new UsersDao();
const ddb = new DynamoDBClient(config_test);

it ('should enter then read items from the table', async () => {
  await dao.createUser(ddb, testUser);
  expect(await dao.getAllUsers(ddb))
    .toEqual([testUser]);
});

it ('should update the bio', async () => {
  await dao.createUser(ddb, testUser);
  await dao.updateUserBio(ddb, testUser.username, 'new bio');
  expect(await dao.getUser(ddb, testUser.username)).toMatchObject(testUser);
});

it ('delete the user', async() => {
  await dao.createUser(ddb, testUser);
  await dao.deleteUser(ddb, testUser.username);
  expect(await dao.getUser(ddb, testUser.username)).toBeUndefined();
});