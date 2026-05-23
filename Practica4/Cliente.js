const readline = require("readline");
const { catalogo, obtenerPorCategoria, obtenerDisponibles, obtenerCategorias,
    obtenerProductosBaratos, obtenerProductosCaros, obtenerBebidas,
    obtenerPostres, prepararPedidoCompleto } = require("./cocina");
const { agregarPedido, procesarPedido, verPedidos, obtenerTotal,
    verResumenPedido, TASA_IVA } = require("./caja");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function preguntar(texto) {
    return new Promise(resolve => {
        rl.question(texto, respuesta => resolve(respuesta.trim()));
    });
}
//
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//
function mostrarEncabezado() {
    console.log('\n');
    console.log(`  ══════════════════════════════════════════════`);
    console.log(`                                                `);
    console.log(`           C O F F E E C O D E                  `);
    console.log(`                                                `);
    console.log(`         Tu cafetería favorita de código        `);
    console.log(`                                                `);
    console.log(`  ══════════════════════════════════════════════`);
    console.log('\n');
}

function separador() {
    console.log(`  ──────────────────────────────────────────────`);
}

function mostrarMenu() {
    const categorias = obtenerCategorias();
    categorias.forEach(categoria => {
        console.log(`\n  -- ${categoria.toUpperCase()} --`);
        obtenerPorCategoria(categoria).forEach(p => {
            const estado = p.disponible ? "DISPONIBLE" : "AGOTADO";
            console.log(`      ${p.id}. ${p.nombre}`);
            console.log(`         ${p.descripcion}`);
            console.log(`         Precio: $${p.precio}.00  |  ${estado}\n`);
        });
    });
}

function mostrarMenuDinamico() {
    console.log('\n  -- MENU DINAMICO --\n');
    obtenerCategorias().forEach(categoria => {
        console.log(`  ${categoria.toUpperCase()}`);
        obtenerPorCategoria(categoria)
            .filter(p => p.disponible)
            .map(p => `    ${p.id}. ${p.nombre.padEnd(22)} $${p.precio}.00`)
            .forEach(linea => console.log(linea));
        console.log(``);
    });
}

function mostrarPromociones() {
    console.log('\n═════════════════════════════════════════════');
    console.log(`            PROMOCIONES DEL DIA                 `);
    console.log(` ══════════════════════════════════════════════\n`);
    console.log(`  10% de descuento en todos los productos!\n`);
    obtenerDisponibles().map(p => ({
        id: p.id, nombre: p.nombre, precioOriginal: p.precio,
        precioPromo: +(p.precio * 0.9).toFixed(2), ahorro: +(p.precio * 0.1).toFixed(2)
    })).forEach(promo => {
        console.log(`    ${promo.id}. ${promo.nombre}`);
        console.log(`       Original: $${promo.precioOriginal}.00 -> Promo: $${promo.precioPromo}  (ahorras $${promo.ahorro})\n`);
    });
}

function mostrarProductosDisponibles() {
    console.log('\n  -- PRODUCTOS DISPONIBLES --\n');
    obtenerDisponibles().map((p, i) => ({
        numero: i + 1,
        id: p.id,
        texto: `${p.nombre} (${p.categoria}) - $${p.precio}.00`
    })).forEach(item => console.log(`    ${item.numero}. [ID: ${item.id}] ${item.texto}`));
    console.log(`\n    Total: ${obtenerDisponibles().length} productos\n`);
}

function mostrarInfoCliente(numeroPedido) {
    const pedido = verResumenPedido(numeroPedido);
    if (!pedido) { console.log(`\n  No se encontro el pedido #${numeroPedido}`); return; }
    console.log(`\n  ═════════════════════════════════════════════`);
    console.log(`             TICKET DE COMPRA                  `);
    console.log(`    ═════════════════════════════════════════════\n`);
    console.log(`  Cliente: ${pedido.cliente}`);
    console.log(`  Pedido #${pedido.numeroPedido}`);
    console.log(`  Estado: ${pedido.estado.toUpperCase()}`);
    console.log(`  Fecha: ${pedido.fecha}\n`);
    separador();
    console.log(`  Productos:\n`);
    pedido.productos.forEach(prod => console.log(`    > ${prod.nombre}  -----  $${prod.precio}.00`));
    console.log(``);
    separador();
    console.log(`  SUBTOTAL:  $${pedido.subtotal}.00`);
    console.log(`  IVA (${(TASA_IVA * 100)}%): $${pedido.iva}`);
    console.log(`  TOTAL:     $${pedido.total}`);
    separador();
    console.log(`\n  Gracias por tu compra, ${pedido.cliente}!\n`);
}
//
async function mostrarEstadosPedido(pedido, ids) {
    console.log(`\n  --- SEGUIMIENTO DEL PEDIDO #${pedido.numeroPedido} ---\n`);

    console.log(`  [Estado] Pedido recibido`);
//Simular tiempos de preparación 
    await esperar(1500);

    console.log(`  [Estado] Preparando..........`);

    const resultados = await prepararPedidoCompleto(ids);

    let todosBien = true;
    resultados.forEach(resultado => {
        if (resultado.status === "fulfilled") {
            console.log(`    > ${resultado.value.mensaje}`);
        } else {
            console.log(`    > ${resultado.reason}`);
            todosBien = false;
        }
    });
//
    await esperar(1500);

    console.log(`  [Estado] Empacando..........`);

    await esperar(1500);

    if (todosBien) {
        procesarPedido(pedido.numeroPedido,
            (p) => {
                console.log(`  [Estado] Pedido Entregado`);
                console.log('\n  Pedido #${p.numeroPedido} para ${p.cliente} entregado con exito!\n');
            },
            (p, razon) => {
                console.log(`  [Estado] Cancelado`);
                console.log('\n  Pedido cancelado: ${razon}\n');
            }
        );
    } else {
        console.log(`  [Estado] Cancelado`);
        console.log('\n  Algunos productos no pudieron prepararse.\n');
    }
}

