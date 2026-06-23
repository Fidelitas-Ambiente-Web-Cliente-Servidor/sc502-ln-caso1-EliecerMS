const menu = [
  { nombre: 'Bruschetta Clásica',     descripcion: 'Pan tostado con tomate y albahaca fresca',    precio: 4500,  categoria: 'Entrada'      },
  { nombre: 'Tabla de Quesos',         descripcion: 'Selección de quesos importados con mermelada', precio: 7800,  categoria: 'Entrada'      },
  { nombre: 'Lomo al Vino Tinto',      descripcion: 'Lomo de res en reducción de vino tinto',       precio: 15500, categoria: 'Plato Fuerte' },
  { nombre: 'Pasta Carbonara',         descripcion: 'Pasta con tocino, huevo y queso parmesano',    precio: 10200, categoria: 'Plato Fuerte' },
  { nombre: 'Salmón a la Plancha',     descripcion: 'Filete de salmón con vegetales al vapor',      precio: 13800, categoria: 'Plato Fuerte' },
  { nombre: 'Tiramisú',               descripcion: 'Postre italiano con café y mascarpone',          precio: 5200,  categoria: 'Postre'       },
  { nombre: 'Cheesecake de Maracuyá', descripcion: 'Cheesecake cremoso con coulis de maracuyá',    precio: 4800,  categoria: 'Postre'       },
];

const reservas = [];

const formReserva = document.getElementById('form-reserva');

const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const fechaInput = document.getElementById('fecha');
const horaInput = document.getElementById('hora');
const numPersonasInput = document.getElementById('numPersonas');
const comentariosImput = document.getElementById('comentarios');

const reservarButton = document.getElementById('btn-reservar');

const nombreError = document.getElementById('nombre-error');
const emailError = document.getElementById('email-error');
const fechaError = document.getElementById('fecha-error');
const numPersonasError = document.getElementById('numPersonas-error');


  const txtTotalReservas = document.getElementById('total-reservas');
  const txtTotalPersonas = document.getElementById('total-personas');
  const txtMayorReserva = document.getElementById('mayor-reserva-info');

function renderMenu() {
  const menuContainer = document.getElementById("menu-container");         
    menu.forEach(itemMenu => {          
        const tarjetaItem = document.createElement("div");   
        tarjetaItem.classList.add("col-md-4"); 
        
        tarjetaItem.innerHTML = `
            <div class="card-plato h-100">
                <div class="card-body">
                    <h5 class="card-title">${itemMenu.nombre}</h5>
                    <p class="card-text">${itemMenu.descripcion}</p>
                    <small class="text-muted">${itemMenu.categoria}</small>
                    <div>
                      <p>${itemMenu.precio.toLocaleString('es-CO')}</p>
                    </div>
                </div>
                
            </div>
        `;
        menuContainer.appendChild(tarjetaItem); 
    });
}


function filtrarCategoria(categoria) {
    document.getElementById("menu-container").innerHTML = "";
    if (categoria === "Todos") {
        renderMenu();
        return;
    }
    const menuFiltrado = menu.filter(item => item.categoria === categoria);
    
    const menuContainer = document.getElementById("menu-container");         
    menuFiltrado.forEach(itemMenu => {          
        const tarjetaItem = document.createElement("div");   
        tarjetaItem.classList.add("col-md-4"); 
        
        tarjetaItem.innerHTML = `
            <div class="card-plato h-100">
                <div class="card-body">
                    <h5 class="card-title">${itemMenu.nombre}</h5>
                    <p class="card-text">${itemMenu.descripcion}</p>
                    <small class="text-muted">${itemMenu.categoria}</small>
                    <div>
                      <p>${itemMenu.precio.toLocaleString('es-CO')}</p>
                    </div>
                </div>
                
            </div>
        `;
        menuContainer.appendChild(tarjetaItem); 
    });
}

//validacion de nombre
function validarNombre() {
        const nombreValor = nombreInput.value.trim(); 
        const regexNombre = /^[a-zA-Z\s]+$/;

        if (nombreValor.length < 5) {
            nombreError.innerText = "El nombre debe tener al menos 5 caracteres";
            return false;
        } else if (!regexNombre.test(nombreValor)) {
            nombreError.innerText = "El nombre solo puede contener letras y espacios";
            return false;
        }

    nombreError.innerText = ""; 
            return true;
  }

