/**
 * requests.ts
 *
 * Axios requests interface
 *
 * @module requests.ts
 */

import axios, { AxiosResponse } from "axios";
import { log } from "@/main";

export async function get<Type>(
  endpoint: string
): Promise<AxiosResponse<Type> | null> {
  log.info(`API GET ${process.env.VUE_APP_API_BASE_URL}${endpoint}`);
  axios
    .get<Type>(process.env.VUE_APP_API_BASE_URL + endpoint, {
      headers: { "Content-Type": "application/json" },
    })
    .then((axios_response: AxiosResponse<Type>) => {
      log.info(
        `API GET success with response ${axios_response.status} ${axios_response.statusText}`
      );
      return axios_response;
    })
    .catch((err: Error) => {
      log.error("API GET failed", err);
    });
  return null;
}

export async function getAll<Type>(
  endpoint: string
): Promise<AxiosResponse<Type[]> | null> {
  log.info(`API GET ${process.env.VUE_APP_API_BASE_URL}${endpoint}`);
  axios
    .get<Type[]>(process.env.VUE_APP_API_BASE_URL + endpoint, {
      headers: { "Content-Type": "application/json" },
    })
    .then((axios_response: AxiosResponse<Type[]>) => {
      log.info(
        `API GET success with response ${axios_response.status} ${axios_response.statusText}`
      );
      return axios_response;
    })
    .catch((err: Error) => {
      log.error("API GET failed", err);
    });
  return null;
}

export async function post<Type>(
  endpoint: string,
  payload: Type
): Promise<AxiosResponse<Type> | null> {
  log.info(`API POST ${process.env.VUE_APP_API_BASE_URL}${endpoint}`);
  axios
    .post<Type>(process.env.VUE_APP_API_BASE_URL + endpoint, {
      headers: { "Content-Type": "application/json" },
      data: payload,
    })
    .then((axios_response: AxiosResponse<Type>) => {
      log.info(
        `API POST success with status ${axios_response.status} ${axios_response.statusText}`
      );
      return axios_response;
    })
    .catch((err: Error) => {
      log.error("API POST failed", err);
    });
  return null;
}

export async function put<Type>(
  endpoint: string,
  payload: Type
): Promise<AxiosResponse<Type> | null> {
  log.info(`API PUT ${process.env.VUE_APP_API_BASE_URL}${endpoint}`);
  axios
    .put<Type>(process.env.VUE_APP_API_BASE_URL + endpoint, {
      headers: { "Content-Type": "application/json" },
      data: payload,
    })
    .then((axios_response: AxiosResponse<Type>) => {
      log.info(
        `API PUT success with status ${axios_response.status} ${axios_response.statusText}`
      );
      return axios_response;
    })
    .catch((err: Error) => {
      log.error("API PUT failed", err);
    });
  return null;
}

export async function del<Type>(
  endpoint: string
): Promise<AxiosResponse<Type> | null> {
  log.info(`API DELETE ${process.env.VUE_APP_API_BASE_URL}${endpoint}`);
  axios
    .put(process.env.VUE_APP_API_BASE_URL + endpoint, {
      headers: { "Content-Type": "application/json" },
    })
    .then((axios_response: AxiosResponse<unknown>) => {
      log.info(
        `API DELETE success with status ${axios_response.status} ${axios_response.statusText}`
      );
      return axios_response;
    })
    .catch((err: Error) => {
      log.error("API DELETE: ", err);
    });
  return null;
}
