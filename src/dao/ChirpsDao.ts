// import dynamodb & dotenv, calls dotenv config
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { PutCommand, GetCommand, QueryCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { config } from 'dotenv';
import { formatScanResponse } from '../shared/functions';
import { config_test, isTest } from '../shared/constants';
config();

const CHIRPS_TABLE = process.env.CHIRPS_TABLE;
const ddb = !isTest ? 
    new DynamoDBClient( { region: process.env.AWS_DEFAULT_REGION } ) :
    new DynamoDBClient( config_test );

export default class ChirpsDao{
    /**
     *gets all chirps using ScanCommand()
     * 
     * @param ddb 
     * @returns 
     */
    public async getAllChirps(){
        const params = { TableName: CHIRPS_TABLE }
        
        try{
            const chirps = await ddb.send(new ScanCommand(params));
            return chirps.Items.map(formatScanResponse);
        } catch(err) {
            console.log("Error: ", err);
        }
    }

    
    /**
     * gets all chirps by one user using QueryCommand()
     * 
     * @param ddb 
     * @param username 
     * @returns 
     */
    public async getChirpsByUser(username:string){
        const params = {
            TableName: CHIRPS_TABLE,
            IndexName: "username-index",
            Key: { "username": username },
            ExpressionAttributeValues: {":username": username },
            KeyConditionExpression: "username = :username"
        }

        try {
            const chirps = await ddb.send(new QueryCommand(params));
            return chirps.Items.map(formatScanResponse);
        } catch (err){
            console.log("Error: ", err);
        }
    }


     /**
      * gets one chirp using GetCommand()
      * 
      * @param ddb 
      * @param timestamp 
      * @returns 
      */
     public async getChirp(timestamp:string){
        const params = {
            TableName: CHIRPS_TABLE,
            Key: { "timestamp": timestamp },
        }

        try{
        const chirp = await ddb.send(new GetCommand(params));
        return chirp.Item;
        } catch (err){
            console.log("Error: ", err)
        }
    }

    /**
     * creates a new chirp using PutCommand()
     * 
     * @param ddb 
     * @param chirp 
     */
    public async postChirp(chirp: {}){
        const params = {
            TableName: CHIRPS_TABLE,
            Item: chirp,  
        }

        try {
            await ddb.send(new PutCommand(params));
            console.log("Chirp has been posted.");
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    /**
     * updates a chirp's body using UpdateCommand()
     * 
     * @param timestamp 
     * @param chirpBody 
     */
    public async editChirp(timestamp:string, chirpBody: string){
        const params = {
            TableName: CHIRPS_TABLE,
            Key: { "timestamp": timestamp },
            UpdateExpression: "set body = :body",
            ExpressionAttributeValues: { ":body": chirpBody }
        }

        try {
         await ddb.send(new UpdateCommand(params));
            console.log("Chirp updated.");
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    /**
     * deletes a user using the DeleteCommand()
     * 
     * @param timestamp 
     */
    public async deleteChirp(timestamp: string){
        const params = {
            TableName: CHIRPS_TABLE,
            Key: { "timestamp": timestamp },
        }

        try {
            await ddb.send(new DeleteCommand(params));
            console.log("Chirp deleted.");
        } catch (err){
            console.log("Error: ", err)
        }
    }
}