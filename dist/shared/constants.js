"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanResponse_testChirp = exports.testChirp = exports.scanResponse_testUser_noFollowers = exports.testUser_noFollowers = exports.scanResponse_testUser = exports.testUser = exports.config_test = exports.DEFAULT_JEST_TIMEOUT = exports.emptyArr = exports.emptyObj = exports.isTest = void 0;
exports.isTest = process.env.NODE_ENV === 'test';
exports.emptyObj = {};
exports.emptyArr = [];
exports.DEFAULT_JEST_TIMEOUT = 5000; //milliseconds
exports.config_test = Object.assign({ convertEmptyValues: true }, (process.env.MOCK_DYNAMODB_ENDPOINT && {
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: "local",
}));
exports.testUser = {
    username: "testUsername",
    password: "testPassword",
    following: [
        "username1",
        "username2"
    ],
    bio: "testBio"
};
exports.scanResponse_testUser = {
    username: { S: "testUsername" },
    password: { S: "testPassword" },
    following: { L: [
            { S: "username1" },
            { S: "username2" }
        ] },
    bio: { S: "testBio" }
};
exports.testUser_noFollowers = {
    username: "testUsername",
    password: "testPassword",
    following: [],
    bio: "testBio"
};
exports.scanResponse_testUser_noFollowers = {
    username: { S: "testUsername" },
    password: { S: "testPassword" },
    following: { L: [] },
    bio: { S: "testBio" }
};
exports.testChirp = {
    username: "testUsername",
    chirp: "testChirp",
    timestamp: "1234567890"
};
exports.scanResponse_testChirp = {
    username: { S: "testUsername" },
    chirp: { S: "testChirp" },
    timestamp: { S: "1234567890" }
};
