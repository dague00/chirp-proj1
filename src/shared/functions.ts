/**
 * This function conveniently reformats scan responses.
 * 
 * Scan responses have the unweildy form
 * ```
 * {
 *    prop1: { type1: val1 },
 *    prop2: { type2: val2 },
 *    prop3: [
 *      {arr0_type: arr0_val},
 *      {arr1_type: arr1_val}
 *    ],
 *    //etc
 * }
 * ```
 * This function converts an object of that form into one that looks like
 * ```
 * {
 *    prop1: val1,
 *    prop2: val2,
 *    prop3: [arr0_val, arr1_val]
 *    //etc
 * }
 * ```
 * 
 * @param scanResponse 
 * @returns 
 */
 export function formatScanResponse(scanResponse: Object){
    let formattedScanResponse = {};
    for (const [key, value] of Object.entries(scanResponse)){
      if (typeof value === 'object'){
        for (const [,nestedValue] of Object.entries(value)){
          if (typeof nestedValue === 'object'){
            let arr = [];
            for (const x of nestedValue as Object[]){
              const [y,] = Object.entries(x);
              arr.push(y[1]);
            }
            formattedScanResponse[key] = arr;
          } else {
            formattedScanResponse[key] = nestedValue;
          }     
        }
      }
      else {
        formattedScanResponse[key] = value;
      }
    }
    return formattedScanResponse;
  }