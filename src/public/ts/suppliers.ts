import * as Requests from "./requests/index.js";
import * as Supplier from './interfaces/supplier.js';
import { get_selected } from "./helpers/index.js";

// global suppliers state
let suppliers:Supplier.StateSchema[];
const $table = ($('#suppliersTable') as any).bootstrapTable();
const $remove = $('#deleteSupplier');
const $add = $('#addSupplier');
const $edit = $('#editSupplier');
const $post = $('#post');
const $put = $('#put');

// DOM Ready
$(() => {
    $('#nav-item-suppliers').addClass('active');
    $add.on('click', add);
    $post.on('click', post_supplier);
    $edit.on('click', edit);
    $put.on('click', put_supplier);
    $remove.on('click', delete_supplier);
    // register table events
    $table.on('check.bs.table uncheck.bs.table ' + 'check-all.bs.table uncheck-all.bs.table', () => {
        $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
        $edit.prop('disabled', $table.bootstrapTable('getSelections').length !== 1);
    });
    // once data is loaded into table hide the loading screen
    $table.on('post-body.bs.table', (_:JQuery.Event, _1:any) => {
        $table.bootstrapTable('hideLoading');
    });
    console.log("Suppliers DOM Ready");
    get_state();
});

// populate table with current state
function get_state():void {
    $table.bootstrapTable('showLoading');
    console.log("Fetching supplier table state");
    // ajax call to suppliers api
    Requests.get<Supplier.GetSchema>(Supplier.endpoint).then((response) => {
        if (response != null) {
            suppliers = response.data.reverse();
            console.log("Response Data: ", suppliers);
            $table.bootstrapTable('load', suppliers);
        }
    });
    // manually reset remove and edit options since the table selections are cleared on reload
    $remove.prop('disabled', true);
    $edit.prop('disabled', true);
}

// spawn supplier form modal
function add(event:JQuery.Event):void {
    event.preventDefault();
    // clear inputs set button
    $('#supplierForm input').each(function (_:number, _1:HTMLElement) {
        $(this).val('');
    });
    $post.prop("hidden", false);
    $put.prop("hidden", true);
    // set title
    $('#modalTitle').text("Add New Supplier");
    // spawn modal
    $('#formModal').modal();
}

function edit(event:JQuery.Event):void {
    event.preventDefault();
    // inputs reflect selection
    const id = get_selected($table)[0];
    suppliers.forEach(supplier => {
        if (supplier.id === id) {
            $('#supplierName').val(supplier.name);
            $('#supplierWebsite').val(supplier.website);
        }
    });
    $post.prop("hidden", true);
    $put.prop("hidden", false);
    // set title
    $('#modalTitle').text("Edit Supplier");
    $('#formModal').modal();
}

function post_supplier(event:JQuery.Event):void {
    event.preventDefault();
    // start post request
    const name = $('#supplierForm #supplierName').val() as string;
    const website = $('#supplierForm #supplierWebsite').val() as string;
    const payload:Supplier.PostSchema = {
        'name': name,
        'website': website
    };
    console.log(`API POST ${Supplier.endpoint} with: `, {...payload});
    Requests.post(Supplier.endpoint, payload).then((response) => {
        if (response != null) {
            // clear fields
            $('#supplierForm input').val('');
            // hide modal
            $('#formModal').modal('toggle');
            // rerequest get requests
            get_state();
        }
    });
}

function put_supplier(event:JQuery.Event) {
    event.preventDefault();
    // here only a single id field can be selected so this getter is safe
    const id = get_selected($table)[0];
    const name = $('#supplierForm #supplierName').val() as string;
    const website = $('#supplierForm #supplierWebsite').val() as string;
    const payload:Supplier.PutSchema = {
        'id': id,
        'name': name,
        'website': website
    };
    console.log(`API POST ${Supplier.endpoint} with: `, {...payload});
    Requests.put(Supplier.endpoint, payload).then((response) => {
        if (response != null) {
            // clear fields
            $('#supplierForm input').val('');
            // hide modal
            $('#formModal').modal('toggle');
            // rerequest get requests
            get_state();
        }
    });
}

// delete one or more suppliers
function delete_supplier(event:JQuery.Event):void {
    event.preventDefault();
    const ids = get_selected($table);
    const promises:Promise<any>[] = [];
    // compile promises
    ids.forEach(id => {
        const endpoint = `${Supplier.endpoint}${id}`;
        promises.push(
            Requests.del(endpoint)
        );
    });
    console.log("Promises: ", promises);
    Promise.all(promises).then( () => {
        get_state();
    });
}