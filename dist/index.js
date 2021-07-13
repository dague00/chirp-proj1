"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("./shared/constants");
const chirpControllers_1 = require("./controllers/chirpControllers");
const userControllers_1 = require("./controllers/userControllers");
const PORT = 3000;
exports.APP = express_1.default();
/** Set up Express Router */
exports.APP.use(express_1.default.json());
exports.APP.use(express_1.default.urlencoded({ extended: true }));
exports.APP.use(cors_1.default());
/** Set up Users Endpoint */
exports.APP.get('/user/all', userControllers_1.getAllUsers);
exports.APP.get('/user/:username', userControllers_1.getUser);
exports.APP.post('/user', userControllers_1.createOneUser);
exports.APP.put('/user/:username/bio', userControllers_1.editUserBio);
exports.APP.delete('/user/:username', userControllers_1.deleteUser);
/** Set up Chirps Endpoint */
exports.APP.get('/chirp/all', chirpControllers_1.getChirps);
exports.APP.get('/:username', chirpControllers_1.getUserChirps);
exports.APP.get('/chirp/:timestamp', chirpControllers_1.getAChirp);
exports.APP.post('/chirp', chirpControllers_1.PostOneChirp);
exports.APP.put('/chirp/:timestamp', chirpControllers_1.updateChirp);
exports.APP.delete('/chirp/:timestamp', chirpControllers_1.deleteOneChirp);
/** Begin Listening for Requests */
if (!constants_1.isTest) {
    exports.APP.listen(PORT, () => {
        console.log('Hi! We are up and listening on port: ', PORT);
    });
}
else {
    let message = 'In testing mode!\nIf this was an accident, ';
    message += 'find out why isTest in src/shared/constants.ts was set to true!';
    console.log(message);
}
