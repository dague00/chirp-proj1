"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("./controllers/userControllers");
const PORT = 3000;
const APP = express_1.default();
/** Set up Express Router */
APP.use(express_1.default.json());
APP.use(express_1.default.urlencoded({ extended: true }));
//edit functions to be calls only
/** Set up Users Endpoint */
APP.get('/user/all', userControllers_1.getAllUsers);
APP.get('/user/:username', userControllers_1.getUser);
APP.post('/user/:username', userControllers_1.createOneUser);
APP.put('/user/:username/bio', userControllers_1.editUserBio);
APP.put('/user/:username/password', userControllers_1.editUserPassword);
APP.delete('/user/:username', userControllers_1.deleteUser);
/** Set up Chirps Endpoint */
// APP.get('/chirp/all', (req: Request, res: Response) => {
//   res.send('This is where I would send you all my chirps...If I had any!');
// });
// APP.get('/chirp/:username', (req: Request, res: Response) => {
//   res.send(
//     'This is where I would send you all the chirps from this user...If I had any!'
//   );
// });
// APP.post('/chirp', (req: Request, res: Response) => {
//   res.send('Your request to add a new chirp has been received and ignored.');
// });
// APP.put('/chirp/:timestamp', (req: Request, res: Response) => {
//   res.send('Your request to edit a chirp has been received and ignored.');
// });
// APP.delete('/chirp/:timestamp', (req: Request, res: Response) => {
//   res.send('Your request to delete a chirp has been received and ignored.');
// });
/** Begin Listening for Requests */
APP.listen(PORT, () => {
    console.log('Hi! We are up and listening on port: ', PORT);
});
