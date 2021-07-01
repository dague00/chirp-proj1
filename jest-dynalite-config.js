module.exports = {
  tables: [
    {
      TableName: "chirper_users",
      KeySchema: [{ AttributeName: "username", KeyType: "HASH" }],
      AttributeDefinitions: [
              { AttributeName: "username", AttributeType: "S" }
          ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
    {
      TableName: "chirper_chirps",
      KeySchema: [{ AttributeName: "timestamp", KeyType: "HASH" }],
      AttributeDefinitions: [
              { AttributeName: "timestamp", AttributeType: "S" },
              { AttributeName: "username", AttributeType: "S" }
            ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "username-index",
          KeySchema: [
            {
              AttributeName: "username",
              KeyType: "HASH"
            }
          ],
          Projection: {
            ProjectionType: "ALL"
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    }
  ],

  basePort: 8000,
};