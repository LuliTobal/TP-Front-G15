///////////////////////////////////////////PARA ABRIR Y CERRAR EL MODAL DEL LOG IN//////////////////////////// 
const openModal = document.querySelector('.probanding'); //guardamos el boto en la constante
const modal = document.querySelector('.modal'); //trae la clase modal
const cerrarModal = document.querySelector('.cierreModal'); //trae el elemento con el que cerramos el modal

openModal.addEventListener('click', (e)=>{ //que al hacer click en el elemento pasado por parametro
    e.preventDefault(); //para prevenir actividades por defecto
    modal.classList.add('modalShow'); //modal entre a sus clases y agregue la clase donde se muestra (modalShow)
})

cerrarModal.addEventListener('click', (e)=>{ //que al hacer click en el elemento pasado por parametro
    e.preventDefault(); //para prevenir actividades por defecto
    modal.classList.remove('modalShow'); //modal entre a sus clases y saque la clase donde se muestra (modalShow)
})

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
    
     if (nombre === '') {
         document.getElementById('errorMessages1').innerHTML = 'El nombre es obligatorio.';
     }
     if (tel === '') {
         document.getElementById('errorMessages2').innerHTML =  'El teléfono es obligatorio.<br>';
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
             errorMessages.innerHTML = 'El formato de teléfono es incorrecto.<br>';
         }
     }
     if (mail === '') {
         document.getElementById('errorMessages3').innerHTML = 'El email es obligatorio.<br>';
     }
     if (servicio === '') {
         document.getElementById('errorMessages4').innerHTML = 'Debes seleccionar un motivo.<br>';
     }
     if (mensaje === '') {
         document.getElementById('errorMessages5').innerHTML = 'Haznos tu consulta.<br>';
     }
     if (!source) {
         document.getElementById('errorMessages6').innerHTML = 'Debes seleccionar cómo nos conociste.<br>';
     }
     if (attachment === 0) {
         document.getElementById('errorMessages7').innerHTML = 'Debes adjuntar una imagen.<br>';
     }
    
      else {
         alert('Formulario enviado con éxito!');
         // Aquí podrías enviar el formulario con un método real, como fetch o XMLHttpRequest
         // Por ejemplo:
         // this.submit();
     }
});