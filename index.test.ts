// import * as DocumentClient from 'aws-sdk/clients/dynamodb';
const {DocumentClient} = require('aws-sdk/clients/dynamodb');

// https://jestjs.io/docs/environment-variables
const isTest = process.env.JEST_WORKER_ID || 1;
const config = {
  convertEmptyValues: true,
  ...(isTest && {
    endpoint: 'localhost:8000',
    sslEnabled: false,
    region: 'local-env',
  }),
};

const ddb = new DocumentClient(config);