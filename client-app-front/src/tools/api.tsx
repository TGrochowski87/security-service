import axios from "axios";

export const getToken = (code: string) => {
  if (code.length > 0) {
    axios
      .get<string>(`https://localhost:7171/users/token/${code}`)
      .then((response) => {
        sessionStorage.setItem("token", response.data);
      })
      .catch((error) => console.log(error));
  }
};

export const getResource = (token: string) => {
  axios.post<string>(``, {});
};
