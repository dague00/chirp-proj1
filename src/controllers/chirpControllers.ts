import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Request, Response } from 'express';
import ChirpsDao from '../dao/ChirpsDao';
import { config } from 'dotenv';
config();

const chirpDao = new ChirpsDao();
const ddb = new DynamoDBClient(config);

// Post chirp controller
export const PostOneChirp = async (req: Request, res: Response) => {
  let chirp = req.body;
  res.status(200).json(await chirpDao.postChirp(ddb, chirp));
};

// Get a chirp controller
export async function getAChirp(req: Request, res: Response) {
  const { timestamp } = req.params;
  return res.status(200).json(await chirpDao.getChirp(ddb, timestamp));
}

// Get user Chirps controller
export async function getUserChirps(req: Request, res: Response) {
  const { username } = req.params;
  return res.status(200).json(await chirpDao.getChirpsByUser(ddb, username));
}

// Edit chirp controller
export const updateChirp = async (req: Request, res: Response) => {
  let { timestamp } = req.params;
  let chirpBody = req.body.body;

  res.status(200).json(await chirpDao.editChirp(ddb, timestamp, chirpBody));
};

// Delete chirp controller
export const deleteOneChirp = async (req: Request, res: Response) => {
  let { timestamp } = req.params;
  res.status(200).json(await chirpDao.deleteChirp(ddb, timestamp));
};

// Get all chirps controller
export const getChirps = async (req: Request, res: Response) => {
  return res.status(200).json(await chirpDao.getAllChirps(ddb));
};
