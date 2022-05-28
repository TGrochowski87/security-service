import axios from "axios";

export const getToken = async (code: string) => {
  if (code.length > 0) {
    axios
      .get(`https://localhost:7085/users/token/${code}`)
      .then((response) => {
        sessionStorage.setItem("token", response.data.value.accessToken);
      })
      .catch((error) => console.log(error));
  }
};

export const getFriends = async (token: string): Promise<string> => {
  return axios
    .get<string>(`https://localhost:7006/resource/friends`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const getPhotos = async (token: string): Promise<string> => {
  return axios
    .get<string>(`https://localhost:7006/resource/photos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const getTimeline = async (token: string): Promise<string> => {
  return axios
    .get<string>(`https://localhost:7006/resource/timeline`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};
