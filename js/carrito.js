//variables,
const listaComidas = document.getElementById("lista-comidas"),
      contenedorCarrito = document.querySelector('.buy-card .lista_de_comidas'),
      vaciarCarritoBtn = document.querySelector('#vaciar_carrito');

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
        localStorage.removeItem('carrito');
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

    // Update the articulosCarrito array
    articulosCarrito = articulosCarrito.filter(comida => comida.id !== comidaId);

    // Convert the articulosCarrito array to JSON and store it in localStorage
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function leerInfo(comida) {

    const infoComida = {
        nombre: comida.querySelector('h3').innerText,
        precioOriginal: parseFloat(comida.querySelector('.price').innerText.replace('$', '').replace('.', '').replace(',', '.')),
        precio: parseFloat(comida.querySelector('.price').innerText.replace('$', '').replace('.', '').replace(',', '.')),
        imagen: comida.querySelector('img').src,
        id : comida.querySelector('button').dataset.id,
        cantidad: 1
    }

    articulosCarrito = [...articulosCarrito, infoComida];

    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));

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
    const carritoData = JSON.parse(localStorage.getItem('carrito')) || [];
            const fila = document.createElement('div');
        fila.innerHTML = '';
    carritoData.forEach(comida => {
        const fila = document.createElement('div');
        fila.innerHTML = `
            <img src="${comida.imagen}"></img>
            <p>${comida.nombre}</p>
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

function enviarDatosCarrito(carrito) {
    fetch('compra.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ carrito: carrito })
    })
   .then(response => response.json())
   .then(data => {
      if (data.success) {
        alert('Carrito guardado con éxito');
      } else {
        alert('Error al guardar el carrito');
      }
    })
   .catch(error => {
      console.error('Error al enviar los datos:', error);
      alert('Error al guardar el carrito');
    });
    document.addEventListener('DOMContentLoaded', leerInfo);
  }

