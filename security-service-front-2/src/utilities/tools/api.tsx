import axios from "axios";
import LoginData from "utilities/models/LoginData";

export const getScopes = async (): Promise<string[]> => {
  return axios.get<string[]>("https://localhost:7094/accounts/scopes").then((response) => response.data);
};

export const getClientName = async (clientId: string): Promise<string> => {
  return axios.get<string>(`https://localhost:7094/accounts/client/${clientId}`).then((response) => response.data);
};

export const loginUser = (credentials: LoginData, clientId: string): Promise<string> => {
  return axios
    .post<string>("https://localhost:7094/accounts/login", {
      username: credentials.login,
      password: credentials.password,
      clientId: clientId,
    })
    .then((response) => response.data);
};

export const loginAdmin = (credentials: LoginData) => {
  return axios
    .post("https://localhost:7094/accounts/login/admin", {
      username: credentials.login,
      password: credentials.password,
    })
    .then((response) => {
      sessionStorage.setItem("token", response.data.value.accessToken);
      return response.data;
    });
};

export const getAuthorizationCode = (userId: string, scopes: string[]): Promise<string> => {
  return axios
    .post<string>("https://localhost:7094/accounts/code", {
      userId: userId,
      scopes: scopes,
    })
    .then((response) => response.data);
};
