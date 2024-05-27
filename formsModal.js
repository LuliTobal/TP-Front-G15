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
        var patrones = [ //definimos 2 patrones para evaluar el tel ingresado
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
    
    // if (errorMessages !== '') {
    //     document.getElementById('errorMessages').innerHTML = errorMessages;
     else {
        document.getElementById('errorMessages').innerHTML = '';
        alert('Formulario enviado con éxito!');
        // Aquí podrías enviar el formulario con un método real, como fetch o XMLHttpRequest
        // Por ejemplo:
        // this.submit();
    }
});