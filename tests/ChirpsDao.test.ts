import ChirpsDao from '../src/dao/ChirpsDao';
import {DEFAULT_JEST_TIMEOUT, isTest, config_test, testChirp } from '../src/shared/constants';

jest.setTimeout(DEFAULT_JEST_TIMEOUT); 

const dao = new ChirpsDao;

if (!isTest) {
  it('To run actual tests, isTest in src/shared/constants should be set to true', () => {
    expect(isTest).toBe(true);
  });
} else {
  it ('should enter then read items from the table', async () => {
    await dao.postChirp(testChirp);
    expect(await dao.getAllChirps())
      .toEqual([testChirp]);
  });
  
  it ('should enter then read items from the table by user', async () => {
    await dao.postChirp(testChirp);
    expect(await dao.getChirpsByUser(testChirp.username))
      .toEqual([ testChirp ]);
  });
  
  it ('should update the chirp', async () => {
    await dao.postChirp(testChirp);
    await dao.editChirp(testChirp.timestamp, "newChirp");
    expect(await dao.getChirp(testChirp.timestamp))
      .toMatchObject(testChirp);
  });
  
  it ('should delete the chirp', async() => {
    await dao.postChirp(testChirp)
    await dao.deleteChirp(testChirp.timestamp);
    expect(await dao.getChirp(testChirp.timestamp)).toBeUndefined();
  });
}