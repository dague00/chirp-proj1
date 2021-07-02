import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Request, Response } from 'express';
import UsersDao from '../dao/UsersDao';
import { config } from 'dotenv';
config();

const userDao = new UsersDao();
const ddb = new DynamoDBClient(config);

/**
 * Create user controller
 * 
 * @param req 
 * @param res 
 */
export const createOneUser = async (req: Request, res: Response) => {
  let user = req.body;
  // const salt = 10;

  res.status(200).json(await userDao.createUser(ddb, user));
  // .then(
    // bcrypt.hash(req.body.password, salt, async function(err, hash) {

    //   res.status(200).json(await userDao.updateUserPassword(req.body.username, hash));
    //   if (err) { console.log("Error: ", err) }
    // })));

}

/**
 * Get user controller
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function getUser(req: Request, res: Response) {
  const username = req.params.username;
  return res.status(200).json(await userDao.getUser(ddb, username));
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

  res.status(200).json(await userDao.updateUserBio(ddb, username, bio));
};

/**
 * Delete user controller
 * 
 * @param req 
 * @param res 
 */
export const deleteUser = async (req: Request, res: Response) => {
  let username = req.params.username;
  res.status(200).json(await userDao.deleteUser(ddb, username));
};

/**
 * Get all users controller
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const getAllUsers = async (req: Request, res: Response) => {
  return res.status(200).json(await userDao.getAllUsers(ddb));
};
