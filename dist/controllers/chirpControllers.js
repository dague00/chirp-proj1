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
exports.getChirps = exports.deleteOneChirp = exports.updateChirp = exports.getUserChirps = exports.getAChirp = exports.PostOneChirp = void 0;
const ChirpsDao_1 = __importDefault(require("../dao/ChirpsDao"));
const chirpDao = new ChirpsDao_1.default();
// Post chirp controller
const PostOneChirp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { chirp } = req.params;
    res.status(200).json(yield chirpDao.postChirp(chirp));
});
exports.PostOneChirp = PostOneChirp;
// Get a chirp controller
function getAChirp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const timestamp = req.params.timestamp;
        return res.status(200).json(yield chirpDao.getChirp(timestamp));
    });
}
exports.getAChirp = getAChirp;
// Get user Chirps controller
function getUserChirps(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.params.username;
        return res.status(200).json(yield chirpDao.getChirpsByUser(username));
    });
}
exports.getUserChirps = getUserChirps;
// Edit chirp controller
const updateChirp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let chirp = req.params.chirp;
    let chirpBody = req.body.chirpBody;
    res.status(200).json(yield chirpDao.editChirp(chirp, chirpBody));
});
exports.updateChirp = updateChirp;
// Delete chirp controller
const deleteOneChirp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let chirp = req.params.chirp;
    res.status(200).json(yield chirpDao.deleteChirp(chirp));
});
exports.deleteOneChirp = deleteOneChirp;
// Get all chirps controller
const getChirps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json(yield chirpDao.getAllChirps());
});
exports.getChirps = getChirps;
