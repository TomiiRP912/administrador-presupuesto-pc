// Presupuesto máximo (podemos cambiarlo después)
let PRESUPUESTO_MAXIMO = 0;

// Array donde guardaremos los componentes
let componentes = [];

// Capturamos el formulario
const formulario = document.getElementById("componenteForm");

// Escuchamos el evento submit
formulario.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que la página se recargue
    
    agregarComponente();
});

const btnPresupuesto = document.getElementById("btnPresupuesto");

btnPresupuesto.addEventListener("click", function() {

    const valor = parseFloat(document.getElementById("presupuestoInput").value);

    if (isNaN(valor) || valor <= 0) {
        alert("Ingrese un presupuesto válido.");
        return;
    }

    PRESUPUESTO_MAXIMO = valor;

    calcularTotal();
});

function limpiarTexto(texto) {
    return texto.replace(/[^a-zA-Z0-9\s]/g, "");
}

function agregarComponente() {

    const nombre = limpiarTexto(document.getElementById("nombre").value.trim());
    const precio = parseFloat(document.getElementById("precio").value);
    const categoria = document.getElementById("categoria").value;
    const comprado = document.getElementById("comprado").checked;

    // Validación básica
    const mensajeError = document.getElementById("mensajeError");

if (nombre === "" || isNaN(precio) || categoria === "") {
    mensajeError.textContent = "Complete todos los campos correctamente.";
    return;
}

mensajeError.textContent = "";

    const nuevoComponente = {
        nombre,
        precio,
        categoria,
        comprado
    };

    componentes.push(nuevoComponente);

    renderizarTabla();
    calcularTotal();

    formulario.reset();
}

function renderizarTabla() {

    const tablaBody = document.getElementById("tablaBody");
    tablaBody.innerHTML = ""; // Limpia la tabla antes de volver a dibujarla

    componentes.forEach(function(componente, index) {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${componente.nombre}</td>
            <td>$${componente.precio}</td>
            <td>${componente.categoria}</td>
            <td>${componente.comprado ? "Comprado" : "Pendiente"}</td>
            <td>
                <button onclick="editarComponente(${index})">Editar</button>
                <button onclick="eliminarComponente(${index})">Eliminar</button>
            </td>
        `;

        tablaBody.appendChild(fila);
    });
}

function editarComponente(index) {

    const componente = componentes[index];

    document.getElementById("nombre").value = componente.nombre;
    document.getElementById("precio").value = componente.precio;
    document.getElementById("categoria").value = componente.categoria;
    document.getElementById("comprado").checked = componente.comprado;

    componentes.splice(index, 1);

    renderizarTabla();
    calcularTotal();
}

function eliminarComponente(index) {
    componentes.splice(index, 1);
    renderizarTabla();
    calcularTotal();
}

function calcularTotal() {

    let total = 0;

    componentes.forEach(function(componente) {
        total += componente.precio;
    });

    const restante = PRESUPUESTO_MAXIMO - total;

    const totalSpan = document.getElementById("total");
    const restanteSpan = document.getElementById("restante");

    totalSpan.textContent = `$${total.toLocaleString()}`;
    restanteSpan.textContent = `$${restante.toLocaleString()}`;

    // Cambio de color según presupuesto
    if (restante < 0) {
        restanteSpan.style.color = "red";
    } else {
        restanteSpan.style.color = "lightgreen";
    }
}