document.addEventListener('DOMContentLoaded', function() {
    generateHeader(3);
    generateFooter();
    mostrarTablaUsuarios(); // Mostrar la tabla de usuarios por defecto al cargar la página
});

async function eliminarUsuario(id) {
    try {
        const response = await fetch(`https://grupo15cac.pythonanywhere.com/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Éxito!',
                text: '¡El usuario se eliminó correctamente!',
                confirmButtonText: 'Aceptar',
                background: '#222222',
                customClass: {
                  title: 'swal2-personalizar-texto',
                  confirmButton: 'swal2-personalizar-boton'
                }
              });
            mostrarTablaUsuarios();
        } else {
            console.error('Error al eliminar el usuario:', data.error);
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
}

async function eliminarProducto(id) {
    try {
        const response = await fetch(`https://grupo15cac.pythonanywhere.com/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Éxito!',
                text: '¡El producto se eliminó correctamente!',
                confirmButtonText: 'Aceptar',
                background: '#222222',
                customClass: {
                  title: 'swal2-personalizar-texto',
                  confirmButton: 'swal2-personalizar-boton'
                }
              });
            mostrarTablaProductos();
        } else {
            console.error('Error al eliminar el producto:', data.error);
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
}


function mostrarTablaUsuarios() {
    ocultarTodasLasTablas();
    var tablaUsuarios = crearTablaUsuarios();
    document.querySelector('.tabla_usuarios').appendChild(tablaUsuarios);
    cambiarEstiloItemSeleccionado('usuarios'); // Cambiar estilo del ítem
}

async function mostrarTablaVentas() {
    ocultarTodasLasTablas();
    var tablaVentas = await crearTablaVentas(); // Utiliza await para resolver la promesa
    document.querySelector('.tabla_usuarios').appendChild(tablaVentas);
    cambiarEstiloItemSeleccionado('ventasContainer');
}

async function mostrarTablaProductos() {
    ocultarTodasLasTablas();
    var tablaProductos = await crearTablaProductos();
    document.querySelector('.tabla_usuarios').appendChild(tablaProductos);
    cambiarEstiloItemSeleccionado('productos'); // Cambiar estilo del ítem
    agregarEventosProductos(); // Agregar eventos para productos después de añadir la tabla al DOM
}

function ocultarTodasLasTablas() {
    var tablas = document.querySelectorAll('.lista_usuarios');
    tablas.forEach(function(tabla) {
        tabla.style.display = 'none';
    });

    // Eliminar modales anteriores si existen
    var modales = document.querySelectorAll('.modal');
    modales.forEach(function(modal) {
        modal.remove();
    });
}

function crearTablaUsuarios() {
    // Crear la tabla y añadir las clases e ID
    var tabla = document.createElement('table');
    tabla.classList.add('lista_usuarios');
    tabla.id = 'tablaUsuario';

    // Crear el encabezado de la tabla
    tabla.innerHTML = `
        <thead>
            <tr class="categorias_tabla">
                <th></th>
                <th>Usuario</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Dirección</th>
                <th>Mail</th>
                <th>Teléfono</th>
                <th></th>
            </tr>
        </thead>
        <tbody class="cuerpo_tabla"></tbody>
    `;

    // Obtener el cuerpo de la tabla
    var cuerpoTabla = tabla.querySelector('.cuerpo_tabla');

    // Realizar la solicitud a la API para obtener los usuarios
    fetch('https://grupo15cac.pythonanywhere.com/api/users')
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                // Crear una fila por cada usuario
                var fila = document.createElement('tr');
                fila.classList.add('tarjeta_tabla');
                let img;
                if(user.image){
                    img = user.image
                } else {
                    img = '../img/account_circle.png';
                }
                // Añadir las celdas a la fila
                fila.innerHTML = `
                    <td><img src="${img}" alt="Imagen de ${user.username}" class="img_usuario"></td>
                    <td>${user.username}</td>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td>${user.address}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td><button class="boton_eliminar" onclick="eliminarUsuario(${user.id})"><img src="../img/delete_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" alt="Eliminar"></button></td>
                `;

                // Añadir la fila al cuerpo de la tabla
                cuerpoTabla.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error al obtener los usuarios:', error);
        });

    return tabla;
}


