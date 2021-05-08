/**
 * bom.ts
 *
 * Interfaces for bom endpoint and api transactions
 *
 * @module bom.ts
 */

export namespace Bom {
    export interface Schema {
        project_id:number;
        part_id:number;
        quantity:number;
        net_price:number;
    }
    export const endpoint = process.env.API_BASE_PATH + '/bom'
}
