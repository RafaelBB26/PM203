console.log("Hola mundo js desde el servidor");
/* Medir el tiempo del proceso */
console.time("Mi proceso");
for (let i=0;i < 1000000; i++){}

console.timeEnd("Mi proceso");


/* Objetos tipo tabla */
let usuarios = [
    {nombre: "Rafael", edad: 20},
    {nombre: "Maria", edad: 30},    
];

console.table(usuarios);