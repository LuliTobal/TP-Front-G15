///////////////////////////////////////////PARA ABRIR Y CERRAR EL MODAL DEL LOG IN//////////////////////////// 
if (localStorage.getItem('logueado') === null) {
    localStorage.setItem('logueado', false);
}  

document.addEventListener('DOMContentLoaded', function() {
    const logueado = localStorage.getItem('logueado') === 'true';
    generateFooter();
    if (logueado) {
        generateHeader(2);

        const btnTienda = document.querySelector('#action-button');

        btnTienda.addEventListener('click', (e)=>{ 
            e.preventDefault(); 
            window.location.href = '../html/tienda.html'; 
        })

    } else {
        generateHeader(1); 
 
        const openModal = document.querySelector('.boton1'); //guardamos el boto en la constante
        const modal = document.querySelector('.modal'); //trae la clase modal
        const cerrarModal = document.querySelector('.cierreModal'); //trae el elemento con el que cerramos el modal
        const btnTienda = document.querySelector('#action-button');
        const enlaceTienda = document.querySelector('#header ul>li:nth-child(4)');

        function entrarTienda(e){ 
            e.preventDefault(); 
            Swal.fire({
                timer: 500,
                background: '#222222',
                customClass: {
                  title: 'swal2-personalizar-texto',
                },
                didOpen: () => {
                  Swal.showLoading();
                }
              }).then(() => {
                Swal.fire({
                  icon: 'error',
                  title: 'Debes loguearte para acceder a la tienda!',
                  confirmButtonText: 'Aceptar',
                  background: '#222222',
                  customClass: {
                    title: 'swal2-personalizar-texto',
                    confirmButton: 'swal2-personalizar-boton'
                  }
                });
              });
        }

        btnTienda.addEventListener('click', entrarTienda);
        enlaceTienda.addEventListener('click', entrarTienda);

        openModal.addEventListener('click', (e)=>{ //que al hacer click en el elemento pasado por parametro
            e.preventDefault(); //para prevenir actividades por defecto
            modal.classList.add('modalShow'); //modal entre a sus clases y agregue la clase donde se muestra (modalShow)
        })
    
        cerrarModal.addEventListener('click', (e)=>{ //que al hacer click en el elemento pasado por parametro
            e.preventDefault(); //para prevenir actividades por defecto
            modal.classList.remove('modalShow'); //modal entre a sus clases y saque la clase donde se muestra (modalShow)
        })  
    }  
});

///////////////////////////////////////////PARA ABRIR Y CERRAR EL MODAL DEL REGISTRO//////////////////////////// 

const openModalR = document.querySelector('.abrirRegistro'); //guardamos el boto en la constante
const modalR = document.querySelector('.registro_form'); //trae la clase del registro
const cerrarModalR = document.querySelector('.cierreModalR'); //trae el elemento con el que cerramos el modal

openModalR.addEventListener('click', (e)=>{ //que al hacer click en el elemento pasado por parametro
    e.preventDefault(); //para prevenir actividades por defecto
    modalR.classList.add('modalShow'); //modal entra a sus clases y agregue la clase donde se muestra (modalShow)
    modal.classList.remove('modalShow');// cerramos al mismo tiempo el modal del log in
})

cerrarModalR.addEventListener('click', (e)=>{ //que al hacer click en el elemento pasado por parametro
    e.preventDefault(); //para prevenir actividades por defecto
    modalR.classList.remove('modalShow'); //modal entre a sus clases y saque la clase donde se muestra (modalShow)
})


/////////////////////////////////////////PARA VERIFICAR EL CONTACTO////////////////////////////

