import $ from "jquery";

// get the ids of all selected elements
export function get_selected ($table:any):number[] {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
        return row.id;
    })
}