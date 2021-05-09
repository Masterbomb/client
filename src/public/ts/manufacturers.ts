import * as bootstrap from "bootstrap";
import $ from "jquery";
import { Mf } from "./interfaces";
import { Requests } from "./requests";

// global manufacturers state
var manufacturers:Mf.Schema[];
var $table = $('#manufacturersTable').bootstrapTable();
var $remove = $('#deleteManufacturer');
var $add = $('#addManufacturer');
var $edit = $('#editManufacturer');
var $post = $('#post');
var $put = $('#put');
var selections:number[] = [];

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
        // save your data, here just save the current page
        selections = get_id_selection();
    });
    // once data is loaded into table hide the loading screen
    $table.on('post-body.bs.table', function (_:JQuery.Event, _1:any) {
        $table.bootstrapTable('hideLoading');
    });
    console.log("Manufacturers DOM Ready");
    get_state();
});

// get the ids of all selected elements
function get_id_selection ():number[] {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
        return row.id;
    })
}

function loading_template():string {
    return '<div class="spinner-border text-light" role="status"><span class="sr-only">Loading...</span></div>'
}

// populate table with current state
function get_state() {
    $table.bootstrapTable('showLoading');
    console.log("Fetching manufacturer table state");
    Requests.get<Mf.Schema>(Mf.endpoint).then((response) => {
        if (response != null) {
            manufacturers = response.data.reverse();
            console.log("Response Data: ", manufacturers);
            setTimeout(() => {$table.bootstrapTable('load', manufacturers)}, 1000);
        } else {
            console.log("Received null response. skipping");
        }
    })
    // manually reset remove and edit options since the table selections are cleared on reload
    $remove.prop('disabled', true);
    $edit.prop('disabled', true);
}

// spawn manufacturer form modal
function add(event:JQuery.Event) {
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

function edit(event:JQuery.Event) {
    event.preventDefault();
    // inputs reflect selection
    let id = get_id_selection()[0]
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
function post_manufacturer(event:JQuery.Event) {
    event.preventDefault();
    if (!form_validation()) { return }
    // start post request
    const payload:Mf.Schema = {
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
        } else {
            console.log("Received null response. skipping");
        }
    }).catch(() => {
        console.error("API ");
    });
}

function put_manufacturer(event:JQuery.Event):void {
    event.preventDefault();
    if (!form_validation()) { return }
    // here only a single id field can be selected so this getter is safe
    const payload:Mf.Schema = {
        'id': get_id_selection()[0],
        'name': $('#manufacturerForm #manufacturerName').val() as string,
    };
    Requests.put<Mf.Schema>(Mf.endpoint, payload).then((response) => {
        if (response != null) {
            // clear fields
            $('#manufacturerForm input').val('');
            // hide modal
            $('#formModal').modal('toggle');
            // rerequest get requests
            get_state();
        } else {
            console.log("Received null response. skipping");
        }
    });
}

function form_validation():boolean {
    console.log("Validating manufacturer form");
    // basic form validation
    let error_flag:boolean = false;
    $('#manufacturerForm input').each(function (_:number, _1:HTMLElement) {
        if ($(this).val() === '') {
            error_flag = true;
        }
    });
    if (!error_flag) {
        console.log("Failed form validation check")
        alert("Enter all required fields");
        return false;
    }
    return true;
}

function delete_manufacturer(event:JQuery.Event) {
    event.preventDefault();
    let ids = get_id_selection();
    let promises:Promise<Mf.Schema | void>[] = []
    // compile promises
    ids.forEach(id => {
        let endpoint = `${Mf.endpoint}${id}`;
        promises.push(
            Requests.del(endpoint).then((response) => {
                if (response != null) {
                    console.log("API request succeded");
                } else {
                    console.log("Received null response. skipping");
                }
            })
        );
    });
    console.log("Promises: ", promises);
    Promise.all(promises).then(() => {
        get_state();
    });
}