document.getElementById('contactoForm').addEventListener('submit', function(event) {
     event.preventDefault(); // Prevenir el envío del formulario
    
     var nombre = document.getElementById('nombre').value;
     var mail = document.getElementById('mail').value;
     var tel = document.getElementById('tel').value;
     var servicio = document.getElementById('servicio').value;
     var mensaje = document.getElementById('mensaje').value;
     var source = document.querySelector('input[name="source"]:checked');
     var attachment = document.getElementById('img_subir').files.length;
    
     var errores = false;

     if (nombre === '') {
         document.getElementById('errorMessages1').innerHTML = 'El nombre es obligatorio.<br>';
         errores = true;
     } else {
        document.getElementById('errorMessages1').innerHTML = '';
     }
     if (tel === '') {
         document.getElementById('errorMessages2').innerHTML =  'El teléfono es obligatorio.<br>';
         errores = true;
     }else{
         var patrones = [ //definimos 3 patrones para evaluar el tel ingresado
             /^\d{2}\s\d{8}$/, // Formato: nn nnnnnnnn
             /^\d{3}\s\d{7}$/,  // Formato: nnn nnnnnnn
             /^\d{10}$/ //Formato: nnnnnnnnnn para evitar errores de espacios no puestos
         ];
         var esValido = patrones.some(function(patron) { //el metodo some es para evaluar. Utilizamos función cb
             return patron.test(tel); //compara si alguno de los patrones del array coincide con el telefono
         }); //si alguno coincide devuelve true, sino false

         if (!esValido) {
            document.getElementById('errorMessages2').innerHTML =  'El formato de teléfono es incorrecto.<br>';
            errores = true;
         } else {
            document.getElementById('errorMessages2').innerHTML =  '';
         }
     }
     if (mail === '') {
         document.getElementById('errorMessages3').innerHTML = 'El email es obligatorio.<br>';
         errores = true;
     } else {
        document.getElementById('errorMessages3').innerHTML = '';
     }
     if (servicio === '') {
         document.getElementById('errorMessages4').innerHTML = 'Debes seleccionar un motivo.<br>';
         errores = true;
     } else {
        document.getElementById('errorMessages4').innerHTML = '';
     }
     if (mensaje === '') {
         document.getElementById('errorMessages5').innerHTML = 'Haznos tu consulta.<br>';
         errores = true;
     } else {
        document.getElementById('errorMessages5').innerHTML = '';
     }
     if (!source) {
         document.getElementById('errorMessages6').innerHTML = 'Debes seleccionar cómo nos conociste.<br>';
         errores = true;
     } else {
        document.getElementById('errorMessages6').innerHTML = '';
     }
     if (attachment === 0) {
         document.getElementById('errorMessages7').innerHTML = 'Debes adjuntar una imagen.<br>';
         errores = true;
     } else {
        document.getElementById('errorMessages7').innerHTML = '';
     }
    
      if(!errores) {
        limpiarFormContacto();
        Swal.fire({
            title: 'Enviando formulario...',
            timer: 2000,
            background: '#222222',
            customClass: {
              title: 'swal2-personalizar-texto',
            },
            didOpen: () => {
              Swal.showLoading();
            }
          }).then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Formulario enviado!',
              confirmButtonText: 'Aceptar',
              background: '#222222',
              customClass: {
                title: 'swal2-personalizar-texto',
                confirmButton: 'swal2-personalizar-boton'
              }
            });
          });
        }
});

