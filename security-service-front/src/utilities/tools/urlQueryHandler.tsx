import ClientQueryParams from "utilities/models/ClientQueryParams";

export const parseClientQueryParams = (searchParams: string): ClientQueryParams | null => {
  searchParams = searchParams.replace("?", "");

  let splitParams = String(searchParams).split("&");
  let keyValuePairs = splitParams
    .map((param) => param.split("="))
    .map((arrayKeyValuePair) => {
      return {
        [arrayKeyValuePair[0]]: arrayKeyValuePair[1],
      };
    });

  let scopes = keyValuePairs.filter((pair) => "scopes" in pair).map((scopeObject) => scopeObject["scopes"]);

  let mergedObject = keyValuePairs
    .filter((pair) => "scopes" in pair === false)
    .reduce((obj, item) => Object.assign(obj, item));

  Object.assign(mergedObject, { scopes: scopes });

  if (
    mergedObject.hasOwnProperty("clientId") &&
    typeof mergedObject["clientId"] === "string" &&
    mergedObject.hasOwnProperty("redirectUrl") &&
    typeof mergedObject["redirectUrl"] === "string" &&
    mergedObject.hasOwnProperty("responseType") &&
    typeof mergedObject["responseType"] === "string" &&
    mergedObject.hasOwnProperty("scopes") &&
    Array.isArray(mergedObject["scopes"]) &&
    mergedObject["scopes"].every((value) => typeof value === "string") &&
    mergedObject.hasOwnProperty("state") &&
    typeof mergedObject["state"] === "string"
  ) {
    return {
      clientId: mergedObject["clientId"],
      redirectUrl: mergedObject["redirectUrl"],
      responseType: mergedObject["responseType"],
      scopes: Array.isArray(mergedObject["scopes"]) ? mergedObject["scopes"] : [],
      state: mergedObject["state"],
    } as ClientQueryParams;
  } else {
    return null;
  }
};

export const buildSuccessfulCodeRedirect = (redirectUrl: string, code: string, state: string): string =>
  `${redirectUrl}?code=${code}&state=${state}`;

export const buildFailedCodeRedirect = (redirectUrl: string, state: string): string => `${redirectUrl}?state=${state}`;
