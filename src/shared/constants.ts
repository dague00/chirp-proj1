export const isTest = true;

export const config_test = {
      convertEmptyValues: true,
      ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
        endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
        sslEnabled: false,
        region: "local",
      }),
}

export const DEFAULT_JEST_TIMEOUT = 5000; //milliseconds

export const testChirp = {
  username: "testUser",
  chirp_body: "hi",
  timestamp: "123"
};

export const testUser = {
    username: "testUser",
    anythingIwant: "thisItem",
    bio: "new bio",
    following: []
}