//validación correo electrónico

    function validarCorreo() {
        const correoValor = emailInput.value.trim();
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexCorreo.test(correoValor)) {
            emailError.innerText = "El correo no es válido";
            return false;
        } 
            emailError.innerText = "";
            return true;
        
    }


    //validación fecha

    function validarFecha() {
        const fechaValor = fechaInput.value.trim();

        // validar que la fecha no sea anterior a la fecha actual
        const fechaActual = new Date();
        const fechaSeleccionada = new Date(fechaValor);

        if (fechaSeleccionada < fechaActual) {
            fechaError.innerText = "La fecha no puede ser anterior a la fecha actual";
            return false;
        }else if(fechaSeleccionada.value == ""){
          fechaError.innerHTML = "No ha seleccionado una fecha"
          return false;
        }
            fechaError.innerText = "";
            return true;
        
    }

    //validación numero personas

    function validarNumeroPersonas() {
        const numeroPersonasValor = numPersonasInput.value.trim();

        if (numeroPersonasValor === "") {
            numPersonasError.innerText = "El número de personas es obligatorio";
            return false;
        } else if (isNaN(numeroPersonasValor) || parseInt(numeroPersonasValor) <= 0) {
            numPersonasError.innerText = "El número de personas debe ser entre 1 y 20";
            return false;
        }
        else if (parseInt(numeroPersonasValor) > 20 || parseInt(numeroPersonasValor) < 1) {
            numPersonasError.innerText = "El número de personas debe ser entre 1 y 20";
            return false;
        } 
        
            numPersonasError.innerText = "";
            return true;
        
    }

    //validacion en tiempo real de los campos del formulario
    nombreInput.addEventListener('input', function() {
        validarNombre();
        validarFormulario();
    });
    emailInput.addEventListener('input', function() {
        validarCorreo();
        validarFormulario();
    });
    fechaInput.addEventListener('input', function() {
        validarFecha();
        validarFormulario();
    });
    numPersonasInput.addEventListener('input', function() {
        validarNumeroPersonas();
        validarFormulario();
    });
    emailInput.addEventListener('input', function() {
        validarCorreo();
        validarFormulario();
    });
    fechaInput.addEventListener('input', function() {
        validarFecha();
        validarFormulario();
    });
    numPersonasInput.addEventListener('input', function() {
        validarNumeroPersonas();
        validarFormulario();
    });


function validarFormulario() {
  //habilitar boton de reserva si todos los campos son validos
  if (validarNombre() && validarCorreo() && validarFecha() && validarNumeroPersonas()) {
    reservarButton.disabled = false;
  } else {
    reservarButton.disabled = true;
  }
  
}

function agregarReserva() {

  //enviado el formulario, se agrega la reserva al array de reservas y se limpia el formulario
  const reserva = {
    nombre: nombreInput.value.trim(),
    email: emailInput.value.trim(),
    fecha: fechaInput.value.trim(),
    hora: horaInput.value.trim(),
    numPersonas: parseInt(numPersonasInput.value.trim(), 10),
    comentarios: comentariosImput.value.trim()
  };

  reservas.push(reserva);

  

  // tabla de reservas con clase .fila-reserva, fila con 6 o mas personas muestran color de fondo diferente
  const tablaReservas = document.getElementById('reservas-body');
  const filaReserva = document.createElement('tr');
  filaReserva.classList.add('fila-reserva');

  //valida reservas iguales o mayoires a 6 agregando estilo diferente a la fila
  if (reserva.numPersonas >= 6) {
    filaReserva.classList.add('mayor-reserva');
  }

  filaReserva.innerHTML = `
    <td>${reserva.nombre}</td>
    <td>${reserva.email}</td>
    <td>${reserva.fecha}</td>
    <td>${reserva.hora}</td>
    <td>${reserva.numPersonas}</td>
    <td>${reserva.comentarios}</td>
  `;

  tablaReservas.appendChild(filaReserva);
  actualizarResumen(); 
  formReserva.reset();
  reservarButton.disabled = true;
}


function actualizarResumen() {


  // Si no hay reservas
  if (reservas.length === 0) {
    txtTotalReservas.textContent = "0";
    txtTotalPersonas.textContent = "0";
    txtMayorReserva.textContent = "Ninguna";
    return;
  }

  // calcular el total de reservas registradas
  const totalReservas = reservas.length;

  // calcular el total de personas esperadas (suma numPersonas de cada reserva)
  const totalPersonas = reservas.reduce((acumulador, r) => acumulador + r.numPersonas, 0);

  // encontrar la reserva con mayor número de personas
  let mayorReserva = reservas[0];
  for (let i = 1; i < reservas.length; i++) {
    if (reservas[i].numPersonas > mayorReserva.numPersonas) {
      mayorReserva = reservas[i];
    }
  }

  // meter los datos calculados en el HTML
  txtTotalReservas.textContent = totalReservas;
  txtTotalPersonas.textContent = totalPersonas;
  txtMayorReserva.textContent = `${mayorReserva.nombre} (${mayorReserva.numPersonas} personas)`;
}


document.addEventListener('DOMContentLoaded', function () {
  renderMenu();

});


document.getElementById('form-reserva').addEventListener('submit', function (e) {
  e.preventDefault(); // Evitar recarga de página
  validarFormulario();
});
