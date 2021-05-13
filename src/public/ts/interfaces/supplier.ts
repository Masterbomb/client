/**
 * supplier.ts
 *
 * Interfaces for suppliers endpoint and api transactions
 *
 * @module suppliers.ts
 */

export interface PostSchema {
    name:string;
    website:string;
}
export interface PutSchema {
    id:number;
    name:string;
    website:string;
}
export interface GetSchema {
    id:number;
    name:string;
    website:string;
}
export interface StateSchema {
    id:number;
    name:string;
    website:string;
}
export const endpoint = process.env.API_BASE_PATH + '/suppliers';

