const { catalogo, buscarProducto } = require("./cocina");

let pedidos = [];

let totalAcumulado = 0;

let contadorPedidos = 0;

//agregar un pedido
function agregarPedido(nombreCliente, productosIds) {
    contadorPedidos++;

    // Buscar los productos del pedido
    const productosDelPedido = [];
    let subtotal = 0;

    for (let i = 0; i < productosIds.length; i++) {
        const producto = buscarProducto(productosIds[i]);
        if (producto && producto.disponible) {
            productosDelPedido.push({
                nombre: producto.nombre,
                precio: producto.precio
            });
            subtotal = subtotal + producto.precio;
        }
    }

    const nuevoPedido = {
        numeroPedido: contadorPedidos,
        cliente: nombreCliente,
        productos: productosDelPedido,
        subtotal: subtotal,
        fecha: new Date().toLocaleString()
    };

    pedidos.push(nuevoPedido);

    // Total acumulado
    totalAcumulado = totalAcumulado + subtotal;

    return nuevoPedido;
}

function verPedidos() {
    return pedidos;
}

function obtenerTotal() {
    return totalAcumulado;
}

function verResumenPedido(numeroPedido) {
    const pedido = pedidos.find(p => p.numeroPedido === numeroPedido);
    return pedido;
}

module.exports = { agregarPedido, verPedidos, obtenerTotal, verResumenPedido };