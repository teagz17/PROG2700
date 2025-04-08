/*
let route_list = [
];

function manual_publish() {
    let route_name = document.getElementById('route_name').value;
    let pickup_info = document.getElementById('pickup_info').value;
    let pickup_time = document.getElementById('pickup_time').value;
    let dropoff_info = document.getElementById('dropoff_info').value;
    let dropoff_time = document.getElementById('dropoff_time').value;
    let route_stops = document.getElementById('route_stops').value;
    let new_route = [route_name, pickup_info, pickup_time, dropoff_info, dropoff_time, route_stops];
    route_list.push(new_route);
    console.log(route_list);
}
*/

var table = document.getElementById('route_table');

var edit_route = document.createElement('edit_route');
edit_route.innerHTML = 'Edit';

var delete_route = document.createElement('delete_route');
delete_route.innerHTML = 'Delete'

function manual_publish() {
    let route_name = document.getElementById('route_name').value;
    let pickup_info = document.getElementById('pickup_info').value;
    let pickup_time = document.getElementById('pickup_time').value;
    let dropoff_info = document.getElementById('dropoff_info').value;
    let dropoff_time = document.getElementById('dropoff_time').value;
    if (route_name && pickup_info && pickup_time && dropoff_info && dropoff_time) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        cell1.innerHTML = route_name;
        cell2.innerHTML = pickup_info;
        cell3.innerHTML = pickup_time;
        cell4.innerHTML = dropoff_info;
        cell5.innerHTML = dropoff_time;
    }

}

