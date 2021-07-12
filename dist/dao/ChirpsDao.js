"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import dynamodb & dotenv, calls dotenv config
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const dotenv_1 = require("dotenv");
const functions_1 = require("../shared/functions");
const constants_1 = require("../shared/constants");
dotenv_1.config();
const CHIRPS_TABLE = process.env.CHIRPS_TABLE;
const ddb = !constants_1.isTest ?
    new client_dynamodb_1.DynamoDBClient({ region: process.env.AWS_DEFAULT_REGION }) :
    new client_dynamodb_1.DynamoDBClient(constants_1.config_test);
class ChirpsDao {
    /**
     *gets all chirps using ScanCommand()
     *
     * @param ddb
     * @returns
     */
    getAllChirps() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = { TableName: CHIRPS_TABLE };
            try {
                const chirps = yield ddb.send(new client_dynamodb_1.ScanCommand(params));
                return chirps.Items.map(functions_1.formatScanResponse);
            }
            catch (err) {
                console.log("Error: ", err);
            }
        });
    }
    /**
     * gets all chirps by one user using QueryCommand()
     *
     * @param ddb
     * @param username
     * @returns
     */
    getChirpsByUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: CHIRPS_TABLE,
                IndexName: "username-index",
                Key: { "username": username },
                ExpressionAttributeValues: { ":username": username },
                KeyConditionExpression: "username = :username"
            };
            try {
                const chirps = yield ddb.send(new lib_dynamodb_1.QueryCommand(params));
                return chirps.Items.map(functions_1.formatScanResponse);
            }
            catch (err) {
                console.log("Error: ", err);
            }
        });
    }
    /**
     * gets one chirp using GetCommand()
     *
     * @param ddb
     * @param timestamp
     * @returns
     */
    getChirp(timestamp) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: CHIRPS_TABLE,
                Key: { "timestamp": timestamp },
            };
            try {
                const chirp = yield ddb.send(new lib_dynamodb_1.GetCommand(params));
                return chirp.Item;
            }
            catch (err) {
                console.log("Error: ", err);
            }
        });
    }
    /**
     * creates a new chirp using PutCommand()
     *
     * @param ddb
     * @param chirp
     */
    postChirp(chirp) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: CHIRPS_TABLE,
                Item: chirp,
            };
            try {
                yield ddb.send(new lib_dynamodb_1.PutCommand(params));
                console.log("Chirp has been posted.");
            }
            catch (err) {
                console.log("Error: ", err);
            }
        });
    }
    /**
     * updates a chirp's body using UpdateCommand()
     *
     * @param timestamp
     * @param chirpBody
     */
    editChirp(timestamp, chirpBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: CHIRPS_TABLE,
                Key: { "timestamp": timestamp },
                UpdateExpression: "set body = :body",
                ExpressionAttributeValues: { ":body": chirpBody }
            };
            try {
                yield ddb.send(new lib_dynamodb_1.UpdateCommand(params));
                console.log("Chirp updated.");
            }
            catch (err) {
                console.log("Error: ", err);
            }
        });
    }
    /**
     * deletes a user using the DeleteCommand()
     *
     * @param timestamp
     */
    deleteChirp(timestamp) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: CHIRPS_TABLE,
                Key: { "timestamp": timestamp },
            };
            try {
                yield ddb.send(new lib_dynamodb_1.DeleteCommand(params));
                console.log("Chirp deleted.");
            }
            catch (err) {
                console.log("Error: ", err);
            }
        });
    }
}
exports.default = ChirpsDao;
