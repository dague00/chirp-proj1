module.exports = {
  tables: [
    {
      TableName: "chirper_users",
      KeySchema: [{ AttributeName: "username", KeyType: "HASH" }],
      AttributeDefinitions: [
              { AttributeName: "username", AttributeType: "S" },
              // { AttributeName: "password", AttributeType: "S" },
              // { AttributeName: "bio", AttributeType: "S" },
              // { AttributeName: "following", AttributeType: "L" },
          ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
  ],
  basePort: 8000,
};