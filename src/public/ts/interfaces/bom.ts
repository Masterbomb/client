/**
 * bom.ts
 *
 * Interfaces for bom endpoint and api transactions
 *
 * @module bom.ts
 */

export interface StateSchema {
    project_id:number;
    part_id:number;
    quantity:number;
    net_price:number;
    manufacturer:string;
    supplier:string;
}
export interface PayloadSchema {
    project_id:number;
    part_id:number;
    supplier:string;
    manufacturer:string;
    quantity:number;
    net_price:number;
}
export const endpoint = process.env.API_BASE_PATH + '/bom';
