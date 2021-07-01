// import dynamodb, dotenv, & bcrypt, calls dotenv config
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import {
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand
} from '@aws-sdk/lib-dynamodb';
import { config } from 'dotenv';
config();

// const config_test = {
//   convertEmptyValues: true,
//   ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
//     endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
//     sslEnabled: false,
//     region: "local",
//   }),
// };


// creates a new dynamodb client, defines users table
const client = new DynamoDBClient({ region: process.env.AWS_DEFAULT_REGION });
// const client = new DynamoDBClient(config_test);
const USERS_TABLE = process.env.USERS_TABLE;

// default usersDao class
export default class UsersDao {
  // gets all users using ScanCommand()
  public async getAllUsers() {
    const params = { TableName: USERS_TABLE };

    try {
      const users = await client.send(new ScanCommand(params));
      return users.Items;
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  // gets one user using GetCommand()
  public async getUser(username: string) {
    const params = {
      TableName: USERS_TABLE,
      Key: { username: username }
    };

    try {
      const user = await client.send(new GetCommand(params));
      return user.Item;
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  // creates a user using PutCommand()
  public async createUser(user: {}) {
    const params = {
      TableName: USERS_TABLE,
      Item: user
    };

    try {
      await client.send(new PutCommand(params));
      console.log('User has been created.');
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  // updates a users bio using the UpdateCommand()
  public async updateUserBio(username: string, bio: string) {
    const params = {
      TableName: USERS_TABLE,
      Key: { username: username },
      UpdateExpression: 'set bio = :bio',
      ExpressionAttributeValues: { ':bio': bio }
    };

    try {
      await client.send(new UpdateCommand(params));
      console.log('Bio updated.');
    } catch (err) {
      console.log('Error: ', err);
    }
  }
  // deletes a user using the DeleteCommand()
  public async deleteUser(username: string) {
    const params = {
      TableName: USERS_TABLE,
      Key: { username: username }
    };

    try {
      await client.send(new DeleteCommand(params));
      console.log('User deleted.');
    } catch (err) {
      console.log('Error: ', err);
    }
  }
}