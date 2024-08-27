import axios from "axios";
import { server } from "../config/index";

const API = axios.create({ baseURL: server });

const cacheMap = new Map();

const apiGet = API.get;

API.get = async (
  url,
  { cache = true, cacheTimeout = 4000, ...config } = {}
) => {
  let key = url;

  if (config.params) {
    const params = new URLSearchParams(config.params).toString();
    key += `?${params}`;
  }

  const cachedResponse = cacheMap.get(key);
  if (cachedResponse) {
    return cachedResponse;
  }

  const responsePromise = apiGet(url, config);
  cacheMap.set(key, responsePromise);

  try {
    const response = await responsePromise;
    if (cache && response.data.type !== "ERROR") {
      cacheMap.set(key, response);
      setTimeout(() => {
        cacheMap.delete(key);
      }, cacheTimeout);
    } else {
      cacheMap.delete(key);
    }
    return response;
  } catch (err) {
    cacheMap.delete(key);
    throw err;
  }
};
