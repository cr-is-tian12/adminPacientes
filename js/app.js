const nombreInput = document.querySelector('#nombre');
const telefonoInput = document.querySelector('#telefono');
const rutInput = document.querySelector('#rut');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario');

const contenedorUlCitas = document.querySelector('#citas');

let editandoTexto;

function escuchandoEventos(){
    nombreInput.addEventListener('input', datosCita)
    telefonoInput.addEventListener('input', datosCita)
    rutInput.addEventListener('input', datosCita)
    emailInput.addEventListener('input', datosCita)
    fechaInput.addEventListener('input', datosCita)
    horaInput.addEventListener('input', datosCita)
    sintomasInput.addEventListener('input', datosCita)
    
    formulario.addEventListener('submit', nuevaCita)

}

escuchandoEventos()

// Para que se vea nuestro localStorage
document.addEventListener('DOMContentLoaded', ()=>{
    mensajeAlerta.imprimirCitasEnHTML(administrarCitas)
})


/*
*¿Porque estamos creando el objeto?
Es un almacenamiento temporal, estamos guardando los datos en el objeto,
en el cual más adelante podremos manipular.
Segun el profesor, crea el objeto es conforme tu vayas escribiendo en los inputs
se vayan llenando la propiedad del objeto sobre la cual estoy escribiendo.
Para que funcione debo tener el name en el html ya definido
Practicamente reconoce lo que estamos escribiendo*/
const objetoCitaStringVacio = {
    nombre: '',
    telefono: '',
    rut:'',
    email:'',
    fecha: '',
    hora:'',
    sintomas:''
}

function datosCita(event){
    objetoCitaStringVacio[event.target.name] = event.target.value;
    // console.log(objetoCitaStringVacio)
}

class Citas{
    constructor(){
        this._citas = JSON.parse(localStorage.getItem('listaCitas')) || [];
    }

    agregandoCita(cita){
        this._citas = [...this._citas, cita];
        // console.log(cita)
        almacenamientoLocal(this._citas)
    }

    eliminarCita(id){
        this._citas = this._citas.filter(cita => cita.id != id)
        almacenamientoLocal(this._citas)
    }

    editarCita(citaActualizada){
        this._citas = this._citas.map( cita => {
            //Este codigo de los if es lo mismo que esto, pero mas breve ? citaActualizada : cita
           if(cita.id === citaActualizada.id){
                if(citaActualizada){
                    return citaActualizada;
                }else{
                    return cita;
                }
        }})

        almacenamientoLocal(this._citas)
    }
    
}
const administrarCitas = new Citas();


class Alertas{

    imprimirAlerta(mensaje, tipo){

        const alerta = document.querySelector('.alert');

        if(!alerta){
            const divMensaje = document.createElement('div');
            divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

            if(tipo === 'error'){
                divMensaje.classList.add('alert-danger');
            }else{
                divMensaje.classList.add('alert-success')
            }

        
            divMensaje.textContent = mensaje;
            document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'))

            setTimeout(() => {
                divMensaje.remove()
            }, 2000);
        };    
    };


