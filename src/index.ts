import express, { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';

const PORT = 3000;
const APP = express();

/** Set up Express Router */
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));

//edit functions to be calls only

/** Set up Users Endpoint */
APP.get('/user/all', getAllUsers);
APP.get('/user/:username', getUser);
APP.post('/user/:username', createOneUser);
APP.put('/user/:username/bio', editUserBio);
APP.put('/user/:username/password', editUserPassword);
APP.delete('/user/:username', deleteUser);

/** Set up Chirps Endpoint */
APP.get('/chirp/all', (req: Request, res: Response) => {
  res.send('This is where I would send you all my chirps...If I had any!');
});
APP.get('/chirp/:username', (req: Request, res: Response) => {
  res.send('This is where I would send you all the chirps from this user...If I had any!');
});
APP.post('/chirp', (req: Request, res: Response) => {
  res.send('Your request to add a new chirp has been received and ignored.');
});
APP.put('/chirp/:timestamp', (req: Request, res: Response) => {
  res.send('Your request to edit a chirp has been received and ignored.');
});
APP.delete('/chirp/:timestamp', (req: Request, res: Response) => {
  res.send('Your request to delete a chirp has been received and ignored.');
});

/** Begin Listening for Requests */
APP.listen(PORT, () => {
  console.log('Hi! We are up and listening on port: ', PORT);
});