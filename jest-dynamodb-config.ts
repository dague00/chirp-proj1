module.exports = {
    tables: [
      {
        TableName: `chirpper_users`,
        KeySchema: [{AttributeName: 'id', KeyType: 'HASH'}],
        AttributeDefinitions: [
                                {AttributeName: 'username', AttributeType: 'S'},
                                {AttributeName: 'password', AttributeType: 'S'},
                                {AttributeName: 'following', AttributeType: 'S'},
                                {AttributeName: 'bio', AttributeType: 'S'}
                              ],
        ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
      },
      {
      TableName: `chirpper_chirps`,
        KeySchema: [{AttributeName: 'timestamp', KeyType: 'HASH'}],
        AttributeDefinitions: [
                                {AttributeName: 'body', AttributeType: 'S'},
                                {AttributeName: 'username', AttributeType: 'S'},
                                {AttributeName: 'timestamp', AttributeType: 'S'}
                              ],
        ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
       }
    ],
  };