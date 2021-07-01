import UsersDao from '../src/dao/UsersDao';

const DEFAULT_JEST_TIMEOUT = 5000; //milliseconds
jest.setTimeout(1*DEFAULT_JEST_TIMEOUT); 

const dao = new UsersDao();

it ('should enter then read items from the table', async () => {
  await dao.createUser ({
    username: "testUser",
    anythingIwant: "thisItem"
  });

  expect(await dao.getAllUsers ())
    .toEqual([{"anythingIwant": {"S": "thisItem"}, "username": {"S": "testUser"}}]);
});

it ('should update the bio', async () => {
  await dao.createUser ({
    username: "testUser",
    anythingIwant: "thisItem"
  });
  
  await dao.updateUserBio('testUser', 'new bio');

  expect(await dao.getUser ('testUser')).toMatchObject({
    username: "testUser",
    anythingIwant: "thisItem",
    bio: "new bio"
  });
});

it ('delete the user', async() => {
  await dao.createUser ({
    username: "testUser",
    anythingIwant: "thisItem"
  });

  await dao.deleteUser('testUser');

  expect(await dao.getUser ('testUser')).toBeUndefined();
});