import $ from "jquery";
import 'bootstrap-select/dist/css/bootstrap-select.css';
// import 'bootstrap-table/dist/bootstrap-table.min.css'
import * as Requests from "./requests";
import { get_selected } from "./helpers";
import { Part, Supplier, Mf } from './interfaces';

// global parts state
let parts:Part.StateSchema[] = [];
let suppliers:Supplier.StateSchema[] = [];
let manufacturers:Mf.StateSchema[] = [];
const $table:any = $('#partsTable');
const $remove = $('#deletePart');
const $add = $('#addPart');
const $edit = $('#editPart');
const $post = $('#post');
const $put = $('#put');
const $supplier_selector = $('#supplier-picker');
const $manufacturer_selector = $('#manufacturer-picker');

// DOM Ready
$(() => {
    // navbar page highlight
    $('#nav-item-parts').addClass('active');
    $add.on('click', add);
    $post.on('click', post_part);
    $edit.on('click', edit);
    $put.on('click', put_part);
    $remove.on('click', delete_part);
    $supplier_selector.selectpicker();
    $manufacturer_selector.selectpicker();
    // register table events
    $table.on('check.bs.table uncheck.bs.table ' + 'check-all.bs.table uncheck-all.bs.table', () => {
        $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
        $edit.prop('disabled', $table.bootstrapTable('getSelections').length !== 1);
    });
    // once data is loaded into table hide the loading screen
    $table.on('post-body.bs.table', (_:JQuery.Event, _1:any) => {
        $table.bootstrapTable('hideLoading');
    });
    console.log("parts DOM Ready");
    get_state();
});

// populate table with current state
function get_state():void {
    $table.bootstrapTable('showLoading');
    console.log("Fetching part table state");
    Requests.get<Part.GetSchema>(Part.endpoint).then((response) => {
        if (response != null) {
            parts = response.data.reverse();
            console.log("Response Data: ", parts);
            // update global state with supplier and manufacturers
            get_foreign_states().then(() => {
                // replace ids in parts table with name identifiers
                parts.forEach(part => {
                    part.manufacturer = find_match(manufacturers, part.manufacturer_id);
                    part.supplier = find_match(suppliers, part.supplier_id);
                });
                // temp timeout for load wheel debug
                $table.bootstrapTable('load', parts);
                console.log("Compiled Response: ", parts);
                populate_selectors();
            });
        }
    });
    // manually reset remove and edit options since the table selections are cleared on reload
    $remove.prop('disabled', true);
    $edit.prop('disabled', true);
}

async function get_foreign_states():Promise<void[]> {
    // compile queries and end with promise.all
    const promises = [];
    promises.push(
        Requests.get<Supplier.GetSchema>(Supplier.endpoint).then((response) => {
            if (response != null) {
                suppliers = response.data;
            }
        })
    );
    promises.push(
        Requests.get<Mf.GetSchema>(Mf.endpoint).then((response) => {
            if (response != null) {
                manufacturers = response.data;
            }
        })
    );
    return Promise.all(promises);
}

// spawn part form modal
function add(event:JQuery.Event):void {
    event.preventDefault();
    // clear inputs set button
    $('#partForm input').each(function (_:number, _1:HTMLElement) {
        $(this).val('');
    });
    $post.prop("hidden", false);
    $put.prop("hidden", true);
    // set title
    $('#modalTitle').text("Add New Part");
    // spawn modal
    $('#formModal').modal();
}

function edit(event:JQuery.Event):void {
    event.preventDefault();
    const id = get_selected($table)[0];
    // inputs reflect selection
    parts.forEach(part => {
        if (part.id === id) {
            $('#partName').val(part.name);
            $('#partDesc').val(part.description);
            $('#partUnitPrice').val(part.unit_price);
            $manufacturer_selector.val(part.manufacturer_id);
            $supplier_selector.val(part.supplier_id);
        }
    });
    $manufacturer_selector.selectpicker('refresh');
    $supplier_selector.selectpicker('refresh');
    $post.prop("hidden", true);
    $put.prop("hidden", false);
    // set title
    $('#modalTitle').text("Edit Part");
    $('#formModal').modal();
}

function populate_selectors() {
    // clear selectors
    $supplier_selector.empty();
    $manufacturer_selector.empty();
    // populate select pickers
    suppliers.forEach((supplier) => {
        $supplier_selector.append($('<option />').val(supplier.id).text(supplier.name));
    });
    manufacturers.forEach((manufacturer)=>{
        $manufacturer_selector.append($('<option />').val(manufacturer.id).text(manufacturer.name));
    });
    $supplier_selector.selectpicker();
    $manufacturer_selector.selectpicker();
    $supplier_selector.selectpicker('refresh');
    $manufacturer_selector.selectpicker('refresh');
}

// post new part
function post_part(event:JQuery.Event):void {
    event.preventDefault();
    const name = $('#partForm #partName').val() as string;
    const description = $('#partForm #partDesc').val() as string;
    const manufacturer_id = $('#partForm #manufacturer-picker').val() as number;
    const supplier_id = $('#partForm #supplier-picker').val() as number;
    const unit_price = $('#partForm #partUnitPrice').val() as number;
    const payload:Part.PostSchema = {
        'name': name,
        'description': description,
        'manufacturer_id': manufacturer_id,
        'supplier_id': supplier_id,
        'unit_price': unit_price
    };
    console.log(`API POST ${Part.endpoint} with: `, {...payload});
    Requests.post(Part.endpoint, payload).then((response) => {
        if (response != null) {
            // clear fields
            $('#partForm input').val('');
            $('#partForm textarea').val('');
            $manufacturer_selector.selectpicker();
            $supplier_selector.selectpicker();
            // hide modal
            $('#formModal').modal('toggle');
            // rerequest get requests
            get_state();
        }
    });
}

// put new part
function put_part(event:JQuery.Event):void {
    event.preventDefault();
    // here only a single id field can be selected so this getter is safe
    const id = get_selected($table)[0];
    const name = $('#partForm #partName').val() as string;
    const description = $('#partForm #partDesc').val() as string;
    const manufacturer_id = $('#partForm #manufacturer-picker').val() as number;
    const supplier_id = $('#partForm #supplier-picker').val() as number;
    const unit_price = $('#partForm #partUnitPrice').val() as number;
    const payload:Part.PutSchema = {
        'id': id,
        'name': name,
        'description': description,
        'manufacturer_id': manufacturer_id,
        'supplier_id': supplier_id,
        'unit_price': unit_price
    };
    console.log(`API POST ${Part.endpoint} with: `, {...payload});
    Requests.put(Part.endpoint, payload).then((response) => {
        if (response != null) {
            // clear fields
            $('#partForm input').val('');
            // hide modal
            $('#formModal').modal('toggle');
            // rerequest get requests
            get_state();
        }
    });
}

function delete_part(event:JQuery.Event):void {
    event.preventDefault();
    const ids = get_selected($table);
    const promises:Promise<any>[] = [];
    // compile promises
    ids.forEach(id => {
        const endpoint = `${Part.endpoint}${id}`;
        promises.push(
            Requests.del(endpoint)
        );
    });
    console.log("Promises: ", promises);
    Promise.all(promises).then( () => {
        get_state();
    });
}