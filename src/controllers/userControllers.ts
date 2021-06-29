import { Request, Response } from 'express';
import UsersDao from '../dao/UsersDao';

const userDao = new UsersDao();

// Create user controller
export const createOneUser = async (req: Request, res: Response) => {
  let user = req.body;
  res.status(200).json(await userDao.createUser(user));
};

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
export const editUserPassword = async (req: Request, res: Response) => {
  let { username } = req.params;
  let { password } = req.body;
  res.status(200).json(await userDao.updateUserPassword(username, password));
};

// Delete user controller
export const deleteUser = async (req: Request, res: Response) => {
  let username = req.params.username;
  res.status(200).json(await userDao.deleteUser(username));
};

// Get all users controller
export const getAllUsers = async (req: Request, res: Response) => {
  return res.status(200).json(await userDao.getAllUsers());
};
