import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import {
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand
 } from '@aws-sdk/lib-dynamodb';

// import { config } from 'dotenv';


// import * as DocumentClient from 'aws-sdk/clients/dynamodb';
// const {DocumentClient} = require('aws-sdk/clients/dynamodb');

// https://jestjs.io/docs/environment-variables
// JEST_WORKER_ID should be in your .env
// const isTest = process.env.JEST_WORKER_ID || 1;
// const config = {
//   convertEmptyValues: true,
//   ...(isTest && {
//     endpoint: 'localhost:8000',
//     sslEnabled: false,
//     region: 'local-env',
//   }),
// };

// const ddb = new DocumentClient(config);

const ddb = new DynamoDBClient({
//   convertEmptyValues: true,
//   endpoint: 'localhost:8000',
//   sslEnabled: false,
  region: 'local'
});

it('should insert item into table', async () => {
    console.log('I am about to PUT to the table');
    await ddb
      .send(new PutCommand({
          TableName: 'chirper_users',
          Item: {
              username: 'wallhackio',
              password: '1234',
              following: [],
              bio: 'I like to hack through walls'
          },
      }))
    // .promise();
  
  console.log('I am about to GET from table');
  const {Item} = await ddb
      .send(new GetCommand({
          TableName: 'chirper_users',
          Key: {
              username: 'wallhackio'}
          }))
    //   .promise();

  expect(Item).toEqual({
      username: 'wallhackio',
      password: '1234',
      following: [],
      bio: 'I like to hack through walls'
  });
});