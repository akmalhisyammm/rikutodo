import axios from 'axios';

export const getFetcher = async (url: string, token?: string) => {
  const response = await axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .catch((err) => err.response);

  return response.data;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const postFetcher = async (url: string, payload: any, token?: string) => {
  const response = await axios
    .post(url, payload, { headers: { Authorization: `Bearer ${token}` } })
    .catch((err) => err.response);

  return response.data;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const patchFetcher = async (url: string, payload: any, token?: string) => {
  const response = await axios
    .patch(url, payload, { headers: { Authorization: `Bearer ${token}` } })
    .catch((err) => err.response);

  return response.data;
};

export const deleteFetcher = async (url: string, token?: string) => {
  const response = await axios
    .delete(url, { headers: { Authorization: `Bearer ${token}` } })
    .catch((err) => err.response);

  return response.data;
};