async function crearTablaVentas() {
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
        <tbody class="cuerpo_tabla"></tbody>
    `;

    var cuerpoTabla = tabla.querySelector('.cuerpo_tabla');

    try {
        const response = await fetch('https://grupo15cac.pythonanywhere.com/api/transactions');
        const data = await response.json();

        for (const transaction of data) {
            const userResponse = await fetch(`https://grupo15cac.pythonanywhere.com/api/users/${transaction.id_user}`);
            const userData = await userResponse.json();

            var fila = document.createElement('tr');
            fila.classList.add('tarjeta_tabla');

            // Crear una lista de productos con cantidad en una nueva línea
            var productos = transaction.products.map(product => `
                ${product.name}<br>
                <small>Cantidad: ${product.cantidad}</small>
            `).join('<br>');

            // Añadir las celdas a la fila
            fila.innerHTML = `
                <td>#${transaction.id}</td>
                <td>${new Date(transaction.date).toLocaleDateString()}</td>
                <td>${productos}</td>
                <td>$${transaction.products.reduce((acc, product) => acc + (product.price * product.cantidad), 0).toFixed(2)}</td>
                <td>${userData.first_name} ${userData.last_name}</td>
                <td>${userData.email}</td>
                <td>${userData.phone}</td>
            `;

            cuerpoTabla.appendChild(fila);
        }
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
    }

    return tabla;
}

