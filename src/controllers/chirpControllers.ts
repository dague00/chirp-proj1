import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Request, Response } from 'express';
import ChirpsDao from '../dao/ChirpsDao';
import { config } from 'dotenv';
import { isTest, config_test } from '../shared/constants';

const chirpDao = new ChirpsDao();
const ddb = !isTest ?  new DynamoDBClient( { region: process.env.AWS_DEFAULT_REGION } ) : new DynamoDBClient( config_test );

/**
 * Post chirp controller
 * 
 * @param req 
 * @param res 
 */
export const PostOneChirp = async (req: Request, res: Response) => {
  let chirp = req.body;
  res.status(200).json(await chirpDao.postChirp(ddb, chirp));
};

/**
 * Get a chirp controller
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const getAChirp = async (req: Request, res: Response) => {
  const { timestamp } = req.params;
  return res.status(200).json(await chirpDao.getChirp(ddb, timestamp));
}

/**
 * Get user Chirps controller
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const getUserChirps = async (req: Request, res: Response) => {
  const { username } = req.params;
  return res.status(200).json(await chirpDao.getChirpsByUser(ddb, username));
}

/**
 * Edit chirp controller
 * 
 * @param req 
 * @param res 
 */
export const updateChirp = async (req: Request, res: Response) => {
  let { timestamp } = req.params;
  let chirpBody = req.body.body;

  res.status(200).json(await chirpDao.editChirp(ddb, timestamp, chirpBody));
};

/**
 * Delete chirp controller
 * 
 * @param req 
 * @param res 
 */
export const deleteOneChirp = async (req: Request, res: Response) => {
  let { timestamp } = req.params;
  res.status(200).json(await chirpDao.deleteChirp(ddb, timestamp));
};

/**
 * Get all chirps controller
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const getChirps = async (req: Request, res: Response) => {
  return res.status(200).json(await chirpDao.getAllChirps(ddb));
};
