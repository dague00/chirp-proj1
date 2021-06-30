// import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
// import {
//   PutCommand,
//   GetCommand,
//   UpdateCommand,
//   DeleteCommand
//  } from '@aws-sdk/lib-dynamodb';

// import { config } from 'dotenv';

// import * as DocumentClient from 'aws-sdk/clients/dynamodb';
const {DocumentClient} = require('aws-sdk/clients/dynamodb');

const AWS = require('aws-sdk');
AWS.config.update({
    region: 'local',
    accessKeyId: 'access-key',
    secretAccessKey: 'secret-access-key',
    endpoint: 'http://localhost:8000'
  });
  
//for some reason our tests can last up to 70s
const DEFAULT_JEST_TIMEOUT = 5000; //milliseconds
jest.setTimeout(100*DEFAULT_JEST_TIMEOUT); 

// https://jestjs.io/docs/environment-variables
const ddb = new DocumentClient({
        convertEmptyValues: true,
        ...( process.env.JEST_WORKER_ID && {
                endpoint: 'http://localhost:8000',
                sslEnabled: false,
                region: 'local',
            })
    }
);

// const ddb = new DynamoDBClient({
//     convertEmptyValues: true,
//     endpoint: 'localhost:8000',
//     sslEnabled: false,
//     region: 'local',
//     credentials: {
//         accessKeyId: 'access-key',
//         secretAccessKey: 'secret-key',
//     }
// });


it('should insert item into table', async () => {
    const wallhackioObj = {
        username: 'wallhackio',
        password: '1234',
        following: [],
        bio: 'I like to hack through walls'
    }
    
    await ddb
    //.send(new PutCommand({
    .put({
        TableName: 'chirper_users',
        Item: wallhackioObj,
    })
    //)
    .promise();
  
    const {Item} = await ddb
    //.send(new GetCommand({
    .get({
        TableName: 'chirper_users',
        Key: {username: 'wallhackio'},
    })
    //)
    .promise();

  expect(Item).toEqual(wallhackioObj);
});