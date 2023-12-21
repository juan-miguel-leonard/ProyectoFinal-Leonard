let repuestosEnCarrito = localStorage.getItem("repuestos-en-carrito");
repuestosEnCarrito = JSON.parse(repuestosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoRepuestos = document.querySelector("#carrito-repuestos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-repuesto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarRepuestosCarrito() {
    if (repuestosEnCarrito && repuestosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoRepuestos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoRepuestos.innerHTML = "";
    
        repuestosEnCarrito.forEach(repuesto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-repuesto");
            div.innerHTML = `
                <img class="carrito-repuesto-imagen" src="${repuesto.imagen}" alt="${repuesto.titulo}">
                <div class="carrito-repuesto-titulo">
                    <small>Título</small>
                    <h3>${repuesto.titulo}</h3>
                </div>
                <div class="carrito-repuesto-cantidad">
                    <small>Cantidad</small>
                    <p>${repuesto.cantidad}</p>
                </div>
                <div class="carrito-repuesto-precio">
                    <small>Precio</small>
                    <p>$${repuesto.precio}</p>
                </div>
                <div class="carrito-repuesto-subtotal">
                    <small>Subtotal</small>
                    <p>$${repuesto.precio * repuesto.cantidad}</p>
                </div>
                <button class="carrito-repuesto-eliminar" id="${repuesto.id}"><i class="bi bi-x-circle-fill"></i></button>
            `;
    
            contenedorCarritoRepuestos.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
	
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoRepuestos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarRepuestosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-repuesto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Repuesto eliminado",
        duration: 4000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #001f54, #1282a2)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem',
            y: '1.5rem'
          },
        onClick: function(){}
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = repuestosEnCarrito.findIndex(repuesto => repuesto.id === idBoton);
    
    repuestosEnCarrito.splice(index, 1);
    cargarRepuestosCarrito();

    localStorage.setItem("repuestos-en-carrito", JSON.stringify(repuestosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás segurísimo?',
        icon: 'question',
        html: `Vas a borrar ${repuestosEnCarrito.reduce((acc, repuesto) => acc + repuesto.cantidad, 0)} repuestos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí!',
        cancelButtonText: 'No!'
    }).then((result) => {
        if (result.isConfirmed) {
            repuestosEnCarrito.length = 0;
            localStorage.setItem("repuestos-en-carrito", JSON.stringify(repuestosEnCarrito));
            cargarRepuestosCarrito();
        }
      })
}


function actualizarTotal() {
    const totalCalculado = repuestosEnCarrito.reduce((acc, repuesto) => acc + (repuesto.precio * repuesto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    repuestosEnCarrito.length = 0;
    localStorage.setItem("repuestos-en-carrito", JSON.stringify(repuestosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoRepuestos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}