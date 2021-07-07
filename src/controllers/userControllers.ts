import { Request, Response } from 'express';
import UsersDao from '../dao/UsersDao';
import { config } from 'dotenv';
config();

const userDao = new UsersDao();

/**
 * Create user controller
 * 
 * @param req 
 * @param res 
 */
export const createOneUser = async (req: Request, res: Response) => {
  let user = req.body;
  res.status(200).json(await userDao.createUser(user));
}

/**
 * Get user controller
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const getUser = async (req: Request, res: Response) => {
  let username = req.params.username;
  return res.status(200).json(await userDao.getUser(username));
}

/**
 * Edit user bio controller
 * 
 * @param req 
 * @param res 
 */
export const editUserBio = async (req: Request, res: Response) => {
  let username = req.params.username;
  let bio = req.body.bio;

  res.status(200).json(await userDao.updateUserBio(username, bio));
};

/**
 * Delete user controller
 * 
 * @param req 
 * @param res 
 */
export const deleteUser = async (req: Request, res: Response) => {
  let username = req.params.username;
  res.status(200).json(await userDao.deleteUser(username));
};

/**
 * Get all users controller
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const getAllUsers = async (req: Request, res: Response) => {
  return res.status(200).json(await userDao.getAllUsers());
};
