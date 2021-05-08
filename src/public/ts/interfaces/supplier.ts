/**
 * supplier.ts
 *
 * Interfaces for suppliers endpoint and api transactions
 *
 * @module suppliers.ts
 */

export namespace Supplier {
    export interface Schema {
        id?:number;
        name:string;
        website:string;
    }
    export const endpoint = process.env.API_BASE_PATH + '/suppliers'
}

