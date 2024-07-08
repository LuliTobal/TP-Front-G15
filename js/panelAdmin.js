document.addEventListener('DOMContentLoaded', function() {
    // Funciones para crear las tablas
    function crearTablaUsuarios() {
        var tabla = document.createElement('table');
        tabla.classList.add('lista_usuarios');
        tabla.id = 'tablaUsuario';

        tabla.innerHTML = `
            <thead>
                <tr class="categorias_tabla">
                    <th>Usuario</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Mail</th>
                    <th>Teléfono</th>
                    <th></th>
                </tr>
            </thead>
            <tbody class="cuerpo_tabla">
                <tr class="tarjeta_tabla">
                    <td>juanitoP96</td>
                    <td>Juan</td>
                    <td>Perez</td>
                    <td>juaniperez_96@hotmail.com</td>
                    <td>3512112236</td>
                    <td><button class=" "><img src="../img/delete_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" alt=""></button></td>
                </tr>
            </tbody>
        `;

        return tabla;
    }

    function crearTablaVentas() {
        var tabla = document.createElement('table');
        tabla.classList.add('lista_usuarios');
        tabla.id = 'tablaVentas';

        tabla.innerHTML = `
            <thead>
                <tr class="categorias_tabla">
                    <th>Orden</th>
                    <th>Fecha</th>
                    <th>Productos</th>
                    <th>Total</th>
                    <th>Cliente</th>
                    <th>Mail</th>
                    <th>Teléfono</th>
                </tr>
            </thead>
            <tbody class="cuerpo_tabla">
                <tr class="tarjeta_tabla">
                    <td>#12345</td>
                    <td>01/02/2024</td>
                    <td>Zapatilla Adidas</td>
                    <td>$123.456</td>
                    <td>Juan Perez</td>
                    <td>juaniperez_96@hotmail.com</td>
                    <td>3512112236</td>
                </tr>
            </tbody>
        `;

        return tabla;
    }

    function crearTablaProductos() {
        var tabla = document.createElement('table');
        tabla.classList.add('lista_usuarios');
        tabla.id = 'tablaProductos';

        tabla.innerHTML = `
            <thead>
                <tr class="categorias_tabla">
                    <th></th>
                    <th>Productos</th>
                    <th>Stock</th>
                    <th>Precio</th>
                    <th>Categoría</th>
                    <th>Género</th>
                    <th>Talle</th>
                    <th><button class="agregar_producto">Agregar nuevo</button></th>
                </tr>
            </thead>
            <tbody class="cuerpo_tabla">
                <tr class="tarjeta_tabla">
                    <td><img src="../img/c77c2a06864ac9aca38dc5bd9371de015471edcdbf322dfb14411689bf968ae5.jpg" alt="" class="img_producto"></td>
                    <td>Zapatilla Fulano</td>
                    <td>1</td>
                    <td>$123.456</td>
                    <td>Zapatilla</td>
                    <td>Unisex</td>
                    <td>36</td>
                    <td><img src="../img/edit_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" alt=""></td>
                </tr>
            </tbody>
        `;

        return tabla;
    }

    // Función para ocultar todas las tablas
    function ocultarTodasLasTablas() {
        var tablas = document.querySelectorAll('.lista_usuarios');
        tablas.forEach(function(tabla) {
            tabla.style.display = 'none';
        });
    }

    // Funciones para mostrar las tablas según el clic en la barra de navegación
    function mostrarTablaUsuarios() {
        ocultarTodasLasTablas();
        var tablaUsuarios = crearTablaUsuarios();
        document.querySelector('.tabla_usuarios').appendChild(tablaUsuarios);
        cambiarEstiloItemSeleccionado('usuarios'); // Cambiar estilo del ítem
    }

    function mostrarTablaVentas() {
        ocultarTodasLasTablas();
        var tablaVentas = crearTablaVentas();
        document.querySelector('.tabla_usuarios').appendChild(tablaVentas);
        cambiarEstiloItemSeleccionado('ventas'); // Cambiar estilo del ítem
    }

    function mostrarTablaProductos() {
        ocultarTodasLasTablas();
        var tablaProductos = crearTablaProductos();
        document.querySelector('.tabla_usuarios').appendChild(tablaProductos);
        cambiarEstiloItemSeleccionado('productos'); // Cambiar estilo del ítem
    }

    //funcionparaelcambiodeestilo

    function cambiarEstiloItemSeleccionado(itemId) {
        // Obtener todos los ítems de la barra de navegación
        var itemsNav = document.querySelectorAll('.item_nav');

        // Remover la clase .item_nav_selected de todos los ítems
        itemsNav.forEach(function(item) {
            item.classList.remove('item_nav_selected');
        });

        // Agregar la clase .item_nav_selected al ítem seleccionado
        var itemSeleccionado = document.getElementById(itemId);
        itemSeleccionado.classList.add('item_nav_selected');
    }

    // Asignar eventos de clic a los elementos de la barra de navegación
    document.getElementById('usuarios').addEventListener('click', function() {
        mostrarTablaUsuarios();
    });

    document.getElementById('ventas').addEventListener('click', function() {
        mostrarTablaVentas();
    });

    document.getElementById('productos').addEventListener('click', function() {
        mostrarTablaProductos();
    });

    // Mostrar la tabla de usuarios por defecto al cargar la página
    mostrarTablaUsuarios();
});
