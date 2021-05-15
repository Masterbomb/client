import * as Requests from "./requests";
import * as Project from './interfaces/project';
import { get_selected } from "./helpers";

// global suppliers state
let projects:Project.StateSchema[] = [];
const $table = ($('#projectsTable') as any).bootstrapTable();
const $remove = $('#deleteProject');
const $add = $('#addProject');
const $edit = $('#editProject');
const $post = $('#post');
const $put = $('#put');

// DOM Ready
$(() => {
    $('#nav-item-projects').addClass('active');
    $add.on('click', add);
    $post.on('click', post_project);
    $edit.on('click', edit);
    $put.on('click', put_project);
    $remove.on('click', delete_project);
    // register table events
    $table.on('check.bs.table uncheck.bs.table ' + 'check-all.bs.table uncheck-all.bs.table',() => {
        $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
        $edit.prop('disabled', $table.bootstrapTable('getSelections').length !== 1);
    });
    // once data is loaded into table hide the loading screen
    $table.on('post-body.bs.table', (_:JQuery.Event, _1:any) => {
        $table.bootstrapTable('hideLoading');
    });
    console.log("Projects DOM Ready");
    get_state();
});

// populate table with current state
function get_state():void {
    $table.bootstrapTable('showLoading');
    console.log("Fetching project table state");
    Requests.get<Project.GetSchema>(Project.endpoint).then((response) => {
        if (response != null) {
            projects = response.data.reverse();
            console.log("Response Data: ", projects);
            $table.bootstrapTable('load', projects);
        }
    });
    // manually reset remove and edit options since the table selections are cleared on reload
    $remove.prop('disabled', true);
    $edit.prop('disabled', true);
}

// spawn projects form modal
function add(event:JQuery.Event):void {
    event.preventDefault();
    // clear inputs set button
    $('#projectForm input').each(function (_:number, _1:HTMLElement) {
        $(this).val('');
    });
    $('#projectForm textarea').val('');
    $post.prop("hidden", false);
    $put.prop("hidden", true);
    // set title
    $('#modalTitle').text("Add New Project");
    // spawn modal
    $('#formModal').modal();
}

function edit(event:JQuery.Event):void {
    event.preventDefault();
    // inputs reflect selection
    const id = get_selected($table)[0];
    projects.forEach(project => {
        if (project.id === id) {
            $('#projectName').val(project.name);
            $('#projectDesc').val(project.description);
        }
    });
    $post.prop("hidden", true);
    $put.prop("hidden", false);
    // set title
    $('#modalTitle').text("Edit Project");
    $('#formModal').modal();
}

function post_project(event:JQuery.Event):void {
    event.preventDefault();
    // start post request
    const name = $('#projectForm #projectName').val() as string;
    const description = $('#projectForm #projectDesc').val() as string;
    const payload:Project.PostSchema = {
        'name': name,
        'description': description
    };
    console.log(`API POST ${Project.endpoint} with: `, {...payload});
    Requests.post(Project.endpoint, payload).then((response) => {
        if (response != null) {
            // clear fields
            $('#projectForm input').val('');
            // hide modal
            $('#formModal').modal('toggle');
            // rerequest get requests
            get_state();
        }
    });
}

function put_project(event:JQuery.Event):void {
    event.preventDefault();
    // here only a single id field can be selected so this getter is safe
    // start post request
    const id = get_selected($table)[0];
    const name = $('#projectForm #projectName').val() as string;
    const description = $('#projectForm #projectDesc').val() as string;
    const payload:Project.PutSchema = {
        'id': id,
        'name': name,
        'description': description
    };
    console.log(`API POST ${Project.endpoint} with: `, {...payload});
    Requests.put(Project.endpoint, payload).then((response) => {
        if (response != null) {
           // clear fields
           $('#projectForm input').val('');
           // hide modal
           $('#formModal').modal('toggle');
           // rerequest get requests
           get_state();
        }
    });
}

function delete_project(event:JQuery.Event):void {
    event.preventDefault();
    const ids = get_selected($table);
    const promises:Promise<any>[] = [];
    // compile promises
    ids.forEach(id => {
        const endpoint = `${Project.endpoint}${id}`;
        promises.push(
           Requests.del(endpoint)
        );
    });
    console.log("Promises: ", promises);
    Promise.all(promises).then( () => {
        get_state();
    });
}