function mostrarResumenVentas() {
    const pedidos = verPedidos();
    const total = obtenerTotal();
    console.log('\n  ════════════════════════════════════════════');
    console.log(`             RESUMEN DE VENTAS                  `);
    console.log(`    ════════════════════════════════════════════\n`);
    console.log(`  Total de pedidos: ${pedidos.length}`);
    console.log(`  Total acumulado (con IVA): $${total}\n`);
    if (pedidos.length > 0) {
        separador();
        pedidos.map(p => {
            const items = p.productos.map(prod => prod.nombre).join(", ");
            return `  #${p.numeroPedido} | ${p.cliente} | ${items} | $${p.total} | ${p.estado.toUpperCase()}`;
        }).forEach(linea => console.log(linea));
        separador();
    } else {
        console.log(`  No hay pedidos registrados aun.`);
    }
}

function mostrarFiltros() {
    console.log('\n  -- FILTROS DE PRODUCTOS --\n');
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
                console.log('\n  -- PRODUCTOS BARATOS (< $50) --\n');
                obtenerProductosBaratos().forEach(p => console.log(`    ${p.id}. ${p.nombre} - $${p.precio}.00 (${p.categoria})`));
                break;
            case "2":
                console.log('\n  -- PRODUCTOS CAROS (>= $60) --\n');
                obtenerProductosCaros().forEach(p => console.log(`    ${p.id}. ${p.nombre} - $${p.precio}.00 (${p.categoria})`));
                break;
            case "3":
                console.log('\n  -- BEBIDAS --\n');
                obtenerBebidas().forEach(p => console.log(`    ${p.id}. ${p.nombre} - $${p.precio}.00 ${p.disponible ? "Disponible" : "Agotado"}`));
                break;
            case "4":
                console.log('\n  -- POSTRES --\n');
                obtenerPostres().forEach(p => console.log(`    ${p.id}. ${p.nombre} - $${p.precio}.00 ${p.disponible ? "Disponible" : "Agotado"}`));
                break;
            case "5": enFiltros = false; break;
            default: console.log(`\n  Opcion no valida.`); break;
        }
    }
}

function mostrarOpciones() {
    console.log('\n ============================================');
    console.log(`             Que deseas hacer?                  `);
    console.log(`   ────────────────────────────────────────────`);
    console.log(`    1. Ver menu de productos                   `);
    console.log(`    2. Hacer un pedido (con preparacion)       `);
    console.log(`    3. Ver ticket de un pedido                 `);
    console.log(`    4. Ver resumen de ventas                   `);
    console.log(`    5. Ver catalogo (tabla)                    `);
    console.log(`    6. Ver promociones                         `);
    console.log(`    7. Ver productos disponibles               `);
    console.log(`    8. Filtrar productos                       `);
    console.log(`    9. Salir                                   `);
    console.log(`   ============================================`);
}

async function hacerPedido() {
    console.log('\n  -- NUEVO PEDIDO --\n');
    const nombre = await preguntar("  Cual es tu nombre? -> ");
    if (!nombre) { console.log('\n  Debes ingresar un nombre.'); return; }

    mostrarMenuDinamico();
    console.log(`  Ingresa los numeros de los productos separados por coma.`);
    console.log(`  Ejemplo: 1,3,7\n`);
    const seleccion = await preguntar("  Tu seleccion -> ");
    const ids = seleccion.split(",").map(id => parseInt(id.trim())).filter(id => !isNaN(id));
    if (ids.length === 0) { console.log('\n  No seleccionaste productos validos.'); return; }

    const pedido = agregarPedido(nombre, ids);
    if (pedido.productos.length === 0) { console.log('\n  Ninguno de los productos esta disponible.'); return; }

    console.log(`\n  Pedido #${pedido.numeroPedido} registrado!`);
    mostrarInfoCliente(pedido.numeroPedido);

    console.log('\n  Iniciando preparacion del pedido...\n');
    await mostrarEstadosPedido(pedido, ids);
}

async function buscarTicket() {
    const entrada = await preguntar("\n  Ingresa el numero de pedido -> ");
    const numero = parseInt(entrada);
    if (isNaN(numero)) { console.log('\n  Debes ingresar un numero valido.'); return; }
    mostrarInfoCliente(numero);
}

async function iniciar() {
    mostrarEncabezado();
    let continuar = true;
    while (continuar) {
        mostrarOpciones();
        const opcion = await preguntar("\n  Elige una opcion (1-9) -> ");
        switch (opcion) {
            case "1": mostrarMenu(); break;
            case "2": await hacerPedido(); break;
            case "3": await buscarTicket(); break;
            case "4": mostrarResumenVentas(); break;
            case "5":
                console.log('\n  Catalogo completo:\n');
                console.table(obtenerDisponibles().map(p => ({ ID: p.id, Producto: p.nombre, Categoria: p.categoria, Precio: `$${p.precio}.00` })));
                break;
            case "6": mostrarPromociones(); break;
            case "7": mostrarProductosDisponibles(); break;
            case "8": await menuFiltros(); break;
            case "9":
                console.log('\n'); separador();
                console.log(`  Gracias por visitar CoffeeCode!`);
                console.log(`  Hasta pronto`);
                separador(); console.log('\n');
                continuar = false; break;
            default: console.log('\n  Opcion no valida. Elige del 1 al 9.'); break;
        }
    }
    rl.close();
}

iniciar();