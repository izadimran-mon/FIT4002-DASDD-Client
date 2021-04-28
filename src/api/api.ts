import axios from "axios";
import { config } from "../configs/config";

export const baseApi = axios.create({
  baseURL: config.url.API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
  },
});

export const getBotAlignmentStats = async () => {
  const res = await baseApi.get(`/stats/bot-alignment`);
  return res.data;
};

export const getAdCategoryStats = async () => {
  const res = await baseApi.get(`/stats/category`);
  return res.data;
};

export const getAdCountStats = async (startDateTimestamp?: number) => {
  const res = await baseApi.get(`/stats/ad-count`, {
    params: { startDate: startDateTimestamp },
  });
  return res.data;
};

export const getAdStats = async () => {
  const res = await baseApi.get(`/stats/ad-stat`);
  return res.data;
};
