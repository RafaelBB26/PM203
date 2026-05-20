const readline = require("readline");
const { catalogo, obtenerPorCategoria, obtenerDisponibles, obtenerCategorias } = require("./cocina");
const { agregarPedido, verPedidos, obtenerTotal, verResumenPedido } = require("./caja");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(texto) {
    return new Promise(resolve => {
        rl.question(texto, respuesta => {
            resolve(respuesta.trim());
        });
    });
}

function mostrarEncabezado() {
    console.log(`\n`);
    console.log(`  ================================`);
    console.log(`  COFFEECODE`);
    console.log(`  ================================`);
    console.log(`  Tu cafeteria favorita de codigo`);
    console.log(`\n`);
}

function separador() {
    console.log(`  ================================`);
}

function mostrarMenu() {
    const categorias = obtenerCategorias();

    for (let i = 0; i < categorias.length; i++) {
        const categoria = categorias[i];

        console.log(`\n  ${categoria.toUpperCase()}`);
        console.log(``);

        const productos = obtenerPorCategoria(categoria);

        for (let j = 0; j < productos.length; j++) {
            const p = productos[j];
            const estado = p.disponible ? "DISPONIBLE" : "AGOTADO";
            const precioFormateado = `$${p.precio}.00`;

            console.log(`      ${p.id}. ${p.nombre}`);
            console.log(`         ${p.descripcion}`);
            console.log(`         Precio: ${precioFormateado}  -  ${estado}`);
            console.log(``);
        }
    }
}

function mostrarInfoCliente(numeroPedido) {
    const pedido = verResumenPedido(numeroPedido);

    if (!pedido) {
        console.log(`\n  No se encontro el pedido #${numeroPedido}`);
        return;
    }

    console.log(`\n`);
    console.log(`  ================================`);
    console.log(`  TICKET DE COMPRA`);
    console.log(`  ================================`);
    console.log(``);
    console.log(`  Cliente: ${pedido.cliente}`);
    console.log(`  Pedido #${pedido.numeroPedido}`);
    console.log(`  Fecha: ${pedido.fecha}`);
    console.log(``);
    separador();
    console.log(`  Productos ordenados:`);
    console.log(``);

    for (let i = 0; i < pedido.productos.length; i++) {
        const prod = pedido.productos[i];
        console.log(`    - ${prod.nombre}  $${prod.precio}.00`);
    }

    console.log(``);
    separador();
    console.log(`  SUBTOTAL: $${pedido.subtotal}.00`);
    separador();
    console.log(`\n  Gracias por tu compra, ${pedido.cliente}!\n`);
}

function mostrarResumenVentas() {
    const pedidos = verPedidos();
    const total = obtenerTotal();

    console.log(`\n`);
    console.log(`  ================================`);
    console.log(`  RESUMEN DE VENTAS`);
    console.log(`  ================================`);
    console.log(``);
    console.log(`  Total de pedidos realizados: ${pedidos.length}`);
    console.log(`  Total acumulado: $${total}.00`);
    console.log(``);

    if (pedidos.length > 0) {
        console.log(`  Detalle de pedidos:`);
        separador();

        for (let i = 0; i < pedidos.length; i++) {
            const p = pedidos[i];
            const items = p.productos.map(prod => prod.nombre).join(", ");
            console.log(`  #${p.numeroPedido} - ${p.cliente} - ${items} - $${p.subtotal}.00`);
        }

        separador();
    } else {
        console.log(`  No hay pedidos registrados aun.`);
    }
}

function mostrarOpciones() {
    console.log(`\n  ================================`);
    console.log(`  Que deseas hacer?`);
    console.log(`  ================================`);
    console.log(`  1. Ver menu de productos`);
    console.log(`  2. Hacer un pedido`);
    console.log(`  3. Ver ticket de un pedido`);
    console.log(`  4. Ver resumen de ventas`);
    console.log(`  5. Ver catalogo (tabla)`);
    console.log(`  6. Salir`);
    console.log(`  ================================`);
}

async function hacerPedido() {
    console.log(`\n  NUEVO PEDIDO\n`);

    const nombre = await preguntar(`  Cual es tu nombre? > `);

    if (!nombre) {
        console.log(`\n  Debes ingresar un nombre.`);
        return;
    }

    mostrarMenu();

    console.log(`\n  Ingresa los numeros de los productos separados por coma.`);
    console.log(`  Ejemplo: 1,3,7\n`);

    const seleccion = await preguntar(`  Tu seleccion > `);

    const ids = seleccion.split(",").map(id => parseInt(id.trim())).filter(id => !isNaN(id));

    if (ids.length === 0) {
        console.log(`\n  No seleccionaste productos validos.`);
        return;
    }

    const pedido = agregarPedido(nombre, ids);

    if (pedido.productos.length === 0) {
        console.log(`\n  Ninguno de los productos seleccionados esta disponible.`);
        return;
    }

    console.log(`\n  Pedido #${pedido.numeroPedido} registrado exitosamente!`);

    mostrarInfoCliente(pedido.numeroPedido);
}

async function buscarTicket() {
    const entrada = await preguntar(`\n  Ingresa el numero de pedido > `);
    const numero = parseInt(entrada);

    if (isNaN(numero)) {
        console.log(`\n  Debes ingresar un numero valido.`);
        return;
    }

    mostrarInfoCliente(numero);
}

async function iniciar() {
    mostrarEncabezado();

    let continuar = true;

    while (continuar) {
        mostrarOpciones();

        const opcion = await preguntar(`\n  Elige una opcion (1-6) > `);

        switch (opcion) {
            case "1":
                mostrarMenu();
                break;

            case "2":
                await hacerPedido();
                break;

            case "3":
                await buscarTicket();
                break;

            case "4":
                mostrarResumenVentas();
                break;

            case "5":
                console.log(`\n  Catalogo completo (vista tabla):\n`);
                console.table(obtenerDisponibles().map(p => ({
                    ID: p.id,
                    Producto: p.nombre,
                    Categoria: p.categoria,
                    Precio: `$${p.precio}.00`
                })));
                break;

            case "6":
                console.log(`\n`);
                separador();
                console.log(`  Gracias por visitar CoffeeCode!`);
                console.log(`  Hasta pronto`);
                separador();
                console.log(`\n`);
                continuar = false;
                break;

            default:
                console.log(`\n  Opcion no valida. Elige del 1 al 6.`);
                break;
        }
    }

    rl.close();
}

iniciar();