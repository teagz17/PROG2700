document.addEventListener('DOMContentLoaded', () => {
    // Initialize main container
    const main = document.querySelector('main');
    main.innerHTML = `
        <div class="main-container">
            <div class="upload-section">
                <input type="file" id="fileUpload" accept=".txt">
                <label for="fileUpload" class="button">Upload Routes</label>
            </div>
            
            <form id="routeForm">
                <input type="text" id="routeId" placeholder="Route ID" required>
                <input type="text" id="shortName" placeholder="Short Name" required>
                <input type="text" id="longName" placeholder="Long Name">
                <button type="submit">Add Route</button>
            </form>

            <div id="tableContainer">
                <table id="routesTable">
                    <thead>
                        <tr>
                            <th>Route ID</th>
                            <th>Short Name</th>
                            <th>Long Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="routesBody"></tbody>
                </table>
            </div>
        </div>
    `;

    let routes = JSON.parse(localStorage.getItem('routes')) || [];
    const routesBody = document.getElementById('routesBody');

    // Load initial routes
    renderRoutes();

    // File upload handler
    document.getElementById('fileUpload').addEventListener('change', handleFileUpload);

    // Form submission handler
    document.getElementById('routeForm').addEventListener('submit', addNewRoute);

    // Event delegation for edit/delete buttons
    routesBody.addEventListener('click', handleTableActions);

    function renderRoutes() {
        routesBody.innerHTML = '';
        routes.forEach((route, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${route.route_id}</td>
                <td>${route.route_short_name}</td>
                <td>${route.route_long_name}</td>
                <td id="tableBtns">
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;
            routesBody.appendChild(row);
        });
    }

    function handleFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const csvData = event.target.result.split('\n').slice(1);
            const newRoutes = csvData.map(line => {
                const [route_id, agency_id, route_short_name, route_long_name] = line.split(',');
                return {
                    route_id: route_id?.trim(),
                    agency_id: agency_id?.trim() || 'DTA',
                    route_short_name: route_short_name?.trim(),
                    route_long_name: route_long_name?.trim(),
                    route_type: '3'
                };
            });

            newRoutes.forEach(route => {
                if (!route.route_id || !route.route_short_name) return;
                if (!routes.some(r => r.route_id === route.route_id)) {
                    routes.push(route);
                }
            });

            updateStorage();
            renderRoutes();
        };
        reader.readAsText(file);
    }

    function addNewRoute(e) {
        e.preventDefault();
        const routeId = document.getElementById('routeId').value.trim();
        const shortName = document.getElementById('shortName').value.trim();
        const longName = document.getElementById('longName').value.trim();

        if (!routeId || !shortName) {
            alert('Route ID and Short Name are required!');
            return;
        }

        if (routes.some(r => r.route_id === routeId)) {
            alert('Route ID must be unique!');
            return;
        }

        routes.push({
            route_id: routeId,
            agency_id: 'DTA',
            route_short_name: shortName,
            route_long_name: longName,
            route_type: '3'
        });

        updateStorage();
        renderRoutes();
        e.target.reset();
    }

    function handleTableActions(e) {
        const index = e.target.dataset.index;
        
        if (e.target.classList.contains('delete')) {
            routes.splice(index, 1);
            updateStorage();
            renderRoutes();
        }
        
        if (e.target.classList.contains('edit')) {
            const newName = prompt('Edit Long Name:', routes[index].route_long_name);
            if (newName !== null) {
                routes[index].route_long_name = newName.trim();
                updateStorage();
                renderRoutes();
            }
        }
    }

    function updateStorage() {
        localStorage.setItem('routes', JSON.stringify(routes));
    }
});