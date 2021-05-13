/**
 * manufacturer.ts
 *
 * Interfaces for manufacturers endpoint and api transactions
 *
 * @module manufacturer.ts
 */

export namespace Mf {
    export interface GetSchema {
        id:number;
        name:string;
    } 
    export interface PutSchema {
        id:number;
        name:string;
    }
    export interface StateSchema {
        id:number;
        name:string;
    }
    export interface PostSchema {
        name:string;
    }
    export const endpoint = process.env.API_BASE_PATH + '/manufacturers'
}
