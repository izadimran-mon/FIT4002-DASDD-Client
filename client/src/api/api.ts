/**
 * This file exports a custom axios client for our own API server which handles all requests associated with foos.
 *
 * @note: If this React client is being served by a reverse proxy, the localServerUrl is used as a *relative*
 * URL to point to the "/api" route, and the reverse proxy is expected to proxy the request to the API server.
 * see: https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL#absolute_urls_vs_relative_urls
 */

import axios from "axios";
import { config } from "../configs/config";

/**
 * Connect to base API.
 */
export const baseApi = axios.create({
  baseURL: config.API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
  },
});

export const getBotAlignmentStats = async () => {
  const res = await baseApi.get(`/google/stats/bot-alignment`);
  return res.data;
};

export const getAdCategoryStats = async () => {
  const res = await baseApi.get(`/google/stats/category`);
  return res.data;
};

export const getAdCountStats = async (startDateTimestamp?: number) => {
  const res = await baseApi.get(`/google/stats/ad-count`, {
    params: { startDate: startDateTimestamp },
  });
  return res.data;
};

export const getAdStats = async () => {
  const res = await baseApi.get(`/google/stats/ad-stat`);
  return res.data;
};

export const getCategoryBotStats = async () => {
  const res = await baseApi.get(`/google/stats/category-bot`);
  return res.data;
};
