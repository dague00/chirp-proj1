import { Request, Response } from 'express';
import ChirpsDao from '../dao/ChirpsDao';

const chirpDao = new ChirpsDao();

/**
 * Post chirp controller
 * 
 * @param req 
 * @param res 
 */
export const PostOneChirp = async (req: Request, res: Response) => {
  let chirp = req.body;
  res.status(200).json(await chirpDao.postChirp(chirp));
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
  return res.status(200).json(await chirpDao.getChirp(timestamp));
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
  return res.status(200).json(await chirpDao.getChirpsByUser(username));
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

  res.status(200).json(await chirpDao.editChirp(timestamp, chirpBody));
};

/**
 * Delete chirp controller
 * 
 * @param req 
 * @param res 
 */
export const deleteOneChirp = async (req: Request, res: Response) => {
  let { timestamp } = req.params;
  res.status(200).json(await chirpDao.deleteChirp(timestamp));
};

/**
 * Get all chirps controller
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const getChirps = async (req: Request, res: Response) => {
  return res.status(200).json(await chirpDao.getAllChirps());
};