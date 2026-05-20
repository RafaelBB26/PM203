// ========================================
// CLIENTE - CoffeeCode
// Módulo 03: Menú interactivo en consola
// Conceptos: map(), forEach(), template strings
// ========================================

const readline = require("readline");
const { catalogo, obtenerPorCategoria, obtenerDisponibles, obtenerCategorias, obtenerProductosBaratos, obtenerProductosCaros, obtenerBebidas, obtenerPostres } = require("./cocina");
const { agregarPedido, verPedidos, obtenerTotal, verResumenPedido, TASA_IVA } = require("./caja");

// Crear interfaz para leer datos del usuario
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
    console.log(`  ══════════════════════════════════════════════`);
    
    console.log(`           C O F F E E C O D E                  `);
    console.log(`         Tu cafetería favorita de código        `);
    console.log(`  ══════════════════════════════════════════════`);
    console.log(`\n`);
}

function separador() {
    console.log(`  ──────────────────────────────────────────────`);
}


function mostrarMenu() {
    const categorias = obtenerCategorias();

    categorias.forEach(categoria => {
        console.log(`\n  ── ${categoria.toUpperCase()} ──────────────────────────`);
        console.log(``);

        const productos = obtenerPorCategoria(categoria);

        productos.forEach(p => {
            const estado = p.disponible ? "DISPONIBLE" : "AGOTADO";
            const precioFormateado = `$${p.precio}.00`;

            console.log(`      ${p.id}. ${p.nombre}`);
            console.log(`         ${p.descripcion}`);
            console.log(`         Precio: ${precioFormateado}  |  ${estado}`);
            console.log(``);
        });
    });
}

function mostrarMenuDinamico() {
    console.log(`\n  -- MENU DINAMICO --\n`);

    const categorias = obtenerCategorias();

    categorias.forEach(categoria => {
        console.log(`  ${categoria.toUpperCase()}`);

        const lineas = obtenerPorCategoria(categoria)
            .filter(p => p.disponible)
            .map(p => `    ${p.id}. ${p.nombre.padEnd(22)} $${p.precio}.00`);

        lineas.forEach(linea => console.log(linea));
        console.log(``);
    });
}


function mostrarPromociones() {
    console.log(`\n`);
    console.log(`  ══════════════════════════════════════════════`);
    console.log(`            PROMOCIONES DEL DIA                 `);
    console.log(`  ══════════════════════════════════════════════`);
    console.log(``);
    console.log(`  10% de descuento en todos los productos!\n`);

    const promociones = obtenerDisponibles().map(p => ({
        id: p.id,
        nombre: p.nombre,
        precioOriginal: p.precio,
        precioPromo: +(p.precio * 0.9).toFixed(2),
        ahorro: +(p.precio * 0.1).toFixed(2)
    }));

    promociones.forEach(promo => {
        console.log(`    ${promo.id}. ${promo.nombre}`);
        console.log(`       Precio original: $${promo.precioOriginal}.00`);
        console.log(`       Precio promo:    $${promo.precioPromo}  (ahorras $${promo.ahorro})`);
        console.log(``);
    });
}

function mostrarProductosDisponibles() {
    console.log(`\n  -- PRODUCTOS DISPONIBLES --\n`);

    const listado = obtenerDisponibles().map((p, index) => ({
        numero: index + 1,
        id: p.id,
        texto: `${p.nombre} (${p.categoria}) — $${p.precio}.00`
    }));

    listado.forEach(item => {
        console.log(`    ${item.numero}. [ID: ${item.id}] ${item.texto}`);
    });

    console.log(`\n    Total disponibles: ${listado.length} productos\n`);
}


function mostrarInfoCliente(numeroPedido) {
    const pedido = verResumenPedido(numeroPedido);

    if (!pedido) {
        console.log(`\n  No se encontro el pedido #${numeroPedido}`);
        return;
    }

    console.log(`\n`);
    console.log(`  ══════════════════════════════════════════════`);
    console.log(`              TICKET DE COMPRA                  `);
    console.log(`  ══════════════════════════════════════════════`);
    console.log(``);
    console.log(`  Cliente: ${pedido.cliente}`);
    console.log(`  Pedido #${pedido.numeroPedido}`);
    console.log(`  Fecha: ${pedido.fecha}`);
    console.log(``);
    separador();
    console.log(`  Productos ordenados:`);
    console.log(``);

    // Usar forEach() en lugar de for
    pedido.productos.forEach(prod => {
        console.log(`    > ${prod.nombre}  -----  $${prod.precio}.00`);
    });

    console.log(``);
    separador();
    console.log(`  SUBTOTAL:  $${pedido.subtotal}.00`);
    console.log(`  IVA (${(TASA_IVA * 100)}%): $${pedido.iva}`);
    console.log(`  TOTAL:     $${pedido.total}`);
    separador();
    console.log(`\n  Gracias por tu compra, ${pedido.cliente}!\n`);
}


function mostrarResumenVentas() {
    const pedidos = verPedidos();
    const total = obtenerTotal();

    console.log(\n);
    console.log(`  ══════════════════════════════════════════════`);
    console.log(`             RESUMEN DE VENTAS                  `);
    console.log(`  ══════════════════════════════════════════════`);
    console.log(``);
    console.log(`  Total de pedidos realizados: ${pedidos.length}`);
    console.log(`  Total acumulado (con IVA): $${total}`);
    console.log(``);

    if (pedidos.length > 0) {
        console.log(`  Detalle de pedidos:`);
        separador();

        const lineas = pedidos.map(p => {
            const items = p.productos.map(prod => prod.nombre).join(", ");
            return `  #${p.numeroPedido} | ${p.cliente} | ${items} | Sub: $${p.subtotal} | Total: $${p.total}`;
        });

        lineas.forEach(linea => console.log(linea));

        separador();
    } else {
        console.log(`  No hay pedidos registrados aun.`);
    }
}

