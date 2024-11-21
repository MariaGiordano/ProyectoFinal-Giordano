let PRODUCTOS_ARRAY = [];
let carrito = [];

async function cargarProductos() {
  try {
    const response = await fetch('./productos.json'); 
    PRODUCTOS_ARRAY = await response.json();
    mostrarProductos(); 
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}

function mostrarProductos() {
  const PRODUCTOS_SECTION = document.getElementById("productos");
  PRODUCTOS_SECTION.innerHTML = "";

  PRODUCTOS_ARRAY.forEach(({ id, nombre, precio, imagen }) => {
    const CARD = `
      <div class="productos-card">
        <figure><img src="${imagen}" alt="${nombre}" /></figure>
        <div class="productos-contenido">
          <h2>${nombre}</h2>
          <p>$${precio}</p>
          <a href="#" onclick="añadirCarrito(${id})">Añadir</a>
        </div>
      </div>
    `;
    PRODUCTOS_SECTION.innerHTML += CARD;
  });
}

function añadirCarrito(id) {
  const producto = PRODUCTOS_ARRAY.find(({ id: prodId }) => prodId === id);
  const enCarrito = carrito.find(({ id: prodId }) => prodId === id);

  enCarrito
    ? enCarrito.cantidad++
    : carrito.push({ ...producto, cantidad: 1 });

  actualizarCarrito();
}

function actualizarCarrito() {
  const CARRITO = document.getElementById("carrito");
  const CONTADOR = document.getElementById("cart-count");
  const TOTAL = document.getElementById("carrito-total");

  let total = 0;
  let cantidadTotal = 0;

  CARRITO.innerHTML = "";

  carrito.forEach(({ id, nombre, precio, cantidad }) => {
    total += precio * cantidad;
    cantidadTotal += cantidad;

    CARRITO.innerHTML += `
      <div class="carrito-item">
        <p>${nombre} (x${cantidad})</p>
        <button class="delete-btn" onclick="eliminarProducto(${id})">X</button>
      </div>
    `;
  });

  TOTAL.innerText = `Total: $${total}`;
  CONTADOR.innerText = cantidadTotal;
}

function eliminarProducto(id) {
  carrito = carrito.filter(({ id: prodId }) => prodId !== id);
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

function toggleCarrito() {
  const CARRITO = document.getElementById("carrito-container");
  CARRITO.classList.toggle("visible");
}

cargarProductos();
  

document.addEventListener("DOMContentLoaded", function() {
    const selectTipoPiel = document.getElementById("tipoPiel");
    selectTipoPiel.addEventListener("change", mostrarRecomendacion);
});
function mostrarRecomendacion() {
    const tipoPiel = document.getElementById("tipoPiel").value;
    const RECOMENDACION_ELEMENT = document.getElementById("recomendacion");

    if (tipoPiel === "Normal") {
        RECOMENDACION_ELEMENT.textContent = "Te recomendamos productos hidratantes y protector solar";
    } else if (tipoPiel === "Grasa") {
        RECOMENDACION_ELEMENT.textContent = "Te recomendamos productos control de brillo y limpieza profunda";
    } else if (tipoPiel === "Sensible") {
        RECOMENDACION_ELEMENT.textContent = "Te recomendamos productos suaves y hipoalergénicos";
    }
}


function suscribirse() {
    const email = document.getElementById('email-input').value;
    if (email.includes("@")) {
        localStorage.setItem("suscriptorEmail", email);
        Swal.fire({
            title: '¡Gracias por suscribirte!',
            text: 'Te hemos registrado con éxito.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            customClass: {
              popup: 'my-popup',
              title: 'my-title',
              confirmButton: 'my-button',
            },
          });
      document.getElementById('form-suscripcion').reset(); 
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor ingresa un email válido',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo',
        customClass: {
            popup: 'my-popup',
            title: 'my-title',
            confirmButton: 'my-button',
          },
      });
    }
  }








