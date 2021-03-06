import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import {
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand
} from '@aws-sdk/lib-dynamodb';
import { config } from 'dotenv';
import { formatScanResponse } from '../shared/functions';
import { config_test, isTest } from '../shared/constants';
config();

const USERS_TABLE = process.env.USERS_TABLE;

const ddb = !isTest ?  
  new DynamoDBClient( { region: process.env.AWS_DEFAULT_REGION } ) : 
  new DynamoDBClient( config_test );

// default usersDao class
export default class UsersDao {
  /**
   * gets all users using ScanCommand()
   * 
   * @param ddb 
   * @returns 
   */
  public async getAllUsers() {
    const params = { TableName: USERS_TABLE };

    try {
      const users = await ddb.send(new ScanCommand(params));
      return users.Items.map(formatScanResponse);
    } catch (err) {
      console.log('Error: ', err);
    }
  }
  /**
   * gets one user using GetCommand()
   * 
   * @param ddb 
   * @param username 
   * @returns 
   */
  public async getUser(username:string) {
    const params = {
      TableName: USERS_TABLE,
      Key: { username: username }
    };

    try {
      const user = await ddb.send(new GetCommand(params));
      return user.Item;
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  /**
   * creates a user using PutCommand()
   * 
   * @param ddb 
   * @param user 
   */
  public async createUser(user: {}) {
    const params = {
      TableName: USERS_TABLE,
      Item: user
    };

    try {
      await ddb.send(new PutCommand(params));
      console.log('User has been created.');
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  /**
   * updates a users bio using the UpdateCommand()
   * 
   * @param ddb 
   * @param username 
   * @param bio 
   */
  public async updateUserBio(username: string, bio: string) {
    const params = {
      TableName: USERS_TABLE,
      Key: { username: username },
      UpdateExpression: 'set bio = :bio',
      ExpressionAttributeValues: { ':bio': bio }
    };

    try {
      await ddb.send(new UpdateCommand(params));
      console.log('Bio updated.');
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  /**
   * deletes a user using the DeleteCommand()
   * 
   * @param ddb 
   * @param username 
   */
  public async deleteUser(username: string) {
    const params = {
      TableName: USERS_TABLE,
      Key: { username: username }
    };

    try {
      await ddb.send(new DeleteCommand(params));
      console.log('User deleted.');
    } catch (err) {
      console.log('Error: ', err);
    }
  }
}