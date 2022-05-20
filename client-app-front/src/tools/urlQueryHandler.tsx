import { RedirectData } from "models/RedirectData";

export const buildAuthServerUrl = (authServerBaseUrl: string, redirectData: RedirectData): string => {
  let query = "";
  const queryParams = Object.entries(redirectData);
  for (let entry of queryParams) {
    if (Array.isArray(entry[1])) {
      for (let value of entry[1]) {
        query += `${entry[0]}=${value}&`;
      }
    } else {
      query += `${entry[0]}=${entry[1]}&`;
    }
  }
  const finalUrl = `${authServerBaseUrl}?${query}`;

  return finalUrl;
};
