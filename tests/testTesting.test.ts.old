import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import {
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand
 } from '@aws-sdk/lib-dynamodb';

const DEFAULT_JEST_TIMEOUT = 5000; //milliseconds
jest.setTimeout(1*DEFAULT_JEST_TIMEOUT); 

const ddb = new DynamoDBClient({
  // ...yourConfig,
  ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: "local",
  }),
});

it('should insert item into table', async () => {
  const wallhackioObj = {
      username: 'wallhackio',
      password: '1234',
      following: [],
      bio: 'I like to hack through walls'
  }
  
  await ddb
  .send(new PutCommand({
  // .put({
      TableName: 'chirper_users',
      Item: wallhackioObj,
  })
  );
  // .promise();

  const {Item} = await ddb
  .send(new GetCommand({
  // .get({
      TableName: 'chirper_users',
      Key: {username: 'wallhackio'},
  })
  );
  // .promise();

expect(Item).toEqual(wallhackioObj);
});

ddb.destroy();