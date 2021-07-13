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
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const dotenv_1 = require("dotenv");
const functions_1 = require("../shared/functions");
const constants_1 = require("../shared/constants");
dotenv_1.config();
const USERS_TABLE = process.env.USERS_TABLE;
const ddb = !constants_1.isTest ?
    new client_dynamodb_1.DynamoDBClient({ region: process.env.AWS_DEFAULT_REGION }) :
    new client_dynamodb_1.DynamoDBClient(constants_1.config_test);
// default usersDao class
class UsersDao {
    /**
     * gets all users using ScanCommand()
     *
     * @param ddb
     * @returns
     */
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = { TableName: USERS_TABLE };
            try {
                const users = yield ddb.send(new client_dynamodb_1.ScanCommand(params));
                return users.Items.map(functions_1.formatScanResponse);
            }
            catch (err) {
                console.log('Error: ', err);
            }
        });
    }
    /**
     * gets one user using GetCommand()
     *
     * @param ddb
     * @param username
     * @returns
     */
    getUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: USERS_TABLE,
                Key: { username: username }
            };
            try {
                const user = yield ddb.send(new lib_dynamodb_1.GetCommand(params));
                return user.Item;
            }
            catch (err) {
                console.log('Error: ', err);
            }
        });
    }
    /**
     * creates a user using PutCommand()
     *
     * @param ddb
     * @param user
     */
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: USERS_TABLE,
                Item: user
            };
            try {
                yield ddb.send(new lib_dynamodb_1.PutCommand(params));
                console.log('User has been created.');
            }
            catch (err) {
                console.log('Error: ', err);
            }
        });
    }
    /**
     * updates a users bio using the UpdateCommand()
     *
     * @param ddb
     * @param username
     * @param bio
     */
    updateUserBio(username, bio) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: USERS_TABLE,
                Key: { username: username },
                UpdateExpression: 'set bio = :bio',
                ExpressionAttributeValues: { ':bio': bio }
            };
            try {
                yield ddb.send(new lib_dynamodb_1.UpdateCommand(params));
                console.log('Bio updated.');
            }
            catch (err) {
                console.log('Error: ', err);
            }
        });
    }
    /**
     * deletes a user using the DeleteCommand()
     *
     * @param ddb
     * @param username
     */
    deleteUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: USERS_TABLE,
                Key: { username: username }
            };
            try {
                yield ddb.send(new lib_dynamodb_1.DeleteCommand(params));
                console.log('User deleted.');
            }
            catch (err) {
                console.log('Error: ', err);
            }
        });
    }
}
exports.default = UsersDao;
