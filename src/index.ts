import express from 'express';
import{
  getChirps,
  getUserChirps,
  getAChirp,
  PostOneChirp,
  updateChirp,
  deleteOneChirp
} from './controllers/chirpControllers';
import{
  getAllUsers,
  getUser,
  createOneUser,
  editUserBio,
  editUserPassword,
  deleteUser
} from './controllers/userControllers';

const PORT = 3000;
const APP = express();

/** Set up Express Router */
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));

//edit functions to be calls only

/** Set up Users Endpoint */
APP.get('/user/all', getAllUsers);
APP.get('/user/:username', getUser);
APP.post('/user', createOneUser);
APP.put('/user/:username/bio', editUserBio);
APP.put('/user/:username/password', editUserPassword);
APP.delete('/user/:username', deleteUser);

/** Set up Chirps Endpoint */
APP.get('/chirp/all', getChirps);
APP.get('/chirp/:username', getUserChirps);
APP.get('/chirp/:timestamp', getAChirp);
APP.post('/chirp', PostOneChirp);
APP.put('/chirp/:timestamp', updateChirp);
APP.delete('/chirp/:timestamp', deleteOneChirp);

/** Begin Listening for Requests */
APP.listen(PORT, () => {
  console.log('Hi! We are up and listening on port: ', PORT);
});