async function crearTablaProductos() {
    // Verificar si ya existe la tabla de productos y eliminarla si es necesario
    var tablaExistente = document.getElementById('tablaProductos');
    if (tablaExistente) {
        tablaExistente.remove();
    }
    
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
                <th colspan="2"><span id="nuevo_producto" class="agregar_producto2">Nuevo</span></th>
            </tr>
        </thead>
        <tbody class="cuerpo_tabla"></tbody>
    `;

    // Obtener el cuerpo de la tabla
    var cuerpoTabla = tabla.querySelector('.cuerpo_tabla');

    try {
        // Fetch para obtener productos, categorías y géneros
        const [productsResponse, categoriesResponse, gendersResponse] = await Promise.all([
            fetch('https://grupo15cac.pythonanywhere.com/api/products'),
            fetch('https://grupo15cac.pythonanywhere.com/api/categories'),
            fetch('https://grupo15cac.pythonanywhere.com/api/genders')
        ]);

        const [productsData, categoriesData, gendersData] = await Promise.all([
            productsResponse.json(),
            categoriesResponse.json(),
            gendersResponse.json()
        ]);

        // Crear un mapa para las categorías y géneros
        const categoriesMap = new Map(categoriesData.map(category => [category.id, category.name]));
        const gendersMap = new Map(gendersData.map(gender => [gender.id, gender.name]));

        productsData.forEach(product => {
            // Crear una fila por cada producto
            var fila = document.createElement('tr');
            fila.classList.add('tarjeta_tabla');

            // Añadir las celdas a la fila
            fila.innerHTML = `
                <td><img src="${product.image}" alt="" class="img_producto"></td>
                <td>${product.name}</td>
                <td>${product.stock}</td>
                <td>${product.price}</td>
                <td>${categoriesMap.get(product.id_category)}</td>
                <td>${gendersMap.get(product.id_gender)}</td>
                <td>${product.sizes.map(size => size.name).join(', ')}</td>
                <td><span class="agregar_producto"><img src="../img/edit_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" alt="" id="editar_producto_${product.id}"></span></td>
                <td><span class="agregar_producto"><button class="boton_eliminar" onclick="eliminarProducto(${product.id})"><img src="../img/delete_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" alt="Eliminar"></button></span></td>
            `;

            // Añadir la fila al cuerpo de la tabla
            cuerpoTabla.appendChild(fila);
        });

        // Añadir la tabla al DOM
        document.querySelector('.tabla_usuarios').appendChild(tabla);

        productsData.forEach(product => {
            document.getElementById(`editar_producto_${product.id}`).addEventListener('click', function(event) {
                event.preventDefault();
                
                var modalEditar = crearModalEdit(product);
                
                if (modalEditar && modalEditar.nodeType === Node.ELEMENT_NODE) {
                    document.body.appendChild(modalEditar);
                }
            });
        });

    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }

    return tabla;
}


async function crearModalNuevo() {
    var modal = document.createElement('div');
    modal.classList.add('modal');
    modal.id = 'modal_agregar';

    modal.innerHTML = `
        <section class="modal" id="modal_agregar">
            <div class="modal_container">
                <form class="modal_form form_registro" id="form_registro" enctype="multipart/form-data">
                    <div class="imagen">
                        <label for="imageInput">Foto del producto</label>
                        <input type="file" id="imageInput" name="image" accept="image/*" class="registro_inputs">
                        <img id="preview" src="" alt="">
                    </div>
                    <div class="producto">
                        <label for="producto">Producto</label>
                        <input type="text" id="producto" name="name" placeholder="Producto" class="registro_inputs">
                    </div>
                    <div class="producto">
                        <label for="descripcion">Descripción</label>
                        <input type="text" id="descripcion" name="description" placeholder="Descripción" class="registro_inputs">
                    </div>
                    <div class="categoria">
                        <label for="categorias">Categoria de producto</label>
                        <select id="categorias" name="id_category" class="registro_inputs">
                            <option value="1">Elementos de entrenamiento</option>
                            <option value="2">Suplementos</option>
                            <option value="3">Merchandising</option>
                            <option value="4">Indumentaria deportiva</option>
                        </select>
                    </div>
                    <div class="genero">
                        <label for="generos">Género</label>
                        <select id="generos" name="id_gender" class="registro_inputs">
                            <option value="1">Hombre</option>
                            <option value="2">Mujer</option>
                            <option value="3">Unisex</option>
                        </select>
                    </div>
                    <div class="talle">
                            <label for="talle">Talle</label>
                            <select id="talle" name="sizes" multiple class="registro_inputs">
                                <!-- Aquí puedes generar las opciones dinámicamente si lo necesitas -->
                                <!-- Ejemplo estático de opciones -->
                                <option value="1">XS</option>
                                <option value="2">S</option>
                                <option value="3">M</option>
                                <option value="4">L</option>
                                <option value="5">XL</option>
                                <option value="6">36</option>
                                <option value="7">37</option>
                                <option value="8">38</option>
                                <option value="9">39</option>
                                <option value="10">40</option>
                                <option value="11">41</option>
                                <option value="12">42</option>
                                <option value="13">43</option>
                            </select>
                        </div>
                    <div class="stock">
                        <label for="stock">Stock</label>
                        <input type="number" id="stock" name="stock" value="0" class="registro_inputs">
                    </div>
                    <div class="precio">
                        <label for="precio">Precio</label>
                        <input type="number" name="price" id="precio" class="registro_inputs">
                    </div>
                    <input type="submit" value="Agregar producto" class="registro_btn">
                </form>
                <a href="#" class="cierreModalR" id="cerrar_modal_agregar">X</a>
            </div>
        </section>
    `;

    document.body.appendChild(modal);

    // Agregar evento para cerrar el modal
    var cerrarModal = modal.querySelector('#cerrar_modal_agregar');
    cerrarModal.addEventListener('click', function() {
        modal.remove();
    });

    // Agregar evento para el formulario de agregar producto
    var formRegistro = modal.querySelector('#form_registro');
    formRegistro.addEventListener('submit', async function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe por defecto
        var formData = new FormData(formRegistro);
        formData.forEach((value, key) => {
            console.log(key, value); // key es el nombre del campo, value es el valor
        });
        try {
            const response = await fetch('https://grupo15cac.pythonanywhere.com/api/products', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito!',
                    text: '¡El producto se registró correctamente!',
                    confirmButtonText: 'Aceptar',
                    background: '#222222',
                    customClass: {
                      title: 'swal2-personalizar-texto',
                      confirmButton: 'swal2-personalizar-boton'
                    }
                  });
                modal.remove(); // Cerrar el modal
                mostrarTablaProductos(); // Actualizar la tabla de productos
            } else {
                console.error('Error al agregar el producto:', result.message);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    });

    return modal;
}

async function populateSelectOptions(apiUrl, selectId, selectedId) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${apiUrl}`);
        }
        const data = await response.json();
        const select = document.getElementById(selectId);
        if (!select) {
            throw new Error(`Select element with id '${selectId}' not found`);
        }

        // Clear existing options
        select.innerHTML = '';

        // Populate options
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.text = item.name;
            if (item.id === selectedId) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error populating select options:', error);
    }
}

