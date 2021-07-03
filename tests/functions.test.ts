import { 
    DEFAULT_JEST_TIMEOUT, isTest,
    testUser, scanResponse_testUser,
    testUser_noFollowers, scanResponse_testUser_noFollowers,
    testChirp, scanResponse_testChirp,
    emptyArr}
    from '../src/shared/constants';
import { formatScanResponse, formatArray } from '../src/shared/functions';

jest.setTimeout(DEFAULT_JEST_TIMEOUT);

if (!isTest){
    it('To run actual tests, isTest in src/shared/constants should be set to true', () => {
      expect(isTest).toBe(true);
    });
} else {
    //==========================================================================
    //test formatArray()
    //==========================================================================
    it('formatArray: An empty array should return as an empty array', () => {
        expect(formatArray(emptyArr)).toStrictEqual(emptyArr);
    });
    it('formatArray: A properly formatted array should return itself', () => {
        const arr = testUser.following;
        expect(formatArray(arr)).toStrictEqual(testUser.following);
    });
    it('formatArray: An unformatted array should return an formatted array', () => {
        const arr = scanResponse_testUser.following.L;
        expect(formatArray(arr)).toStrictEqual(testUser.following);
    });
    it('formatArray: An array with unformatted and formatted elements should return formatted', () => {
        const arr = [{S: 'ab'}, {T: 'cde'}, 3];
        const arrFormatted = ['ab', 'cde', 3];
        expect(formatArray(arr)).toStrictEqual(arrFormatted);
    });

    //==========================================================================
    //test formatScanResponse()
    //==========================================================================
    it('formatScanResponse: an array with two entries returns as formatted array', async () => {
        const scanArray = [scanResponse_testUser, scanResponse_testUser_noFollowers];
        const formattedScanArray = [testUser, testUser_noFollowers];
        const attemptToFormatArray = scanArray.map(formatScanResponse);
        expect(attemptToFormatArray).toStrictEqual(formattedScanArray);
    });
    it('formatScanResponse: it should return an empty array', () => {
        expect(emptyArr.map(formatScanResponse)).toStrictEqual(emptyArr);
    });
    it('formatScanResponse: it should leave properly formatted entries alone', () => {
        const scanArray = [testUser_noFollowers];
        const formattedScanArray = scanArray;
        const attemptToFormatArray = scanArray.map(formatScanResponse);
        expect(attemptToFormatArray).toStrictEqual(formattedScanArray);
    });
    it('formatScanResponse: it should leave properly formatted entries alone (not containing empty arrays) alone', () => {
        const scanArray = [testUser, testUser, testUser];
        const formattedScanArray = scanArray;
        const attemptToFormatArray = scanArray.map(formatScanResponse);
        expect(attemptToFormatArray).toStrictEqual(formattedScanArray);
    });
    it('formatScanResponse: it should properly handle chirps', () => {
        const scanArray = [scanResponse_testChirp, testChirp, testChirp];
        const formattedScanArray = [testChirp, testChirp, testChirp];
        const attemptToFormatArray = scanArray.map(formatScanResponse);
        expect(attemptToFormatArray).toStrictEqual(formattedScanArray);
    });
}