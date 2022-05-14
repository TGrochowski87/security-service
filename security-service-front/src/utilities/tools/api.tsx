import axios from "axios";
import LoginData from "utilities/models/LoginData";

export const getScopes = async (): Promise<string[]> => {
  return axios
    .get("https://localhost:7094/accounts/scopes")
    .then((response) => response.data.value)
    .catch((error) => error);
};

export const getClientName = async (clientId: string): Promise<string> => {
  return axios
    .get(`https://localhost:7094/accounts/client/${clientId}`)
    .then((response) => response.data.value)
    .catch((error) => error);
};

export const getAuthorizationCode = (credentials: LoginData, scopes: string[]): Promise<string> => {
  return axios
    .post("https://localhost:7094/accounts/login", {
      username: credentials.login,
      password: credentials.password,
      scopes: scopes,
    })
    .then((response) => response.data.value)
    .catch((error) => error);
};
