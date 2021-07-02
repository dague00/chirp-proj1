import supertest from 'supertest';
import { APP } from '../src/index';
import { DEFAULT_JEST_TIMEOUT, config_test, testUser, testChirp } from '../src/shared/constants';

jest.setTimeout(DEFAULT_JEST_TIMEOUT);


//================================================================
// Test User Endpoint
//================================================================
it('should create a user', async () => {
  const res = await supertest(APP)
    .post('/user')
    .send(testUser);
  expect(res.statusCode).toEqual(200);
});

it('should get all users', async () => {
  const res = await supertest(APP)
  // supertest(APP)
    .get('/user/all')
    .send()
    expect(res.statusCode).toEqual(200);
});

it('should get one user', async() => {
  const res = await supertest(APP)
    .get('/user/' + testUser.username)
    .send();
  expect(res.statusCode).toEqual(200);
});

it('should update the bio', async() => {
  const res = await supertest(APP)
    .put('/user/' + testUser.username + '/bio')
    .send({
      bio: "I'm still not real."
    });
  expect(res.statusCode).toEqual(200);
});

it('should delete the testuser', async () => {
  const res = await supertest(APP)
    .delete('/user/' + testUser.username)
    .send();

  expect(res.statusCode).toEqual(200);
});

//================================================================
// Test Chirp Endpoint
//================================================================
it('should create a new chirp', async () => {
  const res = await supertest(APP)
    .post('/chirp')
    .send(testChirp);
  expect(res.statusCode).toEqual(200);
});

it('should get all chirps', async () => {
  const res = await supertest(APP)
    .get('/chirp/all')
    .send();
  expect(res.statusCode).toEqual(200);
});

it('should get testUser chirps', async () => {
  const res = await supertest(APP)
    .get('/' + testChirp.username)
    .send();
  expect(res.statusCode).toEqual(200);
});

it('should get a specific chirps', async () => {
  const res = await supertest(APP)
    .get('/chirp/' + testChirp.timestamp)
    .send();
  expect(res.statusCode).toEqual(200);
});

it('should update a specific chirp', async () => {
  const res = await supertest(APP)
    .put('/chirp/' + testChirp.timestamp)
    .send({
      body: "this is a MODIFIED test chirp",
      timestamp: testChirp.timestamp
    });
  expect(res.statusCode).toEqual(200);
});

it('should delete a specific chirp', async() => {
  const res = await supertest(APP)
    .delete('/chirp/' + testChirp.timestamp)
    .send();
  expect(res.statusCode).toEqual(200);
});