function mostrarFiltros() {
    console.log(`\n  -- FILTROS DE PRODUCTOS --\n`);
    console.log(`    1. Productos baratos (< $50)`);
    console.log(`    2. Productos caros (>= $60)`);
    console.log(`    3. Bebidas (Cafe + Frias)`);
    console.log(`    4. Postres`);
    console.log(`    5. Volver`);
}

async function menuFiltros() {
    let enFiltros = true;

    while (enFiltros) {
        mostrarFiltros();
        const opcion = await preguntar("\n  Elige un filtro (1-5) -> ");

        switch (opcion) {
            case "1":
                console.log(`\n  -- PRODUCTOS BARATOS (< $50) --\n`);
                obtenerProductosBaratos().forEach(p => {
                    console.log(`    ${p.id}. ${p.nombre} — $${p.precio}.00 (${p.categoria})`);
                });
                break;
            case "2":
                console.log(`\n  -- PRODUCTOS CAROS (>= $60) --\n`);
                obtenerProductosCaros().forEach(p => {
                    console.log(`    ${p.id}. ${p.nombre} — $${p.precio}.00 (${p.categoria})`);
                });
                break;
            case "3":
                console.log(`\n  -- BEBIDAS --\n`);
                obtenerBebidas().forEach(p => {
                    const estado = p.disponible ? "Disponible" : "Agotado";
                    console.log(`    ${p.id}. ${p.nombre} — $${p.precio}.00 ${estado}`);
                });
                break;
            case "4":
                console.log(`\n  -- POSTRES --\n`);
                obtenerPostres().forEach(p => {
                    const estado = p.disponible ? "Disponible" : "Agotado";
                    console.log(`    ${p.id}. ${p.nombre} — $${p.precio}.00 ${estado}`);
                });
                break;
            case "5":
                enFiltros = false;
                break;
            default:
                console.log(`\n  Opcion no valida.`);
                break;
        }
    }
}

function mostrarOpciones() {
    console.log(`\n  ===========================================`);
    console.log(`             Que deseas hacer?              `);
    console.log(`  ──────────────────────────────────────────`);
    console.log(`  │  1. Ver menu de productos                  │`);
    console.log(`  │  2. Hacer un pedido                        │`);
    console.log(`  │  3. Ver ticket de un pedido                │`);
    console.log(`  │  4. Ver resumen de ventas                  │`);
    console.log(`  │  5. Ver catalogo (tabla)                   │`);
    console.log(`  │  6. Ver promociones                        │`);
    console.log(`  │  7. Ver productos disponibles              │`);
    console.log(`  │  8. Filtrar productos                      │`);
    console.log(`  │  9. Salir                                  │`);
    console.log(`  └──────────────────────────────────────────┘`);
}

// ── Función para hacer un pedido interactivo ──
async function hacerPedido() {
    console.log(`\n  -- NUEVO PEDIDO --\n`);

    const nombre = await preguntar("  Cual es tu nombre? -> ");

    if (!nombre) {
        console.log(`\n  Debes ingresar un nombre.`);
        return;
    }

    // Mostrar menú dinámico para que elija
    mostrarMenuDinamico();

    console.log(`\n  Ingresa los numeros de los productos separados por coma.`);
    console.log(`  Ejemplo: 1,3,7\n`);

    const seleccion = await preguntar("  Tu seleccion -> ");

    // Usar map() para convertir la entrada a un array de IDs
    const ids = seleccion.split(",").map(id => parseInt(id.trim())).filter(id => !isNaN(id));

    if (ids.length === 0) {
        console.log(`\n  No seleccionaste productos validos.`);
        return;
    }

    // Registrar el pedido (caja.js calcula subtotal con reduce, IVA y total automáticamente)
    const pedido = agregarPedido(nombre, ids);

    if (pedido.productos.length === 0) {
        console.log(`\n  Ninguno de los productos seleccionados esta disponible.`);
        return;
    }

    console.log(`\n  Pedido #${pedido.numeroPedido} registrado exitosamente!`);

    // Mostrar ticket automáticamente con subtotal, IVA y total
    mostrarInfoCliente(pedido.numeroPedido);
}

// ── Función para buscar un ticket ──
async function buscarTicket() {
    const entrada = await preguntar("\n  Ingresa el numero de pedido -> ");
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

        const opcion = await preguntar("\n  Elige una opcion (1-9) -> ");

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
                // Usar map() para transformar los datos a formato tabla
                console.table(obtenerDisponibles().map(p => ({
                    ID: p.id,
                    Producto: p.nombre,
                    Categoria: p.categoria,
                    Precio: `$${p.precio}.00`
                })));
                break;

            case "6":
                mostrarPromociones();
                break;

            case "7":
                mostrarProductosDisponibles();
                break;

            case "8":
                await menuFiltros();
                break;

            case "9":
                console.log(`\n`);
                separador();
                console.log(`  Gracias por visitar CoffeeCode!`);
                console.log(`  Hasta pronto`);
                separador();
                console.log(`\n`);
                continuar = false;
                break;

            default:
                console.log(`\n  Opcion no valida. Elige del 1 al 9.`);
                break;
        }
    }

    rl.close();
}

// Iniciar el sistema
iniciar();