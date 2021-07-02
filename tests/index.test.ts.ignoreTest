import supertest from 'supertest';
import { APP } from '../src/index';

// Test User Endpoint
it('should create a user', async() => {
  const res = await supertest(APP)
    .post('/user')
    .send({
      username: "testUser",
      bio: "I'm not real.",
      password: "too weak",
      following: []
    });

  expect(res.statusCode).toEqual(200);
});

it('should get all users', async() => {
  const res = await supertest(APP)
    .get('/user/all')
    .send();

  expect(res.statusCode).toEqual(200);
});

it('should get one user', async() => {
  const res = await supertest(APP)
    .get('/user/testUser')
    .send();

  expect(res.statusCode).toEqual(200);
});

it('should update the bio', async() => {
  const res = await supertest(APP)
    .put('/user/testUser/bio')
    .send({
      bio: "I'm still not real."
    });

  expect(res.statusCode).toEqual(200);
});

it('should delete the testuser', async () => {
  const res = await supertest(APP)
    .delete('/user/testUser')
    .send();

  expect(res.statusCode).toEqual(200);
});

// Test Chirp Endpoint
it('should create a new chirp', async () => {
  const res = await supertest(APP)
    .post('/chirp')
    .send({
      username: "testUser",
      body: "this is a test chirp",
      timestamp: "123"
    });

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
    .get('/testUser')
    .send();

  expect(res.statusCode).toEqual(200);
});

it('should get a specific chirps', async () => {
  const res = await supertest(APP)
    .get('/chirp/123')
    .send();

  expect(res.statusCode).toEqual(200);
});

it('should update a specific chirp', async () => {
  const res = await supertest(APP)
    .put('/chirp/123')
    .send({
      body: "this is a MODIFIED test chirp",
      timestamp: "123"
    });

  expect(res.statusCode).toEqual(200);
});

it('should delete a specific chirp', async() => {
  const res = await supertest(APP)
    .delete('/chirp/123')
    .send();

  expect(res.statusCode).toEqual(200);
});