async function crearModalEdit(prod) {
    try {
        // Fetch the product data from the API
        const response = await fetch(`https://grupo15cac.pythonanywhere.com/api/products/${prod.id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch product data for ID ${prod.id}`);
        }
        const product = await response.json();

        var modalEdit = document.createElement('div');
        modalEdit.classList.add('modal');
        modalEdit.id = 'modal_editar';

        modalEdit.innerHTML = `
            <section class="modal" id="modal_editar">
                <div class="modal_container">
                    <form class="modal_form form_edicion" id="form_edicion_${product.id}" enctype="multipart/form-data">
                        <div class="imagen">
                            <label for="imageInput">Foto del producto</label>
                            <input type="file" id="imageInput" name="image" accept="image/*" class="registro_inputs">
                            <img id="preview" src="${product.image}" alt="">
                        </div>
                        <div class="producto">
                            <label for="producto">Producto</label>
                            <input type="text" id="producto" name="name" value="${product.name}" class="registro_inputs">
                        </div>
                        <div class="categoria">
                            <label for="categorias">Categoria de producto</label>
                            <select id="categorias" name="id_category" class="registro_inputs">
                                <!-- Options will be populated dynamically -->
                            </select>
                        </div>
                        <div class="genero">
                            <label for="generos">Género</label>
                            <select id="generos" name="id_gender" class="registro_inputs">
                                <!-- Options will be populated dynamically -->
                            </select>
                        </div>
                         <div class="talle">
                            <label for="talle">Talle</label>
                            <select id="talle" name="sizes" multiple class="registro_inputs">
                                <!-- Options will be populated dynamically -->
                            </select>
                        </div>
                        <div class="stock">
                            <label for="stock">Stock</label>
                            <input type="number" id="stock" name="stock" value="${product.stock}" class="registro_inputs">
                        </div>
                        <div class="precio">
                            <label for="precio">Precio</label>
                            <input type="number" name="price" id="precio" value="${product.price}" class="registro_inputs">
                        </div>
                        <input type="submit" value="Editar producto" class="registro_btn">
                    </form>
                    <a href="#" class="cierreModalR" id="cerrar_modal_editar">X</a>
                </div>
            </section>
        `;

        // Append modal to body
        document.body.appendChild(modalEdit);

        // Populate categories and genders dynamically
        await populateSelectOptions('https://grupo15cac.pythonanywhere.com/api/categories', 'categorias', product.id_category);
        await populateSelectOptions('https://grupo15cac.pythonanywhere.com/api/genders', 'generos', product.id_gender);
        await populateSizesOptions(product.sizes);

        // Agregar evento para cerrar el modal
        var cerrarModal = modalEdit.querySelector('#cerrar_modal_editar');
        cerrarModal.addEventListener('click', function() {
            modalEdit.remove();
        });

        var imageInput = modalEdit.querySelector('#imageInput');
        var previewImage = modalEdit.querySelector('#preview');
        imageInput.addEventListener('change', function() {
            var file = imageInput.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });

        // Agregar evento para el formulario de editar producto
        var formEdicion = modalEdit.querySelector(`#form_edicion_${product.id}`);
        formEdicion.addEventListener('submit', async function(event) {
            event.preventDefault(); // Evitar que el formulario se envíe por defecto
            var formData = new FormData(formEdicion);
            try {
                const response = await fetch(`https://grupo15cac.pythonanywhere.com/api/products/${product.id}`, {
                    method: 'PUT',
                    body: formData
                });

                const result = await response.json();
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito!',
                        text: '¡El producto se modificó correctamente!',
                        confirmButtonText: 'Aceptar',
                        background: '#222222',
                        customClass: {
                          title: 'swal2-personalizar-texto',
                          confirmButton: 'swal2-personalizar-boton'
                        }
                      });
                    modalEdit.remove(); // Cerrar el modal
                    // Actualizar la tabla de productos
                    mostrarTablaProductos();
                } else {
                    console.error('Error al editar el producto:', result.Mensaje);
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        });
    } catch (error) {
        console.error('Error en crearModalEdit:', error);
    }
}

