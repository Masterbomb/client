/**
 * part.ts
 *
 * Interfaces for parts endpoint and api transactions
 *
 * @module part.ts
 */

export namespace Part {
    export interface Schema {
        id?:number;
        name:string;
        description:string;
        manufacturer_id?:number;
        supplier_id?:number;
        unit_price:number;
    }
    export const endpoint = process.env.API_BASE_PATH + '/parts';
}

