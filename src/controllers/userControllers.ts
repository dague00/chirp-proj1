import { Request, Response } from 'express';
import UsersDao from '../dao/UsersDao';

const userDao = new UsersDao();

// const TABLE_NAME = 'chirper_users';

export const createOneUser = async (req: Request, res: Response) => {
  let user = req.body.user;
  res.status(200).json(await userDao.createUser(user));
};

export async function getUser(req: Request, res: Response) {
  const username = req.params.username;
  return res.status(200).json(await userDao.getUser(username));
}

export const editUserBio = async (req: Request, res: Response) => {
  let username = req.params.username;
  let bio = req.body.bio;

  res.status(200).json(await userDao.updateUserBio(username, bio));
};

export const editUserPassword = async (req: Request, res: Response) => {
  let { username } = req.params;
  let { password } = req.body;
  res.status(200).json(await userDao.updateUserPassword(username, password));
};

export const deleteUser = async (req: Request, res: Response) => {
  let username = req.params.username;
  res.status(200).json(await userDao.deleteUser(username));
};

export const getAllUsers = async (req: Request, res: Response) => {
  return res.status(200).json(await userDao.getAllUsers());
};
