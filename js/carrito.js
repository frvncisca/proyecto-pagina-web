//variables,
const listaComidas = document.getElementById("lista-comidas"),
      contenedorCarrito = document.querySelector('.buy-card .lista_de_comidas'),
      vaciarCarritoBtn = document.querySelector('#vaciar_carrito');

const carrito = document.getElementById("carrito");
      if (carrito) {
      // código para acceder a las propiedades o métodos de carrito
      } else {
        console.log("El elemento con id 'carrito' no existe");
      }

const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('sticky', this.window.scrollY > 80);
    });

let articulosCarrito = [];
let total = 0;

registrarEventsListeners()

function registrarEventsListeners () {
    //cuando yo le de click a "agregar al carrito de compras"
    listaComidas.addEventListener('click', agregarComida);

    //eliminar comida del carrito
    carrito.addEventListener('click', eliminarComida);

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', e => {
        articulosCarrito = []
        limpiarHTML()
    })
}

function agregarComida(e) {
    if (e.target.classList.contains("agregar-carrito")) {
        const comidaSeleccionada = e.target.closest(".row");
        leerInfo(comidaSeleccionada);
    };
}

function eliminarComida(e) {
    if (e.target.classList.contains("borrar-comida")) {
        const comidaId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(comida => comida.id !== comidaId)

        carritoHTML()
    }
}

function leerInfo(comida) {

    const infoComida = {
        imagen : comida.querySelector('img').src,
        titulo : comida.querySelector('h3').textContent,
        precio : comida.querySelector('.price').textContent,
        id : comida.querySelector('button').dataset.id,
        cantidad : 1,
        total : parseFloat(comida.querySelector('.price').textContent.replace('$', ''))
    }

    const existe = articulosCarrito.some(comida => comida.id === infoComida.id)

    if (existe) {
        const comidas = articulosCarrito.map(comida => {
            if (comida.id === infoComida.id){ 
                comida.cantidad++;
                comida.total += infoComida.total;
                return comida
            } else {
                return comida;
            }
        });
        [...articulosCarrito,infoComida]
    } else {
        articulosCarrito = [...articulosCarrito,infoComida]
    }

    //actualizar total
    total = articulosCarrito.reduce((total, comida) => total + comida.total, 0);

    document.querySelector('.nav-card .total').textContent = `Total : $${total.toFixed(3)}`;
    carritoHTML()

}


function carritoHTML() {
    limpiarHTML()
    //Recorre el carrito de compras y genera el HTML
    articulosCarrito.forEach(comida => {
        const fila = document.createElement('div');
        fila.innerHTML = `
            <img src="${comida.imagen}"></img>
            <p>${comida.titulo}</p>
            <p>${comida.precio}</p>
            <p>${comida.cantidad}</p>
            <p><span class="borrar-comida" data-id="${comida.id}">X</span></p>
        `;

        contenedorCarrito.appendChild(fila);
    });
}

//Elimina los cursos de la lista_de_comidas
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

