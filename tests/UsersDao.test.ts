import UsersDao from '../src/dao/UsersDao';
import {isTest, config_test, DEFAULT_JEST_TIMEOUT, testUser} from '../src/shared/constants';

jest.setTimeout(DEFAULT_JEST_TIMEOUT); 

const dao = new UsersDao();

if (!isTest) {
  it('To run actual tests, isTest in src/shared/constants should be set to true', () => {
    expect(isTest).toBe(true);
  });
} else {
  it ('should enter then read items from the table', async () => {
    await dao.createUser(testUser);
    expect(await dao.getAllUsers())
      .toEqual([testUser]);
  });
  
  it ('should update the bio', async () => {
    await dao.createUser(testUser);
    await dao.updateUserBio(testUser.username, 'new bio');
    expect(await dao.getUser(testUser.username)).toMatchObject(testUser);
  });
  
  it ('delete the user', async() => {
    await dao.createUser(testUser);
    await dao.deleteUser(testUser.username);
    expect(await dao.getUser(testUser.username)).toBeUndefined();
  });
}