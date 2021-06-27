// import dynamodb & dotenv
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { config } from 'dotenv';
config();

// creates a new dynamodb client
const client = new DynamoDBClient({ region: "us-east-2" });
const USERS_TABLE = process.env.USERS_TABLE;

// default usersDao class
export default class UsersDao{

    // gets all users
    public async getUsers(){
        const params = {
            TableName: USERS_TABLE
        }

        const users = await client.send(new ScanCommand(params));
        return Promise.resolve(users.Items);
    }

    // gets one user
    public async getOneUser(username){
        const params = {
            TableName: USERS_TABLE,
            Key: {"username": username},
        }

        const user = await client.send(new GetCommand(params));
        return Promise.resolve(user.Item);
    }

    // creates a user
    public async createUser(user){
        const params = {
            TableName: USERS_TABLE,
            Item: user
        }

        try {
         await client.send(new PutCommand(params));
            console.log("Success");
        } catch (err) {
            console.log("Error: " + err);
        }
    }
}

// TESTING STUFF ONLY - DELETE AFTER

// async function test(){
//     const dao = new UsersDao();
//     const get = await dao.createUser(
//         {
//             "username":"redoral",
//             "password":"no",
//             "bio":"not cool like johnnytest",
//             "following":["johnnytest", "johnnytestfan12"]
//         }
//     );
// }

async function test(){
    const dao = new UsersDao();
    const get = await dao.getOneUser("redoral");
    console.log(JSON.stringify(get));
}

test();

