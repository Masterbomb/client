import * as Bom from './interfaces/bom.js';
import * as Requests from './requests/index.js';

// global bom state
let boms:Bom.StateSchema[] = [];
const $table = ($('#bomsTable') as any).bootstrapTable();

// DOM Ready
$(() => {
    // navbar page highlight
    $('#nav-item-boms').addClass('active');
    // once data is loaded into table hide the loading screen
    $table.on('post-body.bs.table', (_:JQuery.Event, _1:any) => {
        $table.bootstrapTable('hideLoading');
    });
    console.log("boms DOM Ready");
    get_state();
});

// populate table with current state
function get_state():void {
    $table.bootstrapTable('showLoading');
    console.log("Fetching bom table state");
    Requests.get<Bom.PayloadSchema>(Bom.endpoint).then((response) => {
        if (response != null) {
            // update global state
            boms = response.data.reverse();
            console.log("Response: ", boms);
            // temp timeout for load wheel debug
            $table.bootstrapTable('load', boms);
        }
    });
}
