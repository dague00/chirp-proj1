export const isTest = process.env.NODE_ENV === 'test';
export const emptyObj = {};
export const emptyArr = [];
export const DEFAULT_JEST_TIMEOUT = 5000; //milliseconds

export const config_test = {
      convertEmptyValues: true,
      ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
        endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
        sslEnabled: false,
        region: "local",
      }),
}

export const testUser = {
  username: "testUsername",
  password: "testPassword",
  following: [
      "username1",
      "username2"
  ],
  bio: "testBio"
}

export const scanResponse_testUser = {  
  username: {S: "testUsername"},
  password: {S: "testPassword"},
  following:
      { L: [
          {S: "username1"},
          {S: "username2"}
      ]},
  bio: {S: "testBio"}
};

export const testUser_noFollowers = {
  username: "testUsername",
  password: "testPassword",
  following: [],
  bio: "testBio"
}

export const scanResponse_testUser_noFollowers = {
  username: {S: "testUsername"},
  password: {S: "testPassword"},
  following: {L: []},
  bio: {S: "testBio"}
}

export const testChirp = {
  username: "testUsername",
  chirp: "testChirp",
  timestamp: "1234567890"
}

export const scanResponse_testChirp = {
  username: {S: "testUsername"},
  chirp: {S: "testChirp"},
  timestamp: {S: "1234567890"}
};