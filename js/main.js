let repuestos = [];

fetch("./js/repuestos.json")
    .then(response => response.json())
    .then(data => {
        repuestos = data;
        cargarRepuestos(repuestos);
    })


const contenedorRepuestos = document.querySelector("#contenedor-repuestos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".repuesto-agregar");
const numero = document.querySelector("#numero");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarRepuestos(repuestosElegidos) {

    contenedorRepuestos.innerHTML = "";

    repuestosElegidos.forEach(repuesto => {

        const div = document.createElement("div");
        div.classList.add("repuesto");
        div.innerHTML = `
            <img class="repuesto-imagen" src="${repuesto.imagen}" alt="${repuesto.titulo}">
            <div class="repuesto-detalles">
                <h3 class="repuesto-titulo">${repuesto.titulo}</h3>
                <p class="repuesto-precio">$${repuesto.precio}</p>
                <button class="repuesto-agregar" id="${repuesto.id}">Agregar</button>
            </div>
        `;

        contenedorRepuestos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const repuestoCategoria = repuestos.find(repuesto => repuesto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = repuestoCategoria.categoria.nombre;
            const repuestosBoton = repuestos.filter(repuesto => repuesto.categoria.id === e.currentTarget.id);
            cargarRepuestos(repuestosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los Artículos";
            cargarRepuestos(repuestos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".repuesto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let repuestosEnCarrito;

let repuestosEnCarritoLS = localStorage.getItem("repuestos-en-carrito");

if (repuestosEnCarritoLS) {
    repuestosEnCarrito = JSON.parse(repuestosEnCarritoLS);
    actualizarNumero();
} else {
    repuestosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Artículo agregado",
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
    const repuestoAgregado = repuestos.find(repuesto => repuesto.id === idBoton);

    if(repuestosEnCarrito.some(repuesto => repuesto.id === idBoton)) {
        const index = repuestosEnCarrito.findIndex(repuesto => repuesto.id === idBoton);
        repuestosEnCarrito[index].cantidad++;
    } else {
        repuestoAgregado.cantidad = 1;
        repuestosEnCarrito.push(repuestoAgregado);
    }

    actualizarNumero();

    localStorage.setItem("repuestos-en-carrito", JSON.stringify(repuestosEnCarrito));
}

function actualizarNumero() {
    let nuevoNumero = repuestosEnCarrito.reduce((acc, repuesto) => acc + repuesto.cantidad, 0);
    numero.innerText = nuevoNumero;
}