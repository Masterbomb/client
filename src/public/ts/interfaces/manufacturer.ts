/**
 * manufacturer.ts
 *
 * Interfaces for manufacturers endpoint and api transactions
 *
 * @module manufacturer.ts
 */

export namespace Mf {
    export interface Schema {
        id?:number;
        name:string;
    }
    export const endpoint = process.env.API_BASE_PATH + '/manufacturers'
}