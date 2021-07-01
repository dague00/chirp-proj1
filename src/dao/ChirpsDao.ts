// import dynamodb & dotenv, calls dotenv config
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { PutCommand, GetCommand, QueryCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { config } from 'dotenv';
config();

// const config_test = {
//     convertEmptyValues: true,
//     ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
//       endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
//       sslEnabled: false,
//       region: "local",
//     }),
//   };

// creates a new dynamodb client, defines users table
const client = new DynamoDBClient({ region: process.env.AWS_DEFAULT_REGION });
// const client = new DynamoDBClient(config_test);
const CHIRPS_TABLE = process.env.CHIRPS_TABLE;

export default class ChripsDao{
    // gets all chirps using ScanCommand()
    public async getAllChirps(){
        const params = { TableName: CHIRPS_TABLE }
        
        try{
            const chirps = await client.send(new ScanCommand(params));
            return chirps.Items;
        } catch(err) {
            console.log("Error: ", err);
        }
    }

    // gets all chirps by one user using QueryCommand()
    public async getChirpsByUser(username:string){
        const params = {
            TableName: CHIRPS_TABLE,
            IndexName: "username-index",
            Key: { "username": username },
            ExpressionAttributeValues: {":username": username },
            KeyConditionExpression: "username = :username"
        }

        try {
            const chirps = await client.send(new QueryCommand(params));
            return chirps.Items;
        } catch (err){
            console.log("Error: ", err);
        }
    }

     // gets one chirp using GetCommand()
     public async getChirp(timestamp:string){
        const params = {
            TableName: CHIRPS_TABLE,
            Key: { "timestamp": timestamp },
        }

        try{
        const chirp = await client.send(new GetCommand(params));
        return chirp.Item;
        } catch (err){
            console.log("Error: ", err)
        }
    }

    // creates a new chirp using PutCommand()
    public async postChirp(chirp: {}){
        const params = {
            TableName: CHIRPS_TABLE,
            Item: chirp,  
        }

        try {
            await client.send(new PutCommand(params));
            console.log("Chirp has been posted.");
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    // updates a chirp's body using UpdateCommand()
    public async editChirp(timestamp:string, chirpBody: string){
        const params = {
            TableName: CHIRPS_TABLE,
            Key: { "timestamp": timestamp },
            UpdateExpression: "set body = :body",
            ExpressionAttributeValues: { ":body": chirpBody }
        }

        try {
         await client.send(new UpdateCommand(params));
            console.log("Chirp updated.");
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    // deletes a user using the DeleteCommand()
    public async deleteChirp(timestamp: string){
        const params = {
            TableName: CHIRPS_TABLE,
            Key: { "timestamp": timestamp },
        }

        try {
            await client.send(new DeleteCommand(params));
            console.log("Chirp deleted.");
        } catch (err){
            console.log("Error: ", err)
        }
    }
}