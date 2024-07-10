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
                    <td><button class="boton_eliminar"><img src="../img/delete_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" alt=""></button></td>
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
                    <th class="agregar_producto" id="nuevo_producto">Agregar nuevo</th>
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
                    <td class="agregar_producto" id="editar_producto"><img src="../img/edit_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" alt=""></td>
                </tr>
            </tbody>
        `;

        return tabla;
    }

    function crearModalNuevo() {
        var modal = document.createElement('div');
        modal.classList.add('modal');
        modal.id = 'modal_agregar';

        modal.innerHTML = `
            <section class="modal" id="modal_agregar">
                <div class="modal_container">
                    <form class="modal_form form_registro" id="form_registro">
                        <div class="imagen">
                            <label for="imageInput">Foto del producto</label>
                            <input type="file" id="imageInput" accept="image/*" class="registro_inputs">
                            <img id="preview" src="" alt="">
                        </div>
                        <div class="producto">
                            <label for="producto">Producto</label>
                            <input type="text" id="producto" placeholder="Producto" class="registro_inputs">
                        </div>
                        <div class="categoria">
                            <label for="categorias">Categoria de producto</label>
                            <select id="categorias" name="opciones" class="registro_inputs">
                                <option value="opcion1">Elementos de entrenamiento</option>
                                <option value="opcion2">Suplementos</option>
                                <option value="opcion3">Merchandising</option>
                                <option value="opcion4">Indumentaria deportiva</option>
                            </select>
                        </div>
                        <div class="genero">
                            <label for="generos">Género</label>
                            <select id="generos" name="opciones" class="registro_inputs">
                                <option value="opcion5">Hombre</option>
                                <option value="opcion6">Mujer</option>
                                <option value="opcion7">Unisex</option>
                            </select>
                        </div>
                        <div class="talle">
                            <label for="talle">Talle</label>
                            <input type="text" id="talle" name="talle" placeholder="Talle" class="registro_inputs">
                        </div>
                        <div class="stock">
                            <label for="stock">Stock</label>
                            <input type="number" id="stock" name="quantity" value="0" class="registro_inputs">
                        </div>
                        <div class="precio">
                            <label for="precio">Precio</label>
                            <input type="number" name="precio" id="precio" class="registro_inputs">
                        </div>
                        <input type="submit" value="Agregar producto" class="registro_btn">
                    </form>
                    <a href="#" class="cierreModalR" id="cerrar_modal">X</a>
                </div>
            </section>
        `;

        return modal;
    }

    function crearModalEdit() {
        var modalEdit = document.createElement('div');
        modalEdit.classList.add('modal');
        modalEdit.id = 'modal_editar';
    
        modalEdit.innerHTML = `
            <section class="modal" id="modal_editar">
                <div class="modal_container">
                    <form class="modal_form form_registro" id="form_registro">
                        <div class="imagen">
                            <label for="imageInput">Foto del producto</label>
                            <input type="file" id="imageInput" accept="image/*" class="registro_inputs">
                            <img id="preview" src="" alt="">
                        </div>
                        <div class="producto">
                            <label for="producto">Producto</label>
                            <input type="text" id="producto" placeholder="Producto" class="registro_inputs">
                        </div>
                        <div class="categoria">
                            <label for="categorias">Categoria de producto</label>
                            <select id="categorias" name="opciones" class="registro_inputs">
                                <option value="opcion1">Elementos de entrenamiento</option>
                                <option value="opcion2">Suplementos</option>
                                <option value="opcion3">Merchandising</option>
                                <option value="opcion4">Indumentaria deportiva</option>
                            </select>
                        </div>
                        <div class="genero">
                            <label for="generos">Género</label>
                            <select id="generos" name="opciones" class="registro_inputs">
                                <option value="opcion5">Hombre</option>
                                <option value="opcion6">Mujer</option>
                                <option value="opcion7">Unisex</option>
                            </select>
                        </div>
                        <div class="talle">
                            <label for="talle">Talle</label>
                            <input type="text" id="talle" name="talle" placeholder="Talle" class="registro_inputs">
                        </div>
                        <div class="stock">
                            <label for="stock">Stock</label>
                            <input type="number" id="stock" name="quantity" value="0" class="registro_inputs">
                        </div>
                        <div class="precio">
                            <label for="precio">Precio</label>
                            <input type="number" name="precio" id="precio" class="registro_inputs">
                        </div>
                        <input type="submit" value="Guardar cambios" class="registro_btn">
                    </form>
                    <a href="#" class="cierreModalR" id="cerrar_modal">X</a>
                </div>
            </section>
        `;

        return modalEdit;
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
        agregarEventoNuevoProducto();//////////////////////////////////////////////////////////////agregado para Modal///////////////////////////////
        agregarEventoEditProducto()
    }

    function mostrarModalNuevo() {
        var modalCargar = crearModalNuevo();
        document.querySelector('.modal_agregar').appendChild(modalCargar);
        ///////////////////////////////////////////////////////////////////AGREGADO//////////////////////////////////////////////////////////////
        var cerrarBtn = document.getElementById('cerrar_modal');
        cerrarBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Para prevenir actividades por defecto
            modalCargar.style.display = 'none'; // Ocultar modal
        });

        modalCargar.style.display = 'flex';
    }

    function mostrarModalEdit() {
        var modalEdit = crearModalEdit();
        document.querySelector('.modal_agregar').appendChild(modalEdit);
        ///////////////////////////////////////////////////////////////////AGREGADO//////////////////////////////////////////////////////////////
        var cerrarBtn = document.getElementById('cerrar_modal');
        cerrarBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Para prevenir actividades por defecto
            modalEdit.style.display = 'none'; // Ocultar modal
        });

        modalEdit.style.display = 'flex';
    }
         ///////////////////////////////////////////////////////////////////AGREGADO//////////////////////////////////////////////////////////////
    function agregarEventoNuevoProducto() {
        var nuevoProductoBtn = document.getElementById('nuevo_producto');
        if (nuevoProductoBtn) {
            nuevoProductoBtn.addEventListener('click', function() {
                mostrarModalNuevo();
            });
        }
    }

    function agregarEventoEditProducto() {
        var editProductoBtn = document.getElementById('editar_producto');
        if (editProductoBtn) {
            editProductoBtn.addEventListener('click', function() {
                mostrarModalEdit();
            });
        }
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

    document.getElementById('nuevo_producto').addEventListener('click', function() {
         mostrarModalNuevo();
        // modal.classList.add('modalShow');
    });


    document.getElementById('cerrar_modal').addEventListener('click', function() {
         e.preventDefault(); //para prevenir actividades por defecto
         modal.classList.remove('modal'); //modal entre a sus clases y saque la clase donde se muestra (modalShow)
    })
    
    document.getElementById('editar_producto').addEventListener('click', function() {
        mostrarModalEdit();
       // modal.classList.add('modalShow');
    });


    document.getElementById('cerrar_modal').addEventListener('click', function() {
        e.preventDefault(); //para prevenir actividades por defecto
        modal.classList.remove('modal'); //modal entre a sus clases y saque la clase donde se muestra (modalShow)
    })

    // Mostrar la tabla de usuarios por defecto al cargar la página
    mostrarTablaUsuarios();
});
