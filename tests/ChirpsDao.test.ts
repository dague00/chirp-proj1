import ChirpsDao from '../src/dao/ChirpsDao';
import { DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {DEFAULT_JEST_TIMEOUT, config_test, testChirp } from '../src/shared/constants';

jest.setTimeout(DEFAULT_JEST_TIMEOUT); 

const dao = new ChirpsDao;
const ddb = new DynamoDBClient(config_test);

it ('should enter then read items from the table', async () => {
  await dao.postChirp(ddb, testChirp);
  expect(await dao.getAllChirps(ddb))
    .toEqual([testChirp]);
});

it ('should enter then read items from the table by user', async () => {
  await dao.postChirp(ddb, testChirp);
  expect(await dao.getChirpsByUser(ddb, testChirp.username))
    .toEqual([ testChirp ]);
});

it ('should update the chirp', async () => {
  await dao.postChirp(ddb, testChirp);
  await dao.editChirp(ddb, testChirp.timestamp, "newChirp");
  expect(await dao.getChirp(ddb, testChirp.timestamp))
    .toMatchObject(testChirp);
});

it ('should delete the chirp', async() => {
  await dao.postChirp(ddb, testChirp)
  await dao.deleteChirp(ddb, testChirp.timestamp);
  expect(await dao.getChirp(ddb, testChirp.timestamp)).toBeUndefined();
});