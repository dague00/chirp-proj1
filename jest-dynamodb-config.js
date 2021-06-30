module.exports = {
    tables: [
      {
        TableName: `chirper_users`,
        KeySchema: [{AttributeName: 'username', KeyType: 'HASH'}],
        AttributeDefinitions: [
                                {AttributeName: 'username', AttributeType: 'S'},
                                {AttributeName: 'password', AttributeType: 'S'},
                                {AttributeName: 'following', AttributeType: 'SS'},
                                {AttributeName: 'bio', AttributeType: 'S'}
                              ],
        ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
      },
      {
      TableName: `chirper_chirps`,
        KeySchema: [{AttributeName: 'timestamp', KeyType: 'HASH'}],
        AttributeDefinitions: [
                                {AttributeName: 'body', AttributeType: 'S'},
                                {AttributeName: 'username', AttributeType: 'S'},
                                {AttributeName: 'timestamp', AttributeType: 'S'}
                              ],
        ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
       }
    ],
    port: 8000,
    options: ['-sharedDb']
  };