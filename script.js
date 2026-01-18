// =======================
// FILTROS
// =======================
const filtros = document.querySelectorAll(".filtro");
const productos = document.querySelectorAll(".producto");

filtros.forEach(btn => {
  btn.addEventListener("click", () => {
    filtros.forEach(b => b.classList.remove("activo"));
    btn.classList.add("activo");

    const cat = btn.dataset.cat;

    productos.forEach(p => {
      p.style.display =
        cat === "todos" || p.dataset.cat === cat ? "block" : "none";
    });
  });
});

// =======================
// CARRITO - ELEMENTOS
// =======================
const botones = document.querySelectorAll(".add-cart");
const listaCarrito = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("total");
const finalizarBtn = document.getElementById("finalizar-compra");
const badge = document.getElementById("badge");
const vaciarBtn = document.getElementById("vaciar");

// =======================
// ESTADO
// =======================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// =======================
// AGREGAR PRODUCTO
// =======================
botones.forEach(btn => {
  btn.addEventListener("click", () => {
    const producto = btn.closest(".producto");
    const nombre = btn.dataset.nombre;
    const precio = Number(btn.dataset.precio);
    const stock = Number(btn.dataset.stock || 999);
    const cantidadInput = producto.querySelector(".cantidad");
    const cantidad = cantidadInput ? cantidadInput.valueAsNumber : 1;

    const enCarrito = carrito
      .filter(p => p.nombre === nombre)
      .reduce((acc, p) => acc + p.cantidad, 0);

    if (enCarrito + cantidad > stock) {
      alert("❌ No hay más stock disponible");
      return;
    }

    carrito.push({ nombre, precio, cantidad, stock });
    guardar();
    renderCarrito();
  });
});

// =======================
// RENDER CARRITO
// =======================
function renderCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach((p, index) => {
    total += p.precio * p.cantidad;
    cantidadTotal += p.cantidad;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${p.nombre} x${p.cantidad}</span>
      <span>$${(p.precio * p.cantidad).toLocaleString("es-AR")}</span>
      <button class="eliminar" data-index="${index}">✖</button>
    `;
    listaCarrito.appendChild(li);
  });

  totalSpan.textContent = total.toLocaleString("es-AR");
  badge.textContent = cantidadTotal;

  document.querySelectorAll(".eliminar").forEach(btn => {
    btn.onclick = () => {
      carrito.splice(btn.dataset.index, 1);
      guardar();
      renderCarrito();
    };
  });
}

// =======================
// FINALIZAR COMPRA
// =======================
finalizarBtn.addEventListener("click", () => {
  if (!carrito.length) {
    alert("El carrito está vacío");
    return;
  }

  let mensaje = "🛍️ *Nuevo pedido CCCAPS* %0A%0A";
  let total = 0;

  carrito.forEach(p => {
    mensaje += `• ${p.nombre} x${p.cantidad} — $${(p.precio * p.cantidad).toLocaleString("es-AR")}%0A`;
    total += p.precio * p.cantidad;
  });

  mensaje += `%0A————————————%0A`;
  mensaje += `💰 *TOTAL:* $${total.toLocaleString("es-AR")} ARS%0A`;
  mensaje += `📍 Envío a coordinar`;

  window.open(`https://wa.me/5493516455375?text=${mensaje}`, "_blank");
});

// =======================
// UTILIDADES
// =======================
function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// =======================
// MINIMIZAR CARRITO
// =======================
document.getElementById("toggle-carrito").onclick = () => {
  const carritoBox = document.getElementById("carrito");
  carritoBox.classList.toggle("minimizado");
  document.getElementById("toggle-carrito").textContent =
    carritoBox.classList.contains("minimizado") ? "+" : "—";
};

// =======================
// VACIAR CARRITO
// =======================
vaciarBtn.onclick = () => {
  carrito = [];
  guardar();
  renderCarrito();
};

// =======================
// INIT
// =======================
renderCarrito();

if (window.innerWidth < 768) {
  document.getElementById("carrito").classList.add("minimizado");
  document.getElementById("toggle-carrito").textContent = "+";
}

// =======================
// EFECTO TOUCH MOBILE
// =======================
document.querySelectorAll(".producto").forEach(prod => {
  prod.addEventListener("touchstart", () => {
    prod.classList.add("touch");
  });

  prod.addEventListener("touchend", () => {
    setTimeout(() => {
      prod.classList.remove("touch");
    }, 300);
  });
});

// ================= MENU MOBILE =================
const menuBtn = document.getElementById("menu-mobile");
const nav = document.querySelector(".nav");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("activo");
  });
}
