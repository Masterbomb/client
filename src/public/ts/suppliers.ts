// global suppliers state
var $table = $('#suppliersTable').bootstrapTable();
var $remove = $('#deleteSupplier');
var $add = $('#addSupplier');
var $edit = $('#editSupplier');
var $post = $('#post');
var $put = $('#put');
var selections = [];
var suppliers = [];

// DOM Ready
$(() => {
    $('#nav-item-suppliers').addClass('active');
    $add.on('click', add);
    $post.on('click', post_supplier);
    $edit.on('click', edit); 
    $put.on('click', put_supplier);
    $remove.on('click', delete_supplier);
    // register table events
    $table.on('check.bs.table uncheck.bs.table ' + 'check-all.bs.table uncheck-all.bs.table',function () {
        $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
        $edit.prop('disabled', $table.bootstrapTable('getSelections').length !== 1);
        // save your data, here just save the current page
        selections = get_id_selection();
    });
    // once data is loaded into table hide the loading screen
    $table.on('post-body.bs.table', function (e, args) {
        $table.bootstrapTable('hideLoading');
    });
    console.log("Suppliers DOM Ready");
    get_state();
});

// get the ids of all selected elements
function get_id_selection () {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
        return row.id;
    })
}

function loading_template() {
    return '<div class="spinner-border text-light" role="status"><span class="sr-only">Loading...</span></div>'
}

// populate table with current state
function get_state() {
    $table.bootstrapTable('showLoading');
    console.log("Fetching supplier table state");
    // ajax call to suppliers api
    console.log(`API GET ${suppliers_endpoint}`);
    $.get({
        url: suppliers_endpoint
    }).then((data) => {
        // update global state
        suppliers = data.reverse();
        console.log("Response: ", suppliers);
        // inject html for table use load for event listener
        // temp timeout for load wheel debug
        setTimeout(() => {$table.bootstrapTable('load', suppliers)}, 1000);
    }).catch(() => {
        console.error("API request failed");
        alert("API Request Failed");
    });
    // manually reset remove and edit options since the table selections are cleared on reload
    $remove.prop('disabled', true);
    $edit.prop('disabled', true);
}

// spawn supplier form modal
function add(event) {
    event.preventDefault();
    // clear inputs set button
    $('#supplierForm input').each(function (index, val) {
        $(this).val('');
    });
    $post.prop("hidden", false);
    $put.prop("hidden", true);
    // set title
    $('#modalTitle').text("Add New Supplier");
    // spawn modal
    $('#formModal').modal();
}

function edit(event) {
    event.preventDefault();
    // inputs reflect selection
    suppliers.forEach(supplier => {
        if (supplier.state === true) {
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

// post new supplier
function post_supplier(event) {
    console.log("Validating supplier form");
    event.preventDefault();
    // basic form validation
    var error_flag = false;
    $('#supplierForm input').each(function (index, val) {
        if ($(this).val() === '') {
            error_flag = true;
        }
    });
    if (error_flag == true) {
        console.error("Validation failed");
        alert("Enter all required fields");
        return false;
    }
    // start post request
    const newSupplier = {
        'name': $('#supplierForm #supplierName').val(),
        'website': $('#supplierForm #supplierWebsite').val()
    };
    console.log(`API POST ${suppliers_endpoint} with: `, {...newSupplier});
    $.post({
        data: newSupplier,
        url: suppliers_endpoint,
        dataType:'JSON'
    }).then(() => {
       // clear fields
       $('#supplierForm input').val('');
       // hide modal
       $('#formModal').modal('toggle');
       // rerequest get requests
       get_state();
    }).catch(() => {
        console.error("API request failed");
        alert("API Request Failed");
    });
}

// put new supplier
function put_supplier(event) {
    console.log("Validating supplier form");
    event.preventDefault();
    // basic form validation
    var error_flag = false;
    $('#supplierForm input').each(function (index, val) {
        if ($(this).val() === '') {
            error_flag = true;
        }
    });
    if (error_flag == true) {
        console.error("Validation failed");
        alert("Enter all required fields");
        return false;
    }
    // here only a single id field can be selected so this getter is safe
    const supplier_payload = {
        'id': get_id_selection()[0],
        'name': $('#supplierForm #supplierName').val(),
        'website': $('#supplierForm #supplierWebsite').val()
    };
    console.log(`API POST ${suppliers_endpoint} with: `, {...supplier_payload});
    $.ajax({
        type: 'PUT',
        data: supplier_payload,
        url: suppliers_endpoint,
        dataType:'JSON',
        success: () => {
            // clear fields
            $('#supplierForm input').val('');
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

// delete one or more suppliers
function delete_supplier(event) {
    event.preventDefault();
    var ids = get_id_selection();
    var promises = []
    // compile promises
    ids.forEach(id => {
        let endpoint = `${suppliers_endpoint}${id}`;
        console.log(`API DELETE ${endpoint}`);
        promises.push(
            $.ajax({
                url: endpoint,
                type: 'DELETE',
                dataType: 'json',
                success: function() {},
                error: function(response) {
                    console.log(response);
                    console.error("API request failed");
                    alert("API Request Failed");
                }
            })
        );
    })
    console.log("Promises: ", promises);
    Promise.all(promises).then( () => {
        get_state();
    })
}