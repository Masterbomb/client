/**
 * project.ts
 *
 * Interfaces for projects endpoint and api transactions
 *
 * @module project.ts
 */

export namespace Project {
    export interface Schema {
        id?:number;
        name:string;
        description:string;
    }
    export const endpoint = process.env.API_BASE_PATH + '/projects';
}
