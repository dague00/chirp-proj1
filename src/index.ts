import express from 'express';
import cors from 'cors';
import { isTest } from './shared/constants';

import {
  getChirps,
  getUserChirps,
  getAChirp,
  PostOneChirp,
  updateChirp,
  deleteOneChirp
} from './controllers/chirpControllers';
import {
  getAllUsers,
  getUser,
  createOneUser,
  editUserBio,
  deleteUser
} from './controllers/userControllers';

const PORT = 3000;
export const APP = express();
APP.use(cors());

/** Set up Express Router */
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));
APP.use(cors());

/** Set up Users Endpoint */
APP.get('/user/all', getAllUsers);
APP.get('/user/:username', getUser);
APP.post('/user', createOneUser);
APP.put('/user/:username/bio', editUserBio);
APP.delete('/user/:username', deleteUser);

/** Set up Chirps Endpoint */
APP.get('/chirp/all', getChirps);
APP.get('/:username', getUserChirps);
APP.get('/chirp/:timestamp', getAChirp);
APP.post('/chirp', PostOneChirp);
APP.put('/chirp/:timestamp', updateChirp);
APP.delete('/chirp/:timestamp', deleteOneChirp);

/** Begin Listening for Requests */
if (!isTest){
  APP.listen(PORT, () => {
    console.log('Hi! We are up and listening on port: ', PORT);
  });
}
else {
  let message = 'In testing mode!\nIf this was an accident, ';
  message += 'find out why isTest in src/shared/constants.ts was set to true!'
  console.log(message);
}
