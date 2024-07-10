document.addEventListener('DOMContentLoaded', function() {
    
    function fetchUsuarios() {
        fetch('http://127.0.0.1:5000/api/users')
            .then(response => response.json())
            .then(data => {
                mostrarTablaUsuarios(data); // Llama a la función para mostrar la tabla con los datos obtenidos
            })
            .catch(error => console.error('Error al obtener usuarios:', error));
    }

    // Función para crear la tabla de usuarios dinámicamente
    function crearTablaUsuarios(usuarios) {
        var tabla = document.createElement('table');
        tabla.classList.add('lista_usuarios');
        tabla.id = 'tablaUsuario';

        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');

        // Encabezados de la tabla
        var headers = ['Usuario', 'Nombre', 'Apellido', 'Mail', 'Teléfono', 'Acciones'];
        var headerRow = document.createElement('tr');
        headers.forEach(headerText => {
            var th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Cuerpo de la tabla
        usuarios.forEach(usuario => {
            var tr = document.createElement('tr');
            var columns = ['username', 'first_name', 'last_name', 'email', 'phone'];

            columns.forEach(column => {
                var td = document.createElement('td');
                td.textContent = usuario[column];
                tr.appendChild(td);
            });

            var actionsTd = document.createElement('td');
            var deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.addEventListener('click', function() {
                // Lógica para eliminar usuario
                eliminarUsuario(usuario.id);
            });
            actionsTd.appendChild(deleteBtn);
            tr.appendChild(actionsTd);

            tbody.appendChild(tr);
        });

        tabla.appendChild(thead);
        tabla.appendChild(tbody);

        return tabla;
    }

    function mostrarTablaUsuarios(usuarios) {
        ocultarTodasLasTablas();
        var tablaUsuarios = crearTablaUsuarios(usuarios);
        document.querySelector('.tabla_usuarios').appendChild(tablaUsuarios);
        cambiarEstiloItemSeleccionado('usuarios');
    }

    function ocultarTodasLasTablas() {
        var tablas = document.querySelectorAll('.lista_usuarios');
        tablas.forEach(function(tabla) {
            tabla.style.display = 'none';
        });
    }

    function cambiarEstiloItemSeleccionado(itemId) {
        var itemsNav = document.querySelectorAll('.item_nav');
        itemsNav.forEach(function(item) {
            item.classList.remove('item_nav_selected');
        });
        var itemSeleccionado = document.getElementById(itemId);
        itemSeleccionado.classList.add('item_nav_selected');
    }

    // Función para eliminar un usuario
    function eliminarUsuario(idUsuario) {
        fetch(`http://127.0.0.1:5000/api/users/${idUsuario}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            // Lógica después de eliminar, si es necesario
            console.log('Usuario eliminado:', data);
            // Actualizar la tabla o realizar alguna acción adicional si es necesario
        })
        .catch(error => console.error('Error al eliminar usuario:', error));
    }

    
    fetchUsuarios();
    generateHeader(3);
});
