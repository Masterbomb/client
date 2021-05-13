import { Bom, Mf, Supplier } from './interfaces';
import { find_match, get_selected } from './helpers'

// global bom state
let boms:Bom.StateSchema[] = [];
let suppliers:Supplier.StateSchema[] = [];
let manufacturers:Mf.StateSchema[] = [];
const $table = $('#bomsTable').bootstrapTable();
const $remove = $('#deletebom');
const $add = $('#addbom');
const $edit = $('#editbom');
const $post = $('#post');
const $put = $('#put');
const $supplier_selector = $('#supplier-picker');
const $manufacturer_selector = $('#manufacturer-picker');
let selections = [];

// DOM Ready
$(() => {
    // navbar page highlight
    $('#nav-item-boms').addClass('active');
    $add.on('click', add);
    $post.on('click', post_bom);
    $edit.on('click', edit);
    $put.on('click', put_bom);
    $remove.on('click', delete_bom);
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
    console.log("boms DOM Ready");
    get_state();
});

// populate table with current state
function get_state() {
    $table.bootstrapTable('showLoading');
    console.log("Fetching bom table state");
    // ajax call to boms api
    console.log(`API GET ${Bom.endpoint}`);
    $.get({
        url: Bom.endpoint
    }).then((data) => {
        // update global state
        boms = data.reverse();
        console.log("Response: ", boms);
        // update global state with supplier and manufacturers
        get_foreign_states().then( () =>{
            // replace ids in boms table with name identifiers
            boms.forEach(bom => {
                bom.manufacturer = find_match(manufacturers, bom.manufacturer_id);
                bom.supplier = find_match(suppliers, bom.supplier_id);
            });
            // temp timeout for load wheel debug
            $table.bootstrapTable('load', boms);
            console.log("Compiled Response: ", boms);
            populate_selectors();
        });
    }).catch(() => {
        console.error("API request failed");
        alert("API Request Failed");
    });
    // manually reset remove and edit options since the table selections are cleared on reload
    $remove.prop('disabled', true);
    $edit.prop('disabled', true);
}

async function get_foreign_states() {
    // compile ajax queries and end with promise.all
    const promises = [];
    console.log(`API GET ${Supplier.endpoint}`);
    promises.push(
        $.get({
            url: `${Supplier.endpoint}`
        }).then((data) => {
            suppliers = data;
            console.log("Response: ", suppliers);
        }).catch(() => {
            console.error("API request failed");
        })
    );
    console.log(`API GET ${Mf.endpoint}`);
    promises.push(
        $.get({
            url: `${Mf.endpoint}`
        }).then((data) => {
            manufacturers = data;
            console.log("Response: ", manufacturers);
        }).catch(() => {
            console.error("API request failed");
        })
    );
    return Promise.all(promises);
}

// spawn bom form modal
function add(event:JQuery.Event):void {
    event.preventDefault();
    // clear inputs set button
    $('#bomForm input').each(function (index, val) {
        $(this).val('');
    });
    $post.prop("hidden", false);
    $put.prop("hidden", true);
    // set title
    $('#modalTitle').text("Add New bom");
    // spawn modal
    $('#formModal').modal();
}

function edit(event:JQuery.Event):void {
    event.preventDefault();
    // inputs reflect selection
    boms.forEach(bom => {
        if (bom.state === true) {
            $('#bomName').val(bom.name);
            $('#bomDesc').val(bom.description);
            $('#bomUnitPrice').val(bom.unit_price);
            $manufacturer_selector.val(bom.manufacturer_id);
            $supplier_selector.val(bom.supplier_id);
        }
    });
    $manufacturer_selector.selectpicker('refresh');
    $supplier_selector.selectpicker('refresh');
    $post.prop("hidden", true);
    $put.prop("hidden", false);
    // set title
    $('#modalTitle').text("Edit bom");
    $('#formModal').modal();
}

function populate_selectors() {
    // clear selectors
    $supplier_selector.empty('#supplier-picker');
    $manufacturer_selector.empty('#manufacturer-picker');
    // populate select pickers
    for (const idx in suppliers) {
       $supplier_selector.append($('<option />').val(suppliers[idx].id).text(suppliers[idx].name));
    }
    for (const idx in manufacturers) {
       $manufacturer_selector.append($('<option />').val(manufacturers[idx].id).text(manufacturers[idx].name));
    }
    $supplier_selector.selectpicker();
    $manufacturer_selector.selectpicker();
    $supplier_selector.selectpicker('refresh');
    $manufacturer_selector.selectpicker('refresh');
}

// post new bom
function post_bom(event:JQuery.Event):void {
    event.preventDefault();
    // start post request
    const payload:Bom.StateSchema = {
        'name': $('#bomForm #bomName').val(),
        'description': $('#bomForm #bomDesc').val(),
        'manufacturer_id': $('#bomForm #manufacturer-picker').val(),
        'supplier_id': $('#bomForm #supplier-picker').val(),
        'unit_price': $('#bomForm #bomUnitPrice').val()
    };
    console.log(`API POST ${Bom.endpoint} with: `, {...payload});
    $.post({
        data: payload,
        url: Bom.endpoint,
        dataType:'JSON'
    }).then(() => {
       // clear fields
       $('#bomForm input').val('');
       $('#bomForm textarea').val('');
       $manufacturer_selector.selectpicker();
       $supplier_selector.selectpicker();
       // hide modal
       $('#formModal').modal('toggle');
       // rerequest get requests
       get_state();
    }).catch(() => {
        console.error("API request failed");
        alert("API Request Failed");
    });
}

// put new bom
function put_bom(event:JQuery.Event):void {
    event.preventDefault();
    // here only a single id field can be selected so this getter is safe
    const payload:Bom.Schema = {
        'id': get_id_selection()[0],
        'name': $('#bomForm #bomName').val(),
        'description': $('#bomForm #bomDesc').val(),
        'manufacturer_id': $('#bomForm #manufacturer-picker').val(),
        'supplier_id': $('#bomForm #supplier-picker').val(),
        'unit_price': $('#bomForm #bomUnitPrice').val()
    };
    console.log(`API POST ${Bom.endpoint} with: `, {...payload});
    $.ajax({
        type: 'PUT',
        data: payload,
        url: Bom.endpoint,
        dataType:'JSON',
        success: () => {
            // clear fields
            $('#bomForm input').val('');
            // hide modal
            $('#formModal').modal('toggle');
            // rerequest get requests
            get_state();
        },
        error: (xhr) => {
            console.error(`API request failed with status code: ${xhr.status}`);
            alert("API Request Failed");
        }
    });
}

// delete one or more boms
function delete_bom(event:JQuery.Event):void {
    event.preventDefault();
    const ids = get_id_selection();
    const promises = [];
    // compile promises
    ids.forEach(id => {
        const endpoint = `${Bom.endpoint}${id}`;
        console.log(`API DELETE ${endpoint}`);
        promises.push(
            $.ajax({
                url: endpoint,
                type: 'DELETE',
                dataType: 'json',
                success() {},
                error(response) {
                    console.log(response);
                    console.error("API request failed");
                }
            })
        );
    });
    console.log("Promises: ", promises);
    Promise.all(promises).then( () => {
        get_state();
    });
}