    imprimirCitasEnHTML(citas){ //Destructuring en el parentesis
        limpiarHTML()
        
        const {_citas} = citas;
        /*Esto mismo podemos hacer destructuring de la siguiente manera
        imprimirCitasEnHTML({citas}) */


        _citas.forEach( cita => {
            const {nombre, telefono, fecha, hora, sintomas, rut,id, email} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            const nombreParrafo = document.createElement('p');
            nombreParrafo.classList.add('card-tittle', 'font-weigth-bolder');
            nombreParrafo.innerHTML = `
                <span class="font-weigth-bolder">Nombre: </span>${nombre}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weigth-bolder">Teléfono: </span>${telefono}
            `;

            const rutParrafo = document.createElement('p');
            rutParrafo.innerHTML = `
                <span class="font-weigth-bolder">Rut: </span>${rut}
            `;
            const emailParrafo = document.createElement('p');
            emailParrafo.innerHTML = `
                <span class="font-weigth-bolder">Email: </span>${email}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weigth-bolder">Fecha: </span>${fecha}
            `;
            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weigth-bolder">Hora: </span>${hora}
            `;
            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weigth-bolder">Sintomas: </span>${sintomas}
            `;

            // 1. Creando un btn para eliminar cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = `Eliminar <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>`

            btnEliminar.onclick = () => eliminarCita(id)

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info')
            btnEditar.innerHTML = `Editar <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
            </svg>
            `;
            /*Le agregamos cita dentro del parentesis para traernos todo el objeto con la inforomacion */
            btnEditar.onclick = () => editando(cita)
            

            divCita.appendChild(nombreParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(rutParrafo);
            divCita.appendChild(emailParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            contenedorUlCitas.appendChild(divCita)
        });
    }
}

const mensajeAlerta = new Alertas();


function nuevaCita(e){
    e.preventDefault();

    const {nombre, telefono, rut, email,fecha, hora, sintomas} = objetoCitaStringVacio;

    if(nombre ==='' || telefono ==='' || rut ==='' || email==='' ||fecha ==='' || hora ==='' || sintomas ===''){
        return mensajeAlerta.imprimirAlerta('Todos los campos estan vacios', 'error');
       
    }


    if(editandoTexto){
        mensajeAlerta.imprimirAlerta('Editado correctamente');
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';
        editandoTexto = false;

        //Creando una copia del objeto original, para poder editar
        administrarCitas.editarCita({...objetoCitaStringVacio})
    }else{
        // Generando un id unico para poder modificar
        objetoCitaStringVacio.id = Date.now();
        administrarCitas.agregandoCita({...objetoCitaStringVacio});
        mensajeAlerta.imprimirAlerta('Agregado correctamente');
    }


    formulario.reset();

    reiniciandoObjetosFormulario();

    /*
    *¿Porque administrarCitas esta dentro ? 
    La respuesta es que como estamos mostrando las citas en el html ncesitamos 
    tener acceso a la instancia de administrarCitas (Su permiso) para obtener la lista
    de citas (del arreglo)
    */
    mensajeAlerta.imprimirCitasEnHTML(administrarCitas)

}


function reiniciandoObjetosFormulario(){
    objetoCitaStringVacio.nombre = '';
    objetoCitaStringVacio.telefono = '';
    objetoCitaStringVacio.rut = '';
    objetoCitaStringVacio.email = '';
    objetoCitaStringVacio.fecha = '';
    objetoCitaStringVacio.hora = '';
    objetoCitaStringVacio.sintomas = '';
}


function limpiarHTML(){
    while(contenedorUlCitas.firstChild){
        contenedorUlCitas.removeChild(contenedorUlCitas.firstChild)
    }
}

function eliminarCita(id){
    console.log(id)

    //Para que funcione en el html 
    administrarCitas.eliminarCita(id)

    mensajeAlerta.imprimirAlerta('La cita se elimino correctamente');

    mensajeAlerta.imprimirCitasEnHTML(administrarCitas)
}

function editando(cita){
    const {nombre, telefono, rut, email,fecha, hora, sintomas, id} = cita;

    nombreInput.value = nombre;
    telefonoInput.value = telefono;
    rutInput.value = rut;
    emailInput.value = rut;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //El objeto se llena con la informacion que les estamos entregando
    objetoCitaStringVacio.nombre = nombre;
    objetoCitaStringVacio.telefono = telefono;
    objetoCitaStringVacio.rut = rut;
    objetoCitaStringVacio.email = email;
    objetoCitaStringVacio.fecha = fecha;
    objetoCitaStringVacio.hora = hora;
    objetoCitaStringVacio.sintomas = sintomas;
    objetoCitaStringVacio.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios'

    editandoTexto = true;
}


// Agregando Locacl Storage
function almacenamientoLocal(citas){
    localStorage.setItem('listaCitas', JSON.stringify(citas))
}

