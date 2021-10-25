/**
 * requests.ts
 *
 * Axios requests interface
 *
 * @module index.ts
 */

 import axios, { AxiosResponse } from 'axios';

 export async function get<Type>(endpoint:string):Promise<AxiosResponse<Type[]> | null> {
     console.log(`API GET ${process.env.API_BASE_URL}${endpoint}`);
     axios.get<Type[]>(process.env.API_BASE_URL + endpoint, {
         headers: { "Content-Type": "application/json" }
     }).then(axios_response => {
         console.log(`API GET success with response ${axios_response.status} ${axios_response.statusText}`);
         return axios_response;
     }).catch(err => {
         console.error(`API GET failed with ${err}`);
     });
     return null;
 }
 
 export async function post<Type>(endpoint:string, payload:Type):Promise<AxiosResponse<any> | null> {
     console.log(`API POST ${process.env.API_BASE_URL}${endpoint}`);
     axios.post(process.env.API_BASE_URL + endpoint, {
         headers: { "Content-Type": "application/json" },
         data: payload
     }).then(axios_response => {
         console.log(`API POST success with status ${axios_response.status} ${axios_response.statusText}`);
         return axios_response;
     }).catch(err => {
         console.error(`API POST failed with ${err}`);
     });
     return null;
 }
 
 export async function put<Type>(endpoint:string, payload:Type):Promise<AxiosResponse<any> | null> {
     console.log(`API PUT ${process.env.API_BASE_URL}${endpoint}`);
     axios.put(process.env.API_BASE_URL + endpoint, {
         headers: { "Content-Type": "application/json" },
         data: payload
     }).then(axios_response => {
         console.log(`API PUT success with status ${axios_response.status} ${axios_response.statusText}`);
         return axios_response;
     }).catch(err => {
         console.error(`API PUT failed with ${err}`);
     });
     return null;
 }
 
 export async function del(endpoint:string):Promise<AxiosResponse<any> | null> {
     console.log(`API DELETE ${process.env.API_BASE_URL}${endpoint}`);
     axios.put(process.env.API_BASE_URL + endpoint, {
         headers: { "Content-Type": "application/json" },
     }).then(axios_response => {
         console.log(`API DELETE success with status ${axios_response.status} ${axios_response.statusText}`);
         return axios_response;
     }).catch(err => {
         console.error(`API DELETE failed with ${err}`);
     });
     return null;
 }