async function populateSizesOptions(selectedSizes) {
    try {
        const response = await fetch('https://grupo15cac.pythonanywhere.com/api/sizes');
        if (!response.ok) {
            throw new Error(`Failed to fetch sizes data`);
        }
        const sizes = await response.json();
        const select = document.getElementById('talle');
        if (!select) {
            throw new Error(`Select element with id 'talle' not found`);
        }

        // Clear existing options
        select.innerHTML = '';

        // Populate options
        sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size.id;
            option.text = size.name;
            if (selectedSizes && selectedSizes.some(selectedSize => selectedSize.id === size.id)) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error populating sizes options:', error);
    }
}

function agregarEventoNuevoProducto() {
    var botonAgregar = document.getElementById('nuevo_producto');
    if (botonAgregar) {
        botonAgregar.addEventListener('click', function(event) {
            event.preventDefault(); // Evitar que el formulario se envíe por defecto
            var modalNuevo = crearModalNuevo();
            if (modalNuevo && modalNuevo.nodeType === Node.ELEMENT_NODE) {
                document.body.appendChild(modalNuevo);
            } 
        });
    }
}

function agregarEventoEditProducto() {
    var botonEditar = document.getElementById('editar_producto');
    if (botonEditar) {
        botonEditar.addEventListener('click', function(event) {
            event.preventDefault(); // Evitar que el formulario se envíe por defecto
            var modalEditar = crearModalEdit();
            if (modalEditar && modalEditar.nodeType === Node.ELEMENT_NODE) {
                document.body.appendChild(modalEditar);
            }   
        });
    }
}

function agregarEventosProductos() {
    agregarEventoNuevoProducto();
    agregarEventoEditProducto();
}

function cambiarEstiloItemSeleccionado(item) {
    // Reseteamos estilos
    var items = document.querySelectorAll('.item_menu');
    items.forEach(function(item) {
        item.classList.remove('item_seleccionado');
    });

    // Aplicamos estilo al ítem seleccionado
    document.getElementById(item).classList.add('item_seleccionado');
}

document.getElementById('usuarios').addEventListener('click', function() {
    mostrarTablaUsuarios();
});

document.getElementById('ventasContainer').addEventListener('click', function() {
    mostrarTablaVentas();
});

document.getElementById('productos').addEventListener('click', function() {
    mostrarTablaProductos();
});

// Función para asignar eventos de click a los productos
function asignarEventosProductos() {
    // Seleccionar todos los elementos de producto (por clase, id, o como los obtengas)
    let productos = document.querySelectorAll('.producto');

    productos.forEach(producto => {
        // Asignar evento de click a cada producto
        producto.addEventListener('click', function() {
            // Lógica para manejar el click en el producto seleccionado
            console.log('Producto clickeado:', producto.id);
            // Aquí puedes implementar la lógica para mostrar detalles o hacer alguna acción
        });
    });
}

// Llamar a la función para asignar eventos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    asignarEventosProductos();
    agregarEventosProductos();
});
