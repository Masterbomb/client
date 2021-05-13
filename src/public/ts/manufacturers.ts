import $ from "jquery";
import { Mf } from "./interfaces";
import * as Requests from "./requests";
import { get_selected } from "./helpers";

// global manufacturers state
let manufacturers:Mf.StateSchema[];
const $table = $('#manufacturersTable').bootstrapTable();
const $remove = $('#deleteManufacturer');
const $add = $('#addManufacturer');
const $edit = $('#editManufacturer');
const $post = $('#post');
const $put = $('#put');

// DOM Ready
$(() => {
    // navbar page highlight
    $('#nav-item-manufacturers').addClass('active');
    $add.on('click', add);
    $post.on('click', post_manufacturer);
    $edit.on('click', edit);
    $put.on('click', put_manufacturer);
    $remove.on('click', delete_manufacturer);
    // register table events
    $table.on('check.bs.table uncheck.bs.table ' + 'check-all.bs.table uncheck-all.bs.table',function () {
        $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
        $edit.prop('disabled', $table.bootstrapTable('getSelections').length !== 1);
    });
    // once data is loaded into table hide the loading screen
    $table.on('post-body.bs.table', function (_:JQuery.Event, _1:any) {
        $table.bootstrapTable('hideLoading');
    });
    console.log("Manufacturers DOM Ready");
    get_state();
});

// populate table with current state
function get_state():void {
    $table.bootstrapTable('showLoading');
    console.log("Fetching manufacturer table state");
    Requests.get<Mf.GetSchema>(Mf.endpoint).then((response) => {
        if (response != null) {
            manufacturers = response.data.reverse();
            console.log("Response Data: ", manufacturers);
            $table.bootstrapTable('load', manufacturers);
        }
    });
    // manually reset remove and edit options since the table selections are cleared on reload
    $remove.prop('disabled', true);
    $edit.prop('disabled', true);
}

// spawn manufacturer form modal
function add(event:JQuery.Event):void {
    event.preventDefault();
    // clear inputs set button
    $('#manufacturerForm input').each(function (_:number, _1:HTMLElement) {
        $(this).val('');
    });
    $post.prop("hidden", false);
    $put.prop("hidden", true);
    // set title
    $('#modalTitle').text("Add New Manufacturer");
    // spawn modal
    $('#formModal').modal();
}

function edit(event:JQuery.Event):void {
    event.preventDefault();
    // inputs reflect selection
    const id = get_selected($table)[0];
    manufacturers.forEach(manufacturer => {
        if (manufacturer.id === id) {
            $('#manufacturerName').val(manufacturer.name);
        }
    });
    $post.prop("hidden", true);
    $put.prop("hidden", false);
    // set title
    $('#modalTitle').text("Edit Manufacturer");
    $('#formModal').modal();
}

// post new manufacturer
function post_manufacturer(event:JQuery.Event):void {
    event.preventDefault();
    // start post request
    const payload:Mf.PostSchema = {
        'name': $('#manufacturerForm #manufacturerName').val() as string
    };
    console.log(`API POST ${Mf.endpoint} with: `, {...payload});
    Requests.post(Mf.endpoint, payload).then((response) => {
        if (response != null) {
            // clear fields
            $('#manufacturerForm input').val('');
            // hide modal
            $('#formModal').modal('toggle');
            // rerequest get requests
            get_state();
        }
    });
}

function put_manufacturer(event:JQuery.Event):void {
    event.preventDefault();
    // here only a single id field can be selected so this getter is safe
    const id = get_selected($table)[0];
    const name = $('#manufacturerForm #manufacturerName').val() as string;
    const payload:Mf.PutSchema = {
        'id': id,
        'name': name,
    };
    Requests.put(Mf.endpoint, payload).then((response) => {
        if (response != null) {
            // clear fields
            $('#manufacturerForm input').val('');
            // hide modal
            $('#formModal').modal('toggle');
            // rerequest get requests
            get_state();
        }
    });
}

function delete_manufacturer(event:JQuery.Event):void {
    event.preventDefault();
    const ids = get_selected($table);
    const promises:Promise<any>[] = [];
    // compile promises
    ids.forEach(id => {
        const endpoint = `${Mf.endpoint}${id}`;
        promises.push(
            Requests.del(endpoint)
        );
    });
    console.log("Promises: ", promises);
    Promise.all(promises).then(() => {
        get_state();
    });
}