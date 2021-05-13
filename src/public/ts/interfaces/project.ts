/**
 * project.ts
 *
 * Interfaces for projects endpoint and api transactions
 *
 * @module project.ts
 */

export namespace Project {

    export interface PostSchema {
        name:string;
        description:string;
    }
    export interface PutSchema {
        id:number;
        name:string;
        description:string;
    }
    export interface GetSchema {
        id:number;
        name:string;
        description:string;
    }
    export interface StateSchema {
        id:number;
        name:string;
        description:string;
    }
    export const endpoint = process.env.API_BASE_PATH + '/projects';
}
