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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.deleteUser = exports.editUserBio = exports.getUser = exports.createOneUser = void 0;
const UsersDao_1 = __importDefault(require("../dao/UsersDao"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
const userDao = new UsersDao_1.default();
/**
 * Create user controller
 *
 * @param req
 * @param res
 */
const createOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = req.body;
    res.status(200).json(yield userDao.createUser(user));
});
exports.createOneUser = createOneUser;
/**
 * Get user controller
 *
 * @param req
 * @param res
 * @returns
 */
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let username = req.params.username;
    return res.status(200).json(yield userDao.getUser(username));
});
exports.getUser = getUser;
/**
 * Edit user bio controller
 *
 * @param req
 * @param res
 */
const editUserBio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let username = req.params.username;
    let bio = req.body.bio;
    res.status(200).json(yield userDao.updateUserBio(username, bio));
});
exports.editUserBio = editUserBio;
/**
 * Delete user controller
 *
 * @param req
 * @param res
 */
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let username = req.params.username;
    res.status(200).json(yield userDao.deleteUser(username));
});
exports.deleteUser = deleteUser;
/**
 * Get all users controller
 *
 * @param req
 * @param res
 * @returns
 */
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json(yield userDao.getAllUsers());
});
exports.getAllUsers = getAllUsers;
