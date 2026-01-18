const params = new URLSearchParams(window.location.search);

const nombre = params.get("nombre");
const precio = params.get("precio");
const imagen = params.get("img");

document.getElementById("nombre").textContent = nombre;
document.getElementById("precio").textContent = Number(precio).toLocaleString("es-AR");
document.getElementById("img-principal").src = imagen;

document.getElementById("agregar").addEventListener("click", () => {const cantidad = document.getElementById("cantidad").valueAsNumber || 1;

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push({ nombre, precio: Number(precio), cantidad });
  localStorage.setItem("carrito", JSON.stringify(carrito));

  alert("Producto agregado al carrito 🛒");
});