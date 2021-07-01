import ChirpsDao from '../src/dao/ChirpsDao';

const DEFAULT_JEST_TIMEOUT = 5000; //milliseconds
jest.setTimeout(1*DEFAULT_JEST_TIMEOUT); 

const dao = new ChirpsDao();

it ('should enter then read items from the table', async () => {
  await dao.postChirp ({
    username: "testUser",
    chirp_body: "hi",
    timestamp: "984624684"
  });

  expect(await dao.getAllChirps ())
    .toEqual([
      {
        username: { S: 'testUser' },
        chirp_body: { S: 'hi' },
        timestamp: { S: '984624684' }
      }
    ]);
});

it ('should enter then read items from the table by user', async () => {
  await dao.postChirp ({
    username: "testUser",
    chirp_body: "hi",
    timestamp: "984624684"
  });

  expect(await dao.getChirpsByUser ('testUser'))
    .toEqual([ { username: 'testUser', chirp_body: 'hi', timestamp: '984624684' } ]);
});

it ('should update the chirp', async () => {
  await dao.postChirp ({
    username: "testUser",
    body: "hi",
    timestamp: "984624684"
  });

  await dao.editChirp("984624684", "newChirp");

  expect(await dao.getChirp('984624684'))
    .toMatchObject({
      username: "testUser",
      body: "newChirp",
      timestamp: "984624684"
    });
});

it ('should delete the chirp', async() => {
  await dao.postChirp ({
    username: "testUser",
    body: "hi",
    timestamp: "984624684"
  });

  await dao.deleteChirp("984624684");

  expect(await dao.getChirp('984624684')).toBeUndefined();
});