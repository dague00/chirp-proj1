import { Request, Response } from 'express';
import UsersDao from '../dao/UsersDao';
// import bcrypt from 'bcrypt';

const userDao = new UsersDao();

// Create user controller
export const createOneUser = async (req: Request, res: Response) => {
  let user = req.body;
  // const salt = 10;

  res.status(200).json(await userDao.createUser(user));
  // .then(
    // bcrypt.hash(req.body.password, salt, async function(err, hash) {

    //   res.status(200).json(await userDao.updateUserPassword(req.body.username, hash));
    //   if (err) { console.log("Error: ", err) }
    // })));

}

// Get user controller
export async function getUser(req: Request, res: Response) {
  const username = req.params.username;
  return res.status(200).json(await userDao.getUser(username));
}

// Edit user bio controller
export const editUserBio = async (req: Request, res: Response) => {
  let username = req.params.username;
  let bio = req.body.bio;

  res.status(200).json(await userDao.updateUserBio(username, bio));
};

// change user password controller
// export const editUserPassword = async (req: Request, res: Response) => {
//   let { username } = req.params;
//   let { password } = req.body;
//   let salt = 10;

//   bcrypt.hash(password, salt, async function(err, hash) {
//     res.status(200).json(await userDao.updateUserPassword(username, hash));
//     if (err) { console.log("Error: ", err); }
// });

 
// };

// Delete user controller
export const deleteUser = async (req: Request, res: Response) => {
  let username = req.params.username;
  res.status(200).json(await userDao.deleteUser(username));
};

// Get all users controller
export const getAllUsers = async (req: Request, res: Response) => {
  return res.status(200).json(await userDao.getAllUsers());
};
