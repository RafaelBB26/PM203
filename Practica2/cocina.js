const catalogo = [
    //Cafés
    {
        id: 1,
        nombre: "Americano",
        categoria: "Café",
        precio: 45,
        descripcion: "Café negro intenso con agua caliente",
        disponible: true
    },
    {
        id: 2,
        nombre: "Cappuccino",
        categoria: "Café",
        precio: 55,
        descripcion: "Espresso con leche espumada y espuma de leche",
        disponible: true
    },
    {
        id: 3,
        nombre: "Latte",
        categoria: "Café",
        precio: 60,
        descripcion: "Espresso suave con abundante leche vaporizada",
        disponible: true
    },
    {
        id: 4,
        nombre: "Mocha",
        categoria: "Café",
        precio: 65,
        descripcion: "Espresso con chocolate y leche espumada",
        disponible: true
    },
    {
        id: 5,
        nombre: "Espresso",
        categoria: "Café",
        precio: 35,
        descripcion: "Shot concentrado de café puro",
        disponible: true
    },

    //Postres
    {
        id: 6,
        nombre: "Croissant",
        categoria: "Postre",
        precio: 40,
        descripcion: "Croissant de mantequilla recién horneado",
        disponible: true
    },
    {
        id: 7,
        nombre: "Muffin de Chocolate",
        categoria: "Postre",
        precio: 45,
        descripcion: "Muffin esponjoso con chips de chocolate",
        disponible: true
    },
    {
        id: 8,
        nombre: "Cheesecake",
        categoria: "Postre",
        precio: 70,
        descripcion: "Rebanada de cheesecake New York con frutos rojos",
        disponible: false
    },

    //Bebidas frías
    {
        id: 9,
        nombre: "Frappé de Café",
        categoria: "Bebida Fría",
        precio: 75,
        descripcion: "Café helado mezclado con hielo y crema batida",
        disponible: true
    },
    {
        id: 10,
        nombre: "Té Helado",
        categoria: "Bebida Fría",
        precio: 40,
        descripcion: "Té negro frío con limón y menta",
        disponible: true
    }
];

function obtenerPorCategoria(categoria) {
    const productos = catalogo.filter(producto => producto.categoria === categoria);
    return productos;
}


function obtenerDisponibles() {
    const disponibles = catalogo.filter(producto => producto.disponible === true);
    return disponibles;
}


function buscarProducto(id) {
    const producto = catalogo.find(producto => producto.id === id);
    return producto;
}


function obtenerCategorias() {
    const categorias = [];
    for (let i = 0; i < catalogo.length; i++) {
        if (!categorias.includes(catalogo[i].categoria)) {
            categorias.push(catalogo[i].categoria);
        }
    }
    return categorias;
}


module.exports = { catalogo, obtenerPorCategoria, obtenerDisponibles, buscarProducto, obtenerCategorias };