import * as Supplier from "../interfaces/supplier.js";
import * as Mf from "../interfaces/manufacturer.js";
import * as Part from "../interfaces/part.js";

// get the ids of all selected elements
export function get_selected ($table:any):number[] {
    return $.map($table.bootstrapTable('getSelections'), (row)=> {
        return row.id;
    });
}

// match id to name field
export function find_match(arr:Mf.GetSchema[] | Supplier.GetSchema[] | Part.GetSchema[], id:number | undefined): string | undefined{
    if ( arr.length === 0 || id === undefined) {
        return undefined;
    }
    return arr.filter((el) => {return (el.id === id);})[0].name;
}