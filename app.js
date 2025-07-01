const productos = {
  mariscos: [
    "Ceviche de camarón",
    "Ceviche de camarón con pulpo",
    "Campechana",
    "Camarones ahogados",
    "Ceviche de atún"
  ],
  bebidas: [
    "Refresco en lata",
    "Refresco en botella",
    "Aguas de sabor"
  ],
  postres: [
    "Pie de fresa",
    "Nieve",
    "Choco flan"
  ]
};

const pedido = [];

function mostrarCategoria(categoria) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  productos[categoria].forEach(prod => {
    const btn = document.createElement("button");
    btn.textContent = prod;
    btn.onclick = () => agregarAlPedido(prod);
    contenedor.appendChild(btn);
  });
}

function agregarAlPedido(producto) {
  pedido.push(producto);
  renderPedido();
}

function renderPedido() {
  const lista = document.getElementById("pedido");
  lista.innerHTML = "";
  const resumen = {};
  pedido.forEach(p => {
    resumen[p] = (resumen[p] || 0) + 1;
  });
  for (let item in resumen) {
    const li = document.createElement("li");
    li.textContent = `${item} x ${resumen[item]}`;
    lista.appendChild(li);
  }
}

function enviarPedido() {
  const fecha = new Date().toLocaleString();
  const resumen = {};
  pedido.forEach(p => {
    resumen[p] = (resumen[p] || 0) + 1;
  });
  const items = Object.keys(resumen).map(p => ({
    producto: p,
    cantidad: resumen[p],
    total: 0
  }));
  const payload = JSON.stringify({ fecha, items });

  fetch("https://script.google.com/macros/s/AKfycby8M4kQWKfuohBj4Mb4ox_tVreOucws4vn7KGXok7FXk5t-QTFoj-QZNu-k8GENjd1f/exec", {
    method: "POST",
    body: payload,
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(r => r.text())
  .then(resp => {
    alert("Pedido enviado correctamente.");
    pedido.length = 0;
    renderPedido();
  })
  .catch(err => alert("Error al enviar pedido: " + err.message));
}
