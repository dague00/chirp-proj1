export const config_test = {
      convertEmptyValues: true,
      ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
        endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
        sslEnabled: false,
        region: "local",
      }),
}


export const DEFAULT_JEST_TIMEOUT = 5000; //milliseconds

/**
 * This function conveniently reformats scan responses.
 * 
 * Scan responses have the unweildy form
 * ```
 * {
 *    col_1_name: { col_1_type: val_1 },
 *    col_2_name: { col_2_type: val_2 },
 *    //etc
 * }
 * ```
 * This function converts an object of that form into one that looks like
 * ```
 * {
 *    col_1_name: val_1,
 *    col_2_name: val_2,
 *    //etc
 * }
 * ```
 * 
 * @param scanResponse 
 * @returns 
 */
export function convertScanResponseIntoJSON(scanResponse: Object){
  let formattedScanResponse = {};
  for (const [key, value] of Object.entries(scanResponse)){
      for (const [,nestedValue] of Object.entries(value)){
        formattedScanResponse[key] = nestedValue;
      }
  }
  return formattedScanResponse;
}

export const testChirp = {
  username: "testUser",
  chirp_body: "hi",
  timestamp: "984624684"
};

export const testUser = {
    username: "testUser",
    anythingIwant: "thisItem",
    bio: "new bio"
}