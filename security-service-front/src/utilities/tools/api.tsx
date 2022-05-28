import axios from "axios";
import { Client } from "utilities/models/Clients";
import LoginData from "utilities/models/LoginData";

export const getScopes = async (): Promise<string[]> => {
  const token = sessionStorage.getItem("token");

  return axios
    .get<string[]>("https://localhost:7094/accounts/scopes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const getClientName = async (clientId: string): Promise<string> => {
  return axios.get<string>(`https://localhost:7094/accounts/clients/${clientId}`).then((response) => response.data);
};

export const loginUser = async (credentials: LoginData, clientId: string): Promise<string> => {
  return axios
    .post<string>("https://localhost:7094/accounts/login", {
      username: credentials.login,
      password: credentials.password,
      clientId: clientId,
    })
    .then((response) => response.data);
};

export const loginAdmin = async (credentials: LoginData) => {
  return axios
    .post("https://localhost:7094/accounts/login/admin", {
      username: credentials.login,
      password: credentials.password,
    })
    .then((response) => {
      sessionStorage.setItem("token", response.data.accessToken);
      return;
    });
};

export const getAuthorizationCode = async (userId: string, scopes: string[]): Promise<string> => {
  return axios
    .post<string>("https://localhost:7094/accounts/code", {
      userId: userId,
      scopes: scopes,
    })
    .then((response) => response.data);
};

export const getClients = async (): Promise<Client[]> => {
  const token = sessionStorage.getItem("token");

  return axios
    .get("https://localhost:7094/accounts/clients", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const updateClient = async (clientId: string, scopes: string[]) => {
  const token = sessionStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    id: clientId,
    scopes: scopes,
  };

  return axios.put(`https://localhost:7094/accounts/clients`, data, config);
};