document.getElementById('form_registro').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario
   
    var nombre = document.getElementById('nombre2').value;
    var apellido = document.getElementById('apellido').value;
    var tel = document.getElementById('tel2').value;
    var direccion = document.getElementById('direccion').value;
    var mail = document.getElementById('mail2').value;
    var usuario = document.getElementById('usuario').value;
    var contrasenia1 = document.getElementById('contrasenia1').value;
    var contrasenia2 = document.getElementById('contrasenia2').value;
   
    var errores = false;

    if (nombre === '') {
        document.getElementById('errorMessages8').innerHTML = 'El nombre es obligatorio.<br>';
        errores = true;
    } else {
       document.getElementById('errorMessages8').innerHTML = '';
    }
    if (apellido === '') {
        document.getElementById('errorMessages9').innerHTML = 'El apellido es obligatorio.<br>';
        errores = true;
    } else {
       document.getElementById('errorMessages9').innerHTML = '';
    }
    if (tel === '') {
        document.getElementById('errorMessages10').innerHTML =  'El teléfono es obligatorio.<br>';
        errores = true;
    }else{
        var patrones = [ //definimos 3 patrones para evaluar el tel ingresado
            /^\d{2}\s\d{8}$/, // Formato: nn nnnnnnnn
            /^\d{3}\s\d{7}$/,  // Formato: nnn nnnnnnn
            /^\d{10}$/ //Formato: nnnnnnnnnn para evitar errores de espacios no puestos
        ];
        var esValido = patrones.some(function(patron) { //el metodo some es para evaluar. Utilizamos función cb
            return patron.test(tel); //compara si alguno de los patrones del array coincide con el telefono
        }); //si alguno coincide devuelve true, sino false

        if (!esValido) {
           document.getElementById('errorMessages10').innerHTML =  'El formato de teléfono es incorrecto.<br>';
           errores = true;
        } else {
           document.getElementById('errorMessages10').innerHTML =  '';
        }
    }
    if (direccion === '') {
        document.getElementById('errorMessages11').innerHTML = 'La dirección es obligatoria.<br>';
        errores = true;
    } else {
       document.getElementById('errorMessages11').innerHTML = '';
    }
    if (mail === '') {
        document.getElementById('errorMessages12').innerHTML = 'El email es obligatorio.<br>';
        errores = true;
    } else {
       document.getElementById('errorMessages12').innerHTML = '';
    }
    if (usuario === '') {
        document.getElementById('errorMessages13').innerHTML = 'El usuario es obligatorio.<br>';
        errores = true;
    } else {
       document.getElementById('errorMessages13').innerHTML = '';
    }
    if (contrasenia1 === '') {
        document.getElementById('errorMessages14').innerHTML = 'La contraseña es obligatoria.<br>';
        errores = true;
    } else {
       document.getElementById('errorMessages14').innerHTML = '';
    }
    if (contrasenia2 === '') {
        document.getElementById('errorMessages15').innerHTML = 'La contraseña es obligatoria.<br>';
        errores = true;
    } else {
       document.getElementById('errorMessages15').innerHTML = '';
    }
    if ((contrasenia1 != '' && contrasenia2 != '' && contrasenia1 != contrasenia2)) {
        document.getElementById('errorMessages14').innerHTML = 'La contraseñas no coinciden.<br>';
        errores = true;
    } else {
        if ((contrasenia1 != '' && contrasenia2 != '')) {
            document.getElementById('errorMessages14').innerHTML = '';
        }
    }
    
     if(!errores) {
        var nuevoUsuario = {
            nombre: nombre,
            apellido: apellido,
            telefono: tel,
            direccion: direccion,
            email: mail,
            usuario: usuario,
            contrasenia: contrasenia1 
        };

        var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        usuarios.push(nuevoUsuario);

        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        limpiarFormRegistro();

        cerrarModalRegistro();

        Swal.fire({
            title: 'Enviando formulario...',
            timer: 2000,
            background: '#222222',
            customClass: {
              title: 'swal2-personalizar-texto',
            },
            didOpen: () => {
              Swal.showLoading();
            }
          }).then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Registro exitoso!',
            //   text: '¡Gracias por tu compra!',
              confirmButtonText: 'Aceptar',
              background: '#222222',
              customClass: {
                title: 'swal2-personalizar-texto',
                confirmButton: 'swal2-personalizar-boton'
              }
            });
          });
    }
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario
   
    var usuario = document.getElementById('login-usuario').value;
    var contrasenia = document.getElementById('login-password').value;
   
    var errores = false;

    if (usuario === '') {
        document.getElementById('errorMessages16').innerHTML = 'El usuario es obligatorio.<br>';
        errores = true;
    } else {
       document.getElementById('errorMessages16').innerHTML = '';
    }
    if (contrasenia === '') {
        document.getElementById('errorMessages17').innerHTML = 'La contraseña es obligatoria.<br>';
        errores = true;
    } else {
       document.getElementById('errorMessages17').innerHTML = '';
    }

    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    var usuarioValido = usuarios.find(function(user) {
        return user.usuario === usuario && user.contrasenia === contrasenia;
    });

    if(!errores){
        if (usuarioValido) {
            localStorage.setItem('logueado', true);
            limpiarFormLogin();
            cerrarModalLogin();
            window.location.href = '../index.html'; 
        } else {
            Swal.fire({
                timer: 500,
                background: '#222222',
                customClass: {
                  title: 'swal2-personalizar-texto',
                },
                didOpen: () => {
                  Swal.showLoading();
                }
              }).then(() => {
                Swal.fire({
                  icon: 'error',
                  title: 'Usuario y/o Contraseña incorrectos!',
                  text: '¡Por favor intente nuevamente!',
                  confirmButtonText: 'Aceptar',
                  background: '#222222',
                  customClass: {
                    title: 'swal2-personalizar-texto',
                    confirmButton: 'swal2-personalizar-boton'
                  }
                });
              });
        }
    }  
});

function limpiarFormLogin(){
    document.getElementById('login-usuario').value = '';
    document.getElementById('login-password').value = '';
}

function limpiarFormRegistro(){
    document.getElementById('nombre2').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('tel2').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('mail2').value = '';
    document.getElementById('usuario').value = '';
    document.getElementById('contrasenia1').value = '';
    document.getElementById('contrasenia2').value = '';
}

function limpiarFormContacto(){
    document.getElementById('nombre').value = '';
    document.getElementById('mail').value = '';
    document.getElementById('tel').value = '';
    document.getElementById('servicio').value = 0;
    document.getElementById('mensaje').value = '';
    var radios = document.querySelectorAll('input[name="source"]');
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }
    document.getElementById('img_subir').value = '';
}

function cerrarModalRegistro() {
    modalR.classList.remove('modalShow');
}

function cerrarModalLogin() {
    const modal = document.querySelector('.modal');
    modal.classList.remove('modalShow');
}