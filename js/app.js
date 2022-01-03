

//Variables
const enviarBtn = document.querySelector('#enviar');
const resetBtn = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

//Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

//Expresiones regulares
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    resetBtn.addEventListener('click', resetearFormulario);

    //Enviar email
    formulario.addEventListener('submit', enviarEmail)
}

//Valida el formulario
function validarFormulario(e) {
    
    if ( e.target.value.length  > 0){

        // eliminar el mensaje de error
        const error = document.querySelector('p.error');
        if ( error ){
        error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
        
    }else{
        //e.target.style.borderColor = 'red';
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email'){
        

        if(er.test(e.target.value)){
            const error = document.querySelector('p.error');
        if ( error ){
        error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
        }else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no válido');
        }
    };
    if( er.test(email.value) && asunto.value!== '' && mensaje.value !== '' ){
        enviarBtn.disabled = false;
    enviarBtn.classList.remove('cursor-not-allowed', 'oppacity-50');
    }
    
}



//Funciones

function iniciarApp() {
    enviarBtn.disabled = true;
    enviarBtn.classList.add('cursor-not-allowed', 'oppacity-50');

}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'backgroung-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0){
        formulario.appendChild(mensajeError);
    }

    
}

function enviarEmail(e) {
    e.preventDefault();
    
    console.log('Enviando');
    //Mostrar spinner

    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //ocultar el sppiner después de 3 seg y mostrar mensaje

    setTimeout( () => {
        spinner.style.display = 'none';
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se ha enviado correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();

        resetearFormulario();
        }, 5000)
    }, 3000 );

}

//limpiar los bordes de colores del formulario
function limpiarBordes() {
    if('border-green-500'){
        email.classList.remove('border-green-500');
        asunto.classList.remove('border-green-500');
        mensaje.classList.remove('border-green-500');
    }
     if('border-red-500'){
        email.classList.remove('border-red-500');
        asunto.classList.remove('border-red-500');
        mensaje.classList.remove('border-red-500'); 
    }
}

//función que elimina el mensaje de error

function eliminarMensajeError() {
    const error = document.querySelector('p.error');
if(error){
error.remove(); 
    }
}

//función que resetea el formulario

function resetearFormulario() {
    formulario.reset();
    limpiarBordes();
    eliminarMensajeError();
    iniciarApp();
}


