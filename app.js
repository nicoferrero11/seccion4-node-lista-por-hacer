const colors = require('colors');
//const argv = require('yargs').argv;
const argv = require('./config/yargs').argv; //Creo el archivo yargs para colocar todas las configuraciones dentro
const porHacer = require('./por-hacer/por-hacer');

//console.log(argv);

let comando = argv._[0]; //Aqui estan los comandos

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado();

        console.log('=====Por hacer====='.green);
        for (let tarea of listado) {
            console.log(tarea.descripcion);
            console.log('Estado:', tarea.completado);
        }
        console.log('==================='.green);

        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;
    default:
        console.log('Comando no conocido');
        break;
}