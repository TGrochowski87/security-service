import axios from "axios";

export const getToken = (code: string) => {
  if (code.length > 0) {
    axios
      .get(`https://localhost:7171/users/token/${code}`)
      .then((response) => {
        sessionStorage.setItem("token", response.data.value.accessToken);
      })
      .catch((error) => console.log(error));
  }
};

export const getResource = (token: string): Promise<string> => {
  return axios
    .get<string>(`https://localhost:7006/resource/friends`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};
