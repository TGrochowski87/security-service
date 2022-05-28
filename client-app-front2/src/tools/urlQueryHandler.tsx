import { RedirectData } from "models/RedirectData";

export const buildAuthServerUrl = (authServerBaseUrl: string, redirectData: RedirectData): string => {
  let query = "";
  const queryParams = Object.entries(redirectData);
  for (let entry of queryParams) {
    query += `${entry[0]}=${entry[1]}&`;
  }
  const finalUrl = `${authServerBaseUrl}?${query}`;

  return finalUrl;
};
