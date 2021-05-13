/**
 * part.ts
 *
 * Interfaces for parts endpoint and api transactions
 *
 * @module part.ts
 */

export namespace Part {
    // put schemas should have all optional fields except for the
    export interface GetSchema {
        id:number;
        name:string;
        description:string;
        manufacturer_id:number;
        supplier_id:number;
        unit_price:number;
    }
    export interface PutSchema {
        id:number;
        name:string;
        description:string;
        manufacturer_id:number;
        supplier_id:number;
        unit_price:number;
    }
    export interface PostSchema {
        name:string;
        description:string;
        manufacturer_id:number;
        supplier_id:number;
        unit_price:number;
    }
    export interface StateSchema {
        id:number;
        name:string;
        description:string;
        manufacturer_id:number;
        supplier_id:number;
        manufacturer?:string;
        supplier?:string;
        unit_price:number;
    }
    export const endpoint = process.env.API_BASE_PATH + '/parts';
}

