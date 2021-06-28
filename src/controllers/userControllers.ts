import { Request, Response } from 'express';
import UsersDao from '../dao/UsersDao';

const userDao = new UsersDao();

// const TABLE_NAME = 'chirper_users';

export const createOneUser = async (req: Request, res: Response) => {
  let user = req.body.user;
  await userDao.createUser(user);
};

export const getUser = async (req: Request, res: Response) => {
  let username = req.params.username;
  const data = await userDao.getUser(username);
  return data;
};

export const editUserBio = async (req: Request, res: Response) => {
  let username = req.params.username;
  let bio = req.body.bio;

  await userDao.updateUserBio(username, bio);
};

export const editUserPassword = async (req: Request, res: Response) => {
  let { username } = req.params;
  let { password } = req.body;
  await userDao.updateUserPassword(username, password);
};

export const deleteUser = async (req: Request, res: Response) => {
  let username = req.params.userame;
  await userDao.deleteUser(username);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const data = await userDao.getAllUsers();
